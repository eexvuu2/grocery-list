import React, { useState, useEffect } from "react";
import {
  getList,
  addToList,
  deleteItem,
  updateItem,
} from "./TodoListFunctions";
import FormValidator from "./FormValidator";
import Modal from "./Modal";

const TodoList = ({ history }) => {
  const [id, setId] = useState("");
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("0");
  const [createdAt, setCreatedAt] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [items, setItems] = useState([]);
  const [validation, setValidation] = useState(
    new FormValidator([
      {
        field: "task",
        method: "isEmpty",
        validWhen: false,
        message: "Task name is required",
      },
      {
        field: "status",
        method: "isEmpty",
        validWhen: false,
        message: "Status is required",
      },
    ]).valid()
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete confirmation modal
  const [deleteItemId, setDeleteItemId] = useState(null); // State to hold the item id to be deleted

  useEffect(() => {
    const token = localStorage.usertoken;
    getAll(token);
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "task") setTask(value);
    if (name === "status") setStatus(value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const getStatus = (statusCode) => {
    const statusArray = ["Do", "Done"];
    return statusArray[statusCode];
  };

  const formatDate = (date) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return (
      date.getDate() +
      " " +
      monthNames[date.getMonth()] +
      ", " +
      date.getFullYear()
    );
  };

  const getAll = (token) => {
    getList(token).then((data) => {
      if (data.status !== "success") {
        localStorage.removeItem("usertoken");
        history.push(`/login`);
      } else {
        setItems(data.reverse());
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const validation = new FormValidator([
      {
        field: "task",
        method: "isEmpty",
        validWhen: false,
        message: "Task name is required",
      },
      {
        field: "status",
        method: "isEmpty",
        validWhen: false,
        message: "Status is required",
      },
    ]).validate({ task, status });
    setValidation(validation);

    if (validation.isValid) {
      const token = localStorage.usertoken;
      const taskRequest = {
        token: token,
        name: task,
        status: status,
      };

      addToList(taskRequest)
        .then(() => {
          getAll(token);
          setShowModal(false);
          setTask(""); // Clear task input
          setStatus("0"); // Reset status
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
    }
  };

  const onUpdate = (e) => {
    e.preventDefault();
    const validation = new FormValidator([
      {
        field: "task",
        method: "isEmpty",
        validWhen: false,
        message: "Task name is required",
      },
      {
        field: "status",
        method: "isEmpty",
        validWhen: false,
        message: "Status is required",
      },
    ]).validate({ task, status });
    setValidation(validation);

    if (validation.isValid) {
      const token = localStorage.usertoken;
      const taskUpdateRequest = {
        id: id,
        token: token,
        name: task,
        status: status,
      };
      updateItem(taskUpdateRequest)
        .then(() => {
          getAll(token);
          setShowModal(false);
          setTask(""); // Clear task input
          setStatus("0"); // Reset status
        })
        .catch((err) => {
          setErrorMessage(err.message);
          setIsUpdate(false);
        });
    }
    setIsUpdate(false);
    setStatus(0);
  };

  const onEdit = (item_id, item, status, e) => {
    e.preventDefault();
    setId(item_id);
    setTask(item);
    setStatus(status.toString());
    setErrorMessage("");
    setIsUpdate(true);
    setValidation(
      new FormValidator([
        {
          field: "task",
          method: "isEmpty",
          validWhen: false,
          message: "Task name is required",
        },
        {
          field: "status",
          method: "isEmpty",
          validWhen: false,
          message: "Status is required",
        },
      ]).valid()
    );
    setShowModal(true); // Show the modal on edit
  };

  const onDelete = (itemId, e) => {
    e.preventDefault();
    setDeleteItemId(itemId); // Set the item id to be deleted
    setShowDeleteModal(true); // Show the delete confirmation modal
  };

  const confirmDelete = () => {
    const token = localStorage.usertoken;
    deleteItem(deleteItemId, token)
      .then((res) => {
        if (res.data.status === "failed") {
          setErrorMessage(res.data.message);
        }
        getAll(token);
        setShowDeleteModal(false); // Close the delete confirmation modal
        setDeleteItemId(null); // Reset the item id to be deleted
      })
      .catch((err) => {
        setErrorMessage(err.data.message);
      });
  };

  const filteredItems = items.filter((item) => {
    return (
      (filterStatus === "all" || item.status.toString() === filterStatus) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="mx-auto p-4 bg-[#F4D4B6] min-h-[calc(100vh-72px)] lg:min-h-[calc(100vh-76px)]">
      <div className="w-full mt-5 container">
        <div className="w-full">
          {errorMessage && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <strong>Error Message: </strong> {errorMessage}
            </div>
          )}
        </div>
        <button
          className="bg-[#398159] text-white  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-full"
          type="button"
          onClick={() => {
            setShowModal(true);
            setTask("");
            setStatus("0");
          }}
        >
          Buat Catatan
        </button>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          setTask={setTask}
          setStatus={setStatus}
        >
          <form onSubmit={isUpdate ? onUpdate : onSubmit}>
            <div className="mb-4">
              <label htmlFor="task" className="block text-gray-700">
                Task Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  className={`block w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    validation.task.isInvalid
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  value={task}
                  name="task"
                  onChange={onChange}
                />
                <span className="text-red-500 text-sm">
                  {validation.task.message}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <span className="block text-gray-700 mb-2">Task Status</span>
              <div className="flex items-center">
                <label className="mr-4">
                  <input
                    type="radio"
                    className="mr-1"
                    name="status"
                    value="0"
                    checked={status === "0"}
                    onChange={onChange}
                  />
                  Do
                </label>
                <label>
                  <input
                    type="radio"
                    className="mr-1"
                    name="status"
                    value="1"
                    checked={status === "1"}
                    onChange={onChange}
                  />
                  Done
                </label>
              </div>
              <span className="text-red-500 text-sm">
                {validation.status.message}
              </span>
            </div>
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md text-white transition duration-200 ${
                isUpdate ? "bg-[#398159]" : "bg-[#398159]"
              }`}
            >
              {isUpdate ? "Update" : "Submit"}
            </button>
          </form>
        </Modal>
        <DeleteConfirmationModal
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
          confirmDelete={confirmDelete}
        />
        {items.length > 0 && (
          <>
            <div className="mt-4 mb-4">
              <input
                type="text"
                className="block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="mb-4">
              <select
                className="block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filterStatus}
                onChange={handleFilterChange}
              >
                <option value="all">All</option>
                <option value="0">Do</option>
                <option value="1">Done</option>
              </select>
            </div>
          </>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.length === 0 ? (
            <div className="text-center col-span-full mt-12 flex flex-col items-center">
              <img
                src="/img/grocery.svg"
                alt="logo"
                width={"380px"}
                height={"300px"}
                className="w-64"
              />
              <p className="text-gray-600 font-bold text-xl mt-6">
                Tidak ada catatan 😀
              </p>
            </div>
          ) : (
            filteredItems.map((item, index) => (
              <div
                key={index}
                className={`bg-white p-4 border rounded-md shadow-sm flex flex-col justify-between ${
                  getStatus(item.status) === "Done" ? "opacity-40" : ""
                }`}
              >
                <div>
                  <h3 className="text-lg font-semibold break-words">
                    {getStatus(item.status) === "Done" ? (
                      <s>{item.name}</s>
                    ) : (
                      item.name
                    )}
                  </h3>
                  <div className="mt-2">
                    <p className="text-gray-600">
                      Status: {getStatus(item.status)}
                    </p>
                    <p className="text-gray-600">
                      Tanggal dibuat: {formatDate(new Date(item.createdAt))}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    className="bg-[#398159] text-white py-1 px-2 rounded-md mr-1 transition duration-200 "
                    onClick={(e) => onEdit(item.id, item.name, item.status, e)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded-md transition duration-200 hover:bg-red-600"
                    onClick={(e) => onDelete(item.id, e)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const DeleteConfirmationModal = ({
  showModal,
  setShowModal,
  confirmDelete,
}) => {
  return (
    <div
      className={`${
        showModal ? "fixed" : "hidden"
      } inset-0 z-50 overflow-auto bg-smoke-light flex`}
    >
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg z-50">
        <span className="text-lg font-semibold">Konfirmasi Hapus List</span>
        <p className="mt-4">Apakah Anda ingin menghapus ini?</p>
        <div className="flex mt-4">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded mr-2"
            onClick={confirmDelete}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 py-2 px-4 rounded"
            onClick={() => setShowModal(false)}
          >
            No
          </button>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default TodoList;
