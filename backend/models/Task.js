// Mengimpor library Sequelize
const Sequelize = require("sequelize");

// Mengimpor instance sequelize dari file database/db.js
const db = require("../database/db.js");

// Mengekspor model Sequelize untuk tabel 'task'
module.exports = db.sequelize.define(
  "task", // Nama tabel
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
    status: {
      type: Sequelize.STRING, // Tipe data string untuk kolom status
    },
    user_id: {
      type: Sequelize.INTEGER, // Tipe data integer untuk kolom user_id
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
