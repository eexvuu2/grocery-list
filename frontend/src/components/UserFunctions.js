import axios from "axios"; // Mengimpor modul axios untuk melakukan HTTP request

// Fungsi untuk melakukan registrasi pengguna baru
export const register = (newUser) => {
  return axios
    .post("users/register", {
      // Melakukan HTTP POST request ke endpoint '/users/register'
      name: newUser.name, // Mengirimkan nama pengguna baru
      email: newUser.email, // Mengirimkan email pengguna baru
      password: newUser.password, // Mengirimkan password pengguna baru
    })
    .then((response) => {
      console.log("Registered"); // Menampilkan pesan "Registered" ke console jika registrasi berhasil
    });
};

// Fungsi untuk melakukan login pengguna
export const login = (user) => {
  return axios
    .post("users/login", {
      // Melakukan HTTP POST request ke endpoint '/users/login'
      email: user.email, // Mengirimkan email pengguna untuk login
      password: user.password, // Mengirimkan password pengguna untuk login
    })
    .then((response) => {
      localStorage.setItem("usertoken", response.data.token); // Menyimpan token pengguna di local storage setelah login berhasil
      return response.data; // Mengembalikan data response dari server
    })
    .catch((err) => {
      console.log(err); // Menampilkan error ke console jika login gagal
    });
};

// Fungsi untuk mengambil profil pengguna berdasarkan token
export const getProfile = (token) => {
  return axios
    .get("users/profile", {
      // Melakukan HTTP GET request ke endpoint '/users/profile'
      headers: { Authorization: token }, // Mengirimkan token sebagai Authorization header untuk otorisasi
    })
    .then((response) => {
      response.data.status = "success"; // Menambahkan status 'success' ke data response jika request berhasil
      return response.data; // Mengembalikan data response dari server
    })
    .catch((err) => {
      console.dir(err); // Menampilkan error ke console untuk debugging (opsional)
      return { error: err.message, status: "failed" }; // Mengembalikan objek error jika request gagal
    });
};

// Fungsi untuk memperbarui password pengguna
export const updatePassword = (updatePasswordRequest) => {
  return axios
    .put(
      `/users/password/`, // Melakukan HTTP PUT request ke endpoint '/users/password/'
      {
        email: updatePasswordRequest.email, // Mengirimkan email pengguna untuk validasi
        password: updatePasswordRequest.password, // Mengirimkan password lama pengguna
        new_password: updatePasswordRequest.new_password, // Mengirimkan password baru pengguna
      },
      {
        headers: {
          "Content-Type": "application/json", // Menetapkan tipe konten sebagai JSON
          Authorization: updatePasswordRequest.token, // Mengirimkan token sebagai Authorization header untuk otorisasi
        },
      }
    )
    .then(function (response) {
      return response.data; // Mengembalikan data response dari server setelah pembaruan berhasil
    })
    .catch((err) => {
      console.dir("err", err); // Menampilkan error ke console untuk debugging (opsional)
      return err.message; // Mengembalikan pesan error jika request gagal
    });
};
