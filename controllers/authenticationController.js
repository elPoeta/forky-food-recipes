const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const { GOOGLE_ID, GOOGLE_SECRET } = require('../config/keys');
const asyncHandler = require('../middlewares/asyncHandler');
const User = require('../models/user');

const verify = async token => {
  const client = new OAuth2Client(GOOGLE_ID);
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const { sub, email, name, picture, iat, exp } = ticket.getPayload();
    //const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
    const payload = {
      googleId: sub,
      email,
      name,
      image: picture,
      iat,
      exp
    }
    console.log('payload :: ', payload);
    return payload;
  } catch (error) {
    console.error('Error :: ', error.message);
    return null
  };
}
module.exports = {
  googleSiging: asyncHandler(async (req, res) => {
    const { idtoken } = req.body;
    const payload = await verify(idtoken);
    if (payload === null) {
      res.status(403).json({ error: "Invalid Token" });
      return;
    }
    const { googleId, email, name, image, iat, exp } = payload
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      const token = jwt.sign({
        user: foundUser
      }, GOOGLE_SECRET, { expiresIn: exp });
      return res.status(200).json({
        autenticated: true,
        user: foundUser,
        token,
      });
      //return res.status(403).json({ error: 'User already exist' });
    }

    const newUser = new User({
      googleId,
      email,
      name,
      image
    });

    const user = await newUser.save();
    const signToken = jwt.sign({
      user: user
    }, GOOGLE_SECRET, { expiresIn: exp });
    const token = `Bearer ${signToken}`;
    res
      .header("authorization", token)
      .status(200).json({
        autenticated: true,
        user,
        token,
      });
  })
}