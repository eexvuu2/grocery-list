import axios from "axios"; // Mengimpor modul axios untuk melakukan HTTP request

// Fungsi untuk mengambil daftar tugas dari server
export const getList = (token) => {
  return axios
    .get("/api/tasks", {
      headers: {
        "Content-Type": "application/json",
        Authorization: token, // Menambahkan token sebagai header Authorization
      },
    })
    .then((res) => {
      res.data.status = "success"; // Menambahkan status 'success' ke data response
      return res.data; // Mengembalikan data response
    })
    .catch((err) => {
      return {
        error: "Please login again!", // Pesan error jika terjadi error pada request
        status: "failed", // Menambahkan status 'failed' jika request gagal
        message: err.message, // Menambahkan pesan error ke objek response
      };
    });
};

// Fungsi untuk menambahkan tugas baru ke server
export const addToList = (task) => {
  return axios
    .post(
      "/api/task", // Endpoint untuk menambahkan tugas
      {
        name: task.name, // Nama tugas yang akan ditambahkan
        status: task.status, // Status tugas yang akan ditambahkan
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: task.token, // Menambahkan token sebagai header Authorization
        },
      }
    )
    .then(function (response) {
      return response.data; // Mengembalikan data response dari server
    })
    .catch((err) => {
      return {
        error: "Error to add", // Pesan error jika terjadi error pada request
        status: "failed", // Menambahkan status 'failed' jika request gagal
        message: err.message, // Menambahkan pesan error ke objek response
      };
    });
};

// Fungsi untuk menghapus tugas dari server berdasarkan ID tugas
export const deleteItem = (task, token) => {
  return axios
    .delete(`/api/task/${task}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token, // Menambahkan token sebagai header Authorization
      },
    })
    .then(function (response) {
      console.log(response); // Menampilkan response dari server ke console (opsional)
      return response; // Mengembalikan response dari server
    })
    .catch(function (error) {
      console.log(error); // Menampilkan error ke console (opsional)
      return error; // Mengembalikan error
    });
};

// Fungsi untuk memperbarui informasi tugas di server berdasarkan permintaan pembaruan
export const updateItem = (taskUpdateRequest) => {
  return axios
    .put(
      `/api/task/${taskUpdateRequest.id}`, // Endpoint untuk memperbarui tugas berdasarkan ID
      {
        name: taskUpdateRequest.name, // Nama tugas yang akan diperbarui
        status: taskUpdateRequest.status, // Status tugas yang akan diperbarui
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: taskUpdateRequest.token, // Menambahkan token sebagai header Authorization
        },
      }
    )
    .then(function (response) {
      return response.data; // Mengembalikan data response dari server setelah pembaruan
    });
};
