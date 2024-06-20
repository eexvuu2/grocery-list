import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getProfile, updatePassword } from "./UserFunctions"; // Mengimpor fungsi getProfile dan updatePassword
import FormValidator from "./FormValidator"; // Mengimpor FormValidator untuk validasi form
import Modal from "./Modal"; // Mengimpor komponen Modal

// Komponen Profile untuk menampilkan dan mengelola profil pengguna
const Profile = () => {
  // State untuk menyimpan data profil dan form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [validation, setValidation] = useState({
    password: {},
    newPassword: {},
    confirmPassword: {},
  });
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();

  // Validator untuk form validasi
  const validator = new FormValidator([
    {
      field: "password",
      method: "isEmpty",
      validWhen: false,
      message: "Password is required.",
    },
    {
      field: "newPassword",
      method: "isEmpty",
      validWhen: false,
      message: "New password is required.",
    },
    {
      field: "confirmPassword",
      method: "isEmpty",
      validWhen: false,
      message: "Password confirmation is required.",
    },
    {
      field: "confirmPassword",
      method: (confirmation, state) => state.newPassword === confirmation,
      validWhen: true,
      message: "Password and password confirmation do not match.",
    },
  ]);

  // useEffect untuk mendapatkan profil pengguna ketika komponen di-mount
  useEffect(() => {
    const token = localStorage.usertoken;
    if (token) {
      getProfile(token).then((res) => {
        if (res && res.status === "success") {
          setName(res.name);
          setEmail(res.email);
        } else {
          localStorage.removeItem("usertoken");
          history.push("/login");
        }
      });
    } else {
      localStorage.removeItem("usertoken");
      history.push("/login");
    }
  }, [history]);

  // Fungsi untuk menangani perubahan input pada form
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") setPassword(value);
    if (name === "newPassword") setNewPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  // Fungsi untuk menangani submit form
  const onSubmit = (e) => {
    e.preventDefault();

    // Melakukan validasi form
    const validationResults = validator.validate({
      password,
      newPassword,
      confirmPassword,
    });
    setValidation(validationResults);

    // Jika validasi berhasil, maka lakukan update password
    if (validationResults.isValid) {
      const formData = {
        email,
        password,
        new_password: newPassword,
      };

      updatePassword(formData)
        .then((res) => {
          setMessage(res.message);
          setShowModal(false); // Tutup modal jika update berhasil
        })
        .catch((err) => {
          setMessage(err.message);
        });
    }
  };

  return (
    <div className="bg-[#F4D4B6] h-[calc(100vh-72px)] lg:h-[calc(100vh-76px)] py-12 grid">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-8">
          {/* Kolom pertama yang berisi gambar dan teks */}
          <div className="w-full h-full bg-[#EDBD97] rounded-xl grid justify-items-center items-center order-2 lg:order-1">
            <div className="flex items-center flex-col gap-6">
              <img
                src="/img/shop.svg"
                alt="logo"
                width={"300px"}
                height={"300px"}
                className="w-1/2 z-10"
              />
              <div className="font-black-han text-4xl text-center">
                <h2 className="text-[#398159]">Catat kebutuhan Anda</h2>
              </div>
            </div>
          </div>
          {/* Kolom kedua yang berisi informasi profil dan form update password */}
          <div className="grid items-center order-1 lg:order-2 h-full bg-white rounded-lg shadow-md">
            <div className="container h-full">
              <div className="p-6 h-full flex flex-col justify-between">
                <div>
                  <h1 className="font-black-han text-4xl text-center mb-8">
                    Profile
                  </h1>
                  <table className="w-full mb-6">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 font-semibold">Name</td>
                        <td className="py-2">{name}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-semibold">Email</td>
                        <td className="py-2">{email}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {message && (
                  <div className="mb-4 p-4 bg-blue-100 text-blue-700 rounded-lg">
                    {message}
                  </div>
                )}
                <button
                  className="bg-[#398159] text-white px-4 py-2 rounded-lg font-bold w-full"
                  onClick={() => setShowModal(true)}
                >
                  Change Password
                </button>

                {/* Modal untuk form update password */}
                <Modal showModal={showModal} setShowModal={setShowModal}>
                  <form onSubmit={onSubmit}>
                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Current Password
                      </label>
                      <input
                        type="password"
                        className={`mt-1 block w-full px-3 py-2 border ${
                          validation.password.isInvalid
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                        value={password}
                        name="password"
                        onChange={onChange}
                      />
                      {validation.password.isInvalid && (
                        <p className="mt-1 text-sm text-red-500">
                          {validation.password.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        className={`mt-1 block w-full px-3 py-2 border ${
                          validation.newPassword.isInvalid
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                        value={newPassword}
                        name="newPassword"
                        onChange={onChange}
                      />
                      {validation.newPassword.isInvalid && (
                        <p className="mt-1 text-sm text-red-500">
                          {validation.newPassword.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className={`mt-1 block w-full px-3 py-2 border ${
                          validation.confirmPassword.isInvalid
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                        value={confirmPassword}
                        name="confirmPassword"
                        onChange={onChange}
                      />
                      {validation.confirmPassword.isInvalid && (
                        <p className="mt-1 text-sm text-red-500">
                          {validation.confirmPassword.message}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-[#398159] text-white px-4 py-2 rounded-lg font-bold"
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Ekspor komponen Profile untuk digunakan di tempat lain
export default Profile;
