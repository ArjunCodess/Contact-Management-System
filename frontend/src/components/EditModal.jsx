import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../App";

export default function EditModal({ setUsers, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: user.name,
    role: user.role,
    description: user.description,
    phone: user.phone,
  });

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const handleEditUser = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const res = await fetch(BASE_URL + "/contacts/" + user.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setUsers((prevUsers) => prevUsers.map((u) => (u.id === user.id ? data : u)));
      
      onClose();
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`, {
        position: "top-center",
        autoClose: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button onClick={onOpen} className="text-blue-500 hover:text-blue-700 bg-transparent p-1 rounded-full" aria-label="See menu">
        <BiEditAlt size={20} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="px-4 py-2 flex justify-between items-center border-b">
              <h3 className="text-lg font-semibold">New Contact</h3>

              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>

            <form onSubmit={handleEditUser}>
              <div className="px-4 py-6">
                <div className="flex gap-4 mb-4">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>

                    <input type="text" className="p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" placeholder="John Doe" value={inputs.name} onChange={(e) => setInputs((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700">Role</label>

                    <input type="text" className="p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" placeholder="Software Engineer" value={inputs.role} onChange={(e) => setInputs((prev) => ({ ...prev, role: e.target.value }))} />
                  </div>
                </div>
                <div className="flex mb-4">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700">Phone</label>

                    <input type="text" className="p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" placeholder="9999999999" value={inputs.phone} onChange={(e) => setInputs((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Description</label>

                  <textarea className="p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 resize-none" placeholder="He's a software engineer who loves to code and build things." value={inputs.description} onChange={(e) => setInputs((prev) => ({ ...prev, description: e.target.value }))} />
                </div>
              </div>
              <div className="px-4 py-3 border-t flex justify-end">
                <button type="submit" className={`bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 ${isLoading && "opacity-50 cursor-not-allowed"}`} disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update"}
                </button>

                <button type="button" onClick={onClose} className="ml-3 bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-700">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}