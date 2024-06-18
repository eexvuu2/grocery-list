import React, { useEffect, useState } from "react";
import { register } from "./UserFunctions";
import FormValidator from "./FormValidator";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Register = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
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
        field: "name",
        method: "isEmpty",
        validWhen: false,
        message: "Name is required.",
      },
      {
        field: "password",
        method: "isEmpty",
        validWhen: false,
        message: "Password is required.",
      },
    ]).valid()
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

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
        field: "name",
        method: "isEmpty",
        validWhen: false,
        message: "Name is required.",
      },
      {
        field: "password",
        method: "isEmpty",
        validWhen: false,
        message: "Password is required.",
      },
    ]).validate({ name, email, password });

    setValidation(validation);

    if (validation.isValid) {
      const newUser = { name, email, password };
      register(newUser).then((res) => {
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          history.push(`/login`);
        }, 2000);
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("usertoken")) {
      history.push(`/todo-list`);
    }
  }, []);

  return (
    <div className="bg-[#F4D4B6] h-[calc(100vh-72px)] lg:h-[calc(100vh-76px)] py-12 grid">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-8">
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
          <div className="grid items-center order-1 lg:order-2">
            <div className="">
              <h1 className="text-3xl font-semibold mb-6 text-center">
                Please register
              </h1>
              {successMessage && (
                <p className="mb-4 text-green-500 text-center">
                  {successMessage}
                </p>
              )}
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className={`mt-1 block w-full px-3 py-2 border ${
                      validation.name.isInvalid
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                    name="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={handleInputChange}
                  />
                  {validation.name.isInvalid && (
                    <p className="mt-1 text-sm text-red-500">
                      {validation.name.message}
                    </p>
                  )}
                </div>
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
                <button
                  type="submit"
                  onClick={handleFormSubmit}
                  className="w-full bg-[#398159] text-white px-4 py-2 rounded-lg font-bold"
                >
                  Register
                </button>
              </form>
              <p className="mt-4 text-center text-md text-gray-600 font-bold">
                Already have an account?{" "}
                <Link to="/login" className="text-[#398159]">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
