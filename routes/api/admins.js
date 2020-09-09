const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/User");

const Admin = require("../../models/Admin");

router.get("/test", (req, res) => res.json({ msg: "admins Works" }));

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Admin.findOne({ email: req.body.email }).then((admin) => {
    if (admin) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      const newadmin = new Admin({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newadmin.password, salt, (err, hash) => {
          if (err) throw err;
          newadmin.password = hash;
          newadmin
            .save()
            .then((admin) => res.json(admin))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  Admin.findOne({ email }).then((admin) => {
    if (!admin) {
      errors.email = "admin not found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, admin.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: admin.id,
          name: admin.name,
          avatar: admin.avatar,
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.admin.id,
      name: req.admin.name,
      email: req.admin.email,
    });
  }
);

router.get("/uv", (req, res) => {
  const errors = {};

  User.find()
    .then((users) => {
      if (!users) {
        errors.user = "There are no users";
        return res.status(404).json(errors);
      }

      res.json(users);
    })
    .catch((err) => res.status(404).json({ user: "There are no users" }));
});

router.get("/uv/:id", (req, res) => {
  passport.authenticate("jwt", { session: false }),
    User.findById(req.params.id)
      .sort({ date: -1 })
      .then((user) => res.json(user))
      .catch((err) =>
        res.status(404).json({ nouser: "No users found by this id" })
      );
});

router.post("/uv/:id", (req, res) => {
  passport.authenticate("jwt", { session: false }),
    User.findById(req.params.id).then((user) => {
      user.stat = "true";
      user.save().then((user) => res.json(user));
    });
});
module.exports = router;
