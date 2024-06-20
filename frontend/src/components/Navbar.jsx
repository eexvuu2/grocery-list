import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

const Landing = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false); // State untuk mengatur apakah menu dropdown terbuka atau tidak

  // Fungsi untuk logout pengguna
  const logOut = (e) => {
    e.preventDefault(); // Mencegah perilaku default dari link atau button
    localStorage.removeItem("usertoken"); // Menghapus token pengguna dari local storage
    history.push(`/`); // Mengarahkan kembali ke halaman utama setelah logout
  };

  // Fungsi untuk mengubah status menu dropdown
  const toggleMenu = () => {
    setIsOpen(!isOpen); // Mengubah nilai isOpen menjadi kebalikannya
  };

  // Fungsi untuk menutup menu dropdown
  const closeMenu = () => {
    setIsOpen(false); // Mengatur isOpen menjadi false untuk menutup menu dropdown
  };

  // Tampilan link untuk pengguna yang belum login
  const loginRegLink = (
    <ul className="flex flex-col lg:flex-row lg:space-x-4">
      <li>
        <Link
          to="/login"
          className="text-white hover:text-gray-300"
          onClick={closeMenu} // Menutup menu dropdown setelah link diklik
        >
          Login
        </Link>
      </li>
      <li>
        <Link
          to="/register"
          className="text-white hover:text-gray-300"
          onClick={closeMenu} // Menutup menu dropdown setelah link diklik
        >
          Register
        </Link>
      </li>
    </ul>
  );

  // Tampilan link untuk pengguna yang sudah login
  const userLink = (
    <ul className="flex flex-col lg:flex-row lg:space-x-4 text-white">
      <li>
        <Link
          to="/todo-list"
          className="hover:text-gray-300"
          onClick={closeMenu} // Menutup menu dropdown setelah link diklik
        >
          Grocery List
        </Link>
      </li>
      <li>
        <Link
          to="/profile"
          className="hover:text-gray-300"
          onClick={closeMenu} // Menutup menu dropdown setelah link diklik
        >
          User
        </Link>
      </li>
      <li>
        <a
          href="/"
          onClick={(e) => {
            logOut(e); // Melakukan logout dan menutup menu dropdown setelah logout
            closeMenu();
          }}
          className="hover:text-gray-300"
        >
          Logout
        </a>
      </li>
    </ul>
  );

  return (
    <nav className="text-white bg-[#398159] text-lg">
      {" "}
      {/* Navigasi dengan tampilan warna latar dan teks */}
      <div className="p-4 container mx-auto">
        {" "}
        {/* Container dengan padding dan berada di tengah layar */}
        <div className="flex justify-between items-center">
          {" "}
          {/* Baris dengan justify content dan align items */}
          <button
            className="lg:hidden text-white" // Tombol untuk toggle menu pada tampilan responsif
            onClick={toggleMenu} // Mengaktifkan fungsi toggleMenu saat tombol diklik
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="hidden lg:flex justify-between items-center w-full">
            {" "}
            {/* Baris untuk tampilan desktop */}
            <ul className="flex space-x-4">
              {" "}
              {/* Daftar menu horizontal */}
              <li>
                <Link
                  to="/"
                  className="text-white font-bold hover:text-gray-300"
                >
                  Home
                </Link>
              </li>
            </ul>
            {localStorage.usertoken ? userLink : loginRegLink}{" "}
            {/* Menampilkan userLink atau loginRegLink berdasarkan status login pengguna */}
          </div>
        </div>
        <div className={`${isOpen ? "block" : "hidden"} lg:hidden mt-4`}>
          {" "}
          {/* Menu dropdown untuk tampilan responsif */}
          <ul className="space-y-2">
            {" "}
            {/* Daftar vertikal untuk tampilan dropdown */}
            <li>
              <Link
                to="/"
                className="text-white font-bold hover:text-gray-300"
                onClick={closeMenu} // Menutup menu dropdown saat link diklik
              >
                Home
              </Link>
            </li>
          </ul>
          {localStorage.usertoken ? userLink : loginRegLink}{" "}
          {/* Menampilkan userLink atau loginRegLink berdasarkan status login pengguna */}
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Landing); // Menggunakan withRouter untuk mengakses objek history dari props
