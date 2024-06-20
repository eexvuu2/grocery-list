// Mengimpor library yang diperlukan
var express = require("express"); // Mengimpor framework Express untuk membuat server web
var cors = require("cors"); // Mengimpor middleware CORS untuk mengizinkan cross-origin requests
var bodyParser = require("body-parser"); // Mengimpor middleware body-parser untuk mem-parsing body request

// Membuat instance aplikasi Express
var app = express();

// Mengatur port dari variabel lingkungan atau default ke 8080
var port = process.env.PORT || 8080;

// Menggunakan middleware body-parser untuk mem-parsing JSON dan URL-encoded data
app.use(bodyParser.json()); // Untuk mem-parsing application/json
app.use(cors()); // Menggunakan middleware CORS untuk mengizinkan cross-origin requests
app.use(
  bodyParser.urlencoded({
    extended: false, // Untuk mem-parsing application/x-www-form-urlencoded
  })
);

// Mengimpor route handler untuk Users dan Tasks
var Users = require("./routes/Users");
var Tasks = require("./routes/Tasks");

// Menggunakan route handler untuk rute '/users' dan '/api'
app.use("/users", Users); // Semua rute yang dimulai dengan '/users' akan di-handle oleh Users
app.use("/api", Tasks); // Semua rute yang dimulai dengan '/api' akan di-handle oleh Tasks

// Menjalankan server pada port yang ditentukan
app.listen(port, function () {
  console.log("Server is running on port: " + port); // Menampilkan pesan bahwa server berjalan di port yang ditentukan
});
