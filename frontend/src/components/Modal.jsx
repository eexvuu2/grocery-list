import React from "react";

const Modal = ({ showModal, setShowModal, children }) => {
  // Jika prop `showModal` adalah false, modal tidak ditampilkan
  if (!showModal) return null;

  return (
    <>
      {/* Overlay untuk latar belakang dengan efek modal */}
      <div className="fixed inset-0 z-50 flex justify-center items-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        {/* Konten utama modal */}
        <div className="relative w-full my-6 mx-6 max-w-3xl lg:max-w-6xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* Header modal */}
            <div className="flex items-start justify-between p-2 border-b border-solid border-gray-200 rounded-t">
              {/* Tombol close modal */}
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => {
                  setShowModal(false); // Mengubah state `showModal` menjadi false untuk menutup modal
                }}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  × {/* Tanda silang (close) */}
                </span>
              </button>
            </div>
            {/* Isi modal */}
            <div className="relative p-6 flex-auto">{children}</div>
          </div>
        </div>
      </div>
      {/* Overlay gelap ketika modal aktif */}
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Modal;
