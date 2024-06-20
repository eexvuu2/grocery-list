// Import modul dan komponen yang diperlukan
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom/cjs/react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import TodoList from "./components/TodoList";
import NotFound from "./components/NotFound";

/**
 * Komponen App adalah komponen utama yang mengatur routing aplikasi.
 * Menggunakan react-router-dom untuk mengatur navigasi antara halaman yang berbeda.
 *
 * @returns {JSX.Element} Elemen JSX yang mewakili aplikasi
 */
function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar selalu ditampilkan di semua halaman */}
        <Navbar />

        {/* Switch mengatur jalur rute yang berbeda */}
        <Switch>
          {/* Rute untuk halaman landing */}
          <Route exact path="/" component={Landing} />

          {/* Rute untuk halaman registrasi */}
          <Route exact path="/register" component={Register} />

          {/* Rute untuk halaman login */}
          <Route exact path="/login" component={Login} />

          {/* Rute untuk halaman profil pengguna */}
          <Route exact path="/profile" component={Profile} />

          {/* Rute untuk halaman daftar tugas */}
          <Route exact path="/todo-list" component={TodoList} />

          {/* Rute untuk halaman tidak ditemukan */}
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
