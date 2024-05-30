import CreateUserModal from "./CreateUserModal";

export default function Navbar({ setUsers }) {
	return (
		<section className="flex justify-center gap-10 my-2 py-6 px-2 border rounded-lg bg-gray-200">
			<p className="text-lg md:text-3xl font-medium text-center">
				Contact Management System
			</p>
			<CreateUserModal setUsers={setUsers} />
		</section>
	);
}
