import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

const Landing = () => {
  return (
    <div className="bg-[#F4D4B6] min-h-[calc(100vh-72px)] lg:min-h-[calc(100vh-76px)] py-12 grid">
      <div className="container h-full px-6 relative">
        <div className=" grid grid-cols-1 lg:grid-cols-2 h-full content-center gap-8 lg:gap-14">
          <div className="space-y-4 flex flex-col justify-between items-start order-2 lg:order-1">
            <div className="font-black-han text-6xl">
              <h2 className="text-[#398159]">Grocery</h2>
              <h2 className="text-[#562426]">List</h2>
            </div>
            <p>
              Aplikasi ini membantu Anda mengatur dan mengelola daftar belanja
              dengan mudah dan efisien, memastikan setiap barang yang Anda
              butuhkan tercatat dengan rapi dan tidak ada yang terlewatkan.
              Dengan fitur yang intuitif dan user-friendly, Anda dapat dengan
              cepat menambahkan, menghapus, atau mengubah item dalam daftar
              belanja Anda, sehingga mengurangi kebingungan saat berbelanja dan
              memastikan pengalaman berbelanja Anda menjadi lebih menyenangkan
              dan terorganisir.
            </p>
            <button>
              <Link
                to="/todo-list"
                className="bg-[#F32249] text-white px-4 py-2 rounded-lg font-bold"
              >
                Coba sekarang
              </Link>
            </button>
          </div>

          <div className="grid justify-items-center items-center order-1 lg:order-1">
            <img
              src="/img/grocery.svg"
              alt="logo"
              width={"300px"}
              height={"300px"}
              className="w-1/2 z-10"
            />
          </div>
        </div>
      </div>
      <div className="absolute h-1/2 w-1/2 bg-[#EDBD97] bottom-0 right-0 hidden lg:block rounded-tl-3xl"></div>
    </div>
  );
};

export default Landing;
