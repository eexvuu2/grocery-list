// Mengimpor library Sequelize
const Sequelize = require("sequelize");

// Mengimpor instance sequelize dari file database/db.js
const db = require("../database/db.js");

// Mengekspor model Sequelize untuk tabel 'user'
module.exports = db.sequelize.define(
  "user", // Nama tabel
  {
    // Mendefinisikan kolom-kolom tabel dan tipe datanya
    id: {
      type: Sequelize.INTEGER, // Tipe data integer
      primaryKey: true, // Menetapkan kolom ini sebagai primary key
      autoIncrement: true, // Nilai kolom ini akan otomatis bertambah
    },
    name: {
      type: Sequelize.STRING, // Tipe data string untuk kolom nama
    },
    email: {
      type: Sequelize.STRING, // Tipe data string untuk kolom email
      unique: true, // Nilai kolom ini harus unik
    },
    password: {
      type: Sequelize.STRING, // Tipe data string untuk kolom password
    },
    createdAt: {
      type: Sequelize.DATE, // Tipe data date untuk kolom createdAt
      defaultValue: Sequelize.NOW, // Nilai default adalah waktu sekarang
    },
  },
  {
    timestamps: false, // Menonaktifkan otomatisasi kolom timestamps (createdAt dan updatedAt)
  }
);
