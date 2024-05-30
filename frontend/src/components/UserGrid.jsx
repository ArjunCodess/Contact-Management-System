import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../App";

export default function UserGrid({ users, setUsers }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(BASE_URL + "/contacts");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error);
        }
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, [setUsers]);

  console.log(users);
  return (
    <>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <UserCard key={user.id} user={user} setUsers={setUsers} />
        ))}
      </div>

      {isLoading && (
        <div className="flex justify-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status" />
        </div>
      )}
      {!isLoading && users.length === 0 && (
        <div className="flex justify-center">
          <p className="text-lg text-center">
            <span className="text-xl font-semibold">No contacts found.</span>
            <br />
            Click on the button above to create a new contact.
          </p>
        </div>
      )}
    </>
  );
}