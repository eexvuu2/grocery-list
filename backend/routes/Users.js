// Mengimpor library yang diperlukan
const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User"); // Mengimpor model User
users.use(cors());

// Menetapkan SECRET_KEY untuk JWT
process.env.SECRET_KEY = "secret";

// Endpoint untuk registrasi pengguna baru
users.post("/register", (req, res) => {
  const today = new Date();
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    createdAt: today,
  };

  // Mencari pengguna berdasarkan email
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        // Mengenkripsi password sebelum menyimpan ke database
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((user) => {
              // Membuat token JWT
              let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440,
              });
              res.json({ token: token });
            })
            .catch((err) => {
              res.send("error: " + err);
            });
        });
      } else {
        res.json({ error: "User already exists" }); // Mengirimkan response jika pengguna sudah ada
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

// Endpoint untuk login pengguna
users.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (user) {
        // Memeriksa kecocokan password
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // Membuat token JWT
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });
          res.json({ token: token });
        } else {
          res.send("Wrong Password!"); // Mengirimkan response jika password salah
        }
      } else {
        res.status(400).json({ error: "User does not exist" }); // Mengirimkan response jika pengguna tidak ada
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

// Endpoint untuk mendapatkan profil pengguna
users.get("/profile", (req, res) => {
  var decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  ); // Mendekode token
  User.findOne({
    where: {
      id: decoded.id, // Mencari pengguna berdasarkan id yang diekstrak dari token
    },
  })
    .then((user) => {
      if (user) {
        res.json(user); // Mengirimkan response dengan data pengguna
      } else {
        res.send("User does not exist"); // Mengirimkan response jika pengguna tidak ada
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

// Endpoint untuk memperbarui password pengguna
users.put("/password", function (req, res, next) {
  if (req.headers["authorization"]) {
    if (
      !req.body.email &&
      !req.body.password &&
      !req.body.new_password &&
      !req.body.confirm_password
    ) {
      res.status(400);
      res.json({
        error: "Bad Data", // Mengirimkan response jika data tidak lengkap
      });
    } else {
      User.findOne({
        where: {
          email: req.body.email, // Mencari pengguna berdasarkan email
        },
      }).then((user) => {
        if (user) {
          // Memeriksa kecocokan password lama
          if (bcrypt.compareSync(req.body.password, user.password)) {
            bcrypt.hash(req.body.new_password, 10, (err, hash) => {
              // Memperbarui password dengan yang baru
              User.update(
                { password: hash },
                { where: { email: req.body.email } }
              )
                .then(() => {
                  res.json({
                    status: "success",
                    message: "Password Updated !",
                  }); // Mengirimkan response jika password berhasil diperbarui
                })
                .error((err) => handleError(err));
            });
          } else {
            res.json({
              status: "failed",
              message: "Old password not matched", // Mengirimkan response jika password lama tidak cocok
            });
          }
        }
      });
    }
  } else {
    res.json({ status: "failed", message: "Token not passed !" }); // Mengirimkan response jika token tidak ada
  }
});

module.exports = users; // Mengekspor router users
