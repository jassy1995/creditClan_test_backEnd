const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../config/passport");
const keys = process.env.SECRETKEY;
const User = require("../models/user");

let userController = {
  //register user
  RegisterUser: async (req, res, next) => {
    const { username, phone, address, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.json({ errorResponse: "email is already taken" });
    } else {
      try {
        let reqUser = {
          username,
          phone,
          address,
          email,
          password,
        };
        let newUser = new User(reqUser);
        //generate random character
        bcrypt.genSalt(10, async (err, salt) => {
          //hash and concat random character
          bcrypt.hash(newUser.password, salt, async (err, hash) => {
            if (err) throw err;
            //update user password with the hash result before save to database
            newUser.password = hash;
            let saveUser = await newUser.save();
            console.log(saveUser);
            if (saveUser) {
              return res.json({
                successResponse: "registration successful",
              });
            } else {
              return res.json({ errorResponse: "network problem" });
            }
          });
        });
      } catch (err) {
        console.log(err);
      }
    }
  },

  //login user
  LoginUser: async (req, res, next) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) return res.json({ errorResponse: "invalid credential" });

    try {
      //check password
      let verifyPassword = await bcrypt.compare(password, user.password);
      if (verifyPassword) {
        // Create JWT Payload
        const payload = {
          id: user._id,
          username: user.username,
          email: user.email,
        };
        //Sign token // 1 day(24 hours) in seconds
        let authorizer = jwt.sign(payload, keys, {
          expiresIn: 86400,
        });
        let userDetail = {
          username: user.username,
          phone: user.phone,
          email: user.email,
        };
        if (authorizer) {
          return res.json({
            successResponse: "login successful",
            token: "Bearer " + authorizer,
            user: userDetail,
          });
        }
      } else {
        res.json({
          errorResponse: "Incorrect password",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = userController;
