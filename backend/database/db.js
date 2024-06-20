const Sequelize = require("sequelize");

// Membuat objek db untuk menampung instance Sequelize dan konfigurasi lainnya
const db = {};

// Membuat instance Sequelize dengan konfigurasi koneksi ke database
const sequelize = new Sequelize("web", "root", "", {
  // Konfigurasi koneksi ke database
  host: "localhost", 
  dialect: "mysql", 
  operatorsAliases: false, 

  // Konfigurasi pool koneksi untuk mengatur jumlah koneksi yang dapat dibuka
  pool: {
    max: 5, 
    min: 0, 
    acquire: 30000, 
    idle: 10000, 
  },
});

// Menyimpan instance sequelize dan Sequelize ke dalam objek db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Mengekspor objek db agar dapat digunakan di file lain
module.exports = db;
