import Navbar from "./components/Navbar";
import UserGrid from "./components/UserGrid";
import { useState } from "react";

export const BASE_URL = import.meta.env.MODE === "development" ? "http://127.0.0.1:5000/api" : "/api";

export default function App() {
	const [users, setUsers] = useState([]);

	return (
		<div className="min-h-screen p-4">
			<Navbar setUsers={setUsers} />

			<div className="mt-6">
				<p className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-8">
					My Contacts
				</p>

				<UserGrid users={users} setUsers={setUsers} />
			</div>
		</div>
	);
}