import React, { useEffect, useState } from "react";
import { login } from "./UserFunctions"; // Mengimpor fungsi login dari UserFunctions
import FormValidator from "./FormValidator"; // Mengimpor kelas FormValidator untuk validasi formulir
import { Link } from "react-router-dom/cjs/react-router-dom.min"; // Mengimpor komponen Link dari react-router-dom

// Komponen Login adalah komponen fungsional yang menangani login pengguna
const Login = ({ history }) => {
  // State untuk menyimpan email, password, errors, dan validasi form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [validation, setValidation] = useState(
    new FormValidator([
      {
        field: "email",
        method: "isEmpty",
        validWhen: false,
        message: "Email is required.",
      },
      {
        field: "email",
        method: "isEmail",
        validWhen: true,
        message: "That is not a valid email.",
      },
      {
        field: "password",
        method: "isEmpty",
        validWhen: false,
        message: "Password is required.",
      },
    ]).valid()
  );

  // Fungsi untuk menangani perubahan input pada form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // Fungsi untuk menangani submit form
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Melakukan validasi form
    const validation = new FormValidator([
      {
        field: "email",
        method: "isEmpty",
        validWhen: false,
        message: "Email is required.",
      },
      {
        field: "email",
        method: "isEmail",
        validWhen: true,
        message: "That is not a valid email.",
      },
      {
        field: "password",
        method: "isEmpty",
        validWhen: false,
        message: "Password is required.",
      },
    ]).validate({ email, password });

    setValidation(validation);

    // Jika validasi berhasil, maka lakukan login
    if (validation.isValid) {
      const user = { email, password };
      login(user).then((res) => {
        if (res) {
          history.push(`/todo-list`); // Redirect ke halaman todo-list jika login berhasil
        }
      });
    }
  };

  // useEffect untuk mengecek apakah token pengguna ada di localStorage, jika ada, redirect ke halaman todo-list
  useEffect(() => {
    if (localStorage.getItem("usertoken")) {
      history.push(`/todo-list`);
    }
  }, []);

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
          {/* Kolom kedua yang berisi form login */}
          <div className="grid items-center order-1 lg:order-2">
            <div className="">
              <h1 className="text-3xl font-semibold mb-6 text-center">
                Please Login
              </h1>
              <form className="space-y-4">
                {/* Input untuk email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    className={`mt-1 block w-full px-3 py-2 border ${
                      validation.email.isInvalid
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                    name="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleInputChange}
                  />
                  {validation.email.isInvalid && (
                    <p className="mt-1 text-sm text-red-500">
                      {validation.email.message}
                    </p>
                  )}
                </div>
                {/* Input untuk password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className={`mt-1 block w-full px-3 py-2 border ${
                      validation.password.isInvalid
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleInputChange}
                  />
                  {validation.password.isInvalid && (
                    <p className="mt-1 text-sm text-red-500">
                      {validation.password.message}
                    </p>
                  )}
                </div>
                {/* Tombol login */}
                <button
                  type="submit"
                  onClick={handleFormSubmit}
                  className="w-full bg-[#398159] text-white px-4 py-2 rounded-lg font-bold"
                >
                  Login
                </button>
              </form>
              {/* Teks untuk redirect ke halaman register */}
              <p className="mt-4 text-center text-md text-gray-600 font-bold">
                Don't have an account?{" "}
                <Link to="/register" className="text-[#398159]">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Ekspor komponen Login untuk digunakan di tempat lain
export default Login;
