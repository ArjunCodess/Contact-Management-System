import { BiTrash } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";
import EditModal from "./EditModal";
import { BASE_URL } from "../App";
import 'react-toastify/dist/ReactToastify.css';

export default function UserCard({ user, setUsers }) {
  const handleDeleteUser = async () => {
    try {
      const res = await fetch(BASE_URL + "/contacts/" + user.id, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));

      toast.success("Contact deleted successfully.", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`, {
        position: "top-center",
        autoClose: 4000,
        closeOnClick: true,
      });
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex gap-4">
          <div className="flex flex-1 gap-4 items-center">
            <img src={user.imgUrl} alt="Avatar" className="rounded-full w-10 h-10" />
            
            <div>
              <h2 className="text-base font-semibold">{user.name} ({user.phone})</h2>
              <p className="text-gray-500">{user.role}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <EditModal user={user} setUsers={setUsers} />

            <button className="bg-transparent text-red-500 hover:text-red-700 p-1 rounded-full" aria-label="See menu" onClick={handleDeleteUser}>
              <BiTrash size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="card-body">
        <p>{user.description}</p>
      </div>

      <ToastContainer />
    </div>
  );
}