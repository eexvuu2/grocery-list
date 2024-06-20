// Mengimpor library yang diperlukan
var express = require("express");
var tasks = express.Router(); // Membuat router untuk task
const cors = require("cors"); // Mengimpor middleware CORS
const jwt = require("jsonwebtoken"); // Mengimpor library JWT untuk otentikasi

const Task = require("../models/Task"); // Mengimpor model Task

tasks.use(cors()); // Menggunakan middleware CORS

// Menetapkan SECRET_KEY untuk JWT
process.env.SECRET_KEY = "secret";

// Mendefinisikan endpoint untuk mendapatkan semua tasks berdasarkan user_id dari token
tasks.get("/tasks", function (req, res, next) {
  if (req.headers["authorization"]) {
    // Mengecek apakah ada token dalam header
    var decoded = jwt.verify(
      req.headers["authorization"],
      process.env.SECRET_KEY
    ); // Mendekode token
    Task.findAll({
      where: {
        user_id: decoded.id, // Mengambil tasks berdasarkan user_id dari token
      },
    })
      .then((tasks) => {
        res.json(tasks); // Mengirimkan response dengan data tasks
      })
      .catch((err) => {
        res.send("error: " + err); // Mengirimkan error jika terjadi kesalahan
      });
  } else {
    res.json({ status: "failed", message: "Token not passed !" }); // Mengirimkan response jika token tidak ada
    console.log("Token Not Passed");
  }
});

// Mendefinisikan endpoint untuk mendapatkan task berdasarkan id
tasks.get("/task/:id", function (req, res, next) {
  if (req.headers["authorization"]) {
    // Mengecek apakah ada token dalam header
    Task.findOne({
      where: {
        id: req.params.id, // Mengambil task berdasarkan id dari parameter URL
      },
    })
      .then((task) => {
        if (task) {
          res.json(task); // Mengirimkan response dengan data task
        } else {
          res.send("Task does not exist"); // Mengirimkan response jika task tidak ditemukan
        }
      })
      .catch((err) => {
        res.send("error: " + err); // Mengirimkan error jika terjadi kesalahan
      });
  } else {
    res.json({ status: "failed", message: "Token not passed !" }); // Mengirimkan response jika token tidak ada
    console.log("Token Not Passed");
  }
});

// Mendefinisikan endpoint untuk membuat task baru
tasks.post("/task", function (req, res, next) {
  if (req.headers["authorization"]) {
    // Mengecek apakah ada token dalam header
    if (!req.body.name && !req.body.status) {
      res.status(400);
      res.json({
        error: "Bad Data", // Mengirimkan response jika data tidak lengkap
      });
    } else {
      var decoded = jwt.verify(
        req.headers["authorization"],
        process.env.SECRET_KEY
      ); // Mendekode token
      const user_id = decoded.id;
      req.body.user_id = user_id; // Menambahkan user_id ke body request
      console.log("req-body", req.body);
      Task.create(req.body) // Membuat task baru dengan data dari body request
        .then((data) => {
          res.send(data); // Mengirimkan response dengan data task yang baru dibuat
        })
        .catch((err) => {
          res.json("error: " + err); // Mengirimkan error jika terjadi kesalahan
        });
    }
  } else {
    res.json({ status: "failed", message: "Token not passed !" }); // Mengirimkan response jika token tidak ada
    console.log("Token Not Passed");
  }
});

// Mendefinisikan endpoint untuk menghapus task berdasarkan id
tasks.delete("/task/:id", function (req, res, next) {
  if (req.headers["authorization"]) {
    // Mengecek apakah ada token dalam header
    var decoded = jwt.verify(
      req.headers["authorization"],
      process.env.SECRET_KEY
    ); // Mendekode token
    console.log("user_decoded_id", decoded.id);
    Task.findOne({
      where: {
        user_id: decoded.id, // Mengecek apakah task milik user yang terotentikasi
        id: req.params.id,
      },
    })
      .then((task) => {
        if (task) {
          Task.destroy({
            where: {
              id: req.params.id, // Menghapus task berdasarkan id
            },
          })
            .then(() => {
              res.json({ status: "Task Deleted!" }); // Mengirimkan response jika task berhasil dihapus
            })
            .catch((err) => {
              res.send("error: " + err); // Mengirimkan error jika terjadi kesalahan
            });
        } else {
          res.json({ status: "failed", message: "Task not found" }); // Mengirimkan response jika task tidak ditemukan
        }
      })
      .catch((err) => {
        res.json({ status: "failed", message: "Task not found" }); // Mengirimkan response jika terjadi kesalahan
      });
  } else {
    res.json({ status: "failed", message: "Token not passed !" }); // Mengirimkan response jika token tidak ada
    console.log("Token Not Passed");
  }
});

// Mendefinisikan endpoint untuk memperbarui task berdasarkan id
tasks.put("/task/:id", function (req, res, next) {
  if (req.headers["authorization"]) {
    // Mengecek apakah ada token dalam header
    if (!req.body.name && !req.body.status) {
      res.status(400);
      res.json({
        error: "Bad Data", // Mengirimkan response jika data tidak lengkap
      });
    } else {
      var decoded = jwt.verify(
        req.headers["authorization"],
        process.env.SECRET_KEY
      ); // Mendekode token
      console.log("user_decoded_id", decoded.id);
      Task.findOne({
        where: {
          user_id: decoded.id, // Mengecek apakah task milik user yang terotentikasi
          id: req.params.id,
        },
      })
        .then((task) => {
          if (task) {
            Task.update(
              { name: req.body.name, status: req.body.status }, // Memperbarui task dengan data baru
              { where: { id: req.params.id } }
            )
              .then(() => {
                res.json({ status: "success", message: "Task Updated !" }); // Mengirimkan response jika task berhasil diperbarui
              })
              .error((err) => handleError(err)); // Menangani error jika terjadi kesalahan
          } else {
            res.json({ status: "failed", message: "Task not found" }); // Mengirimkan response jika task tidak ditemukan
          }
        })
        .catch((err) => {
          res.json({ status: "failed", message: "Task not found" }); // Mengirimkan response jika terjadi kesalahan
        });
    }
  } else {
    res.json({ status: "failed", message: "Token not passed !" }); // Mengirimkan response jika token tidak ada
    console.log("Token Not Passed");
  }
});

module.exports = tasks; // Mengekspor router tasks
