import { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { BASE_URL } from "../App";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateUserModal({ setUsers, className = "" }) {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [inputs, setInputs] = useState({
		name: "",
		role: "",
		description: "",
		gender: "",
		phone: "",
	});

	const onOpen = () => setIsOpen(true);
	const onClose = () => setIsOpen(false);

	const handleCreateUser = async (e) => {
		e.preventDefault(); // prevent page refresh
		setIsLoading(true);
		try {
			const res = await fetch(BASE_URL + "/contacts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
			});

			const data = await res.json();
			
			if (!res.ok) {
				throw new Error(data.error);
			}

			toast.success("Yayy! 🎉 contact created successfully.", {
				position: "top-center",
				autoClose: 2000,
			});

			onClose();

			setUsers((prevUsers) => [...prevUsers, data]); // important - to not reload the page to see the updated array of contacts

			setInputs({
				name: "",
				role: "",
				description: "",
				gender: "",
				phone: "",
			}); // clear inputs
			
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
		<div className={className}>
			<button onClick={onOpen} className="text-blue-500 hover:text-blue-700 bg-transparent p-1 rounded-full">
				<div className="md:hidden inline-block"><BiAddToQueue size={20} /></div>
				<div className="hidden md:inline-block"><BiAddToQueue size={25} /></div>
			</button>

			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2 shadow-inner">
					<div className="bg-white rounded-lg shadow-lg w-full max-w-md">
						<div className="px-4 py-2 flex justify-between items-center border-b">
							<h3 className="text-lg font-semibold">New Contact</h3>
							<button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
						</div>
						<form onSubmit={handleCreateUser}>
							<div className="px-4 py-6">
								<div className="flex gap-4 mb-4">
									<div className="w-full">
										<label className="block text-sm font-medium text-gray-700">Full Name</label>
										<input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2" placeholder="John Doe" value={inputs.name} onChange={(e) => setInputs({ ...inputs, name: e.target.value })} />
									</div>
									<div className="w-full">
										<label className="block text-sm font-medium text-gray-700">Role</label>
										<input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2" placeholder="Software Engineer" value={inputs.role} onChange={(e) => setInputs({ ...inputs, role: e.target.value })} />
									</div>
								</div>
								<div className="flex mb-4">
									<div className="w-full">
										<label className="block text-sm font-medium text-gray-700">Phone</label>
										<input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2" placeholder="9999999999" value={inputs.phone} onChange={(e) => setInputs({ ...inputs, phone: e.target.value })} />
									</div>
								</div>
								<div className="mb-4">
									<label className="block text-sm font-medium text-gray-700">Description</label>
									<textarea className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 resize-none p-2" placeholder="He's a software engineer who loves to code and build things." value={inputs.description} onChange={(e) => setInputs({ ...inputs, description: e.target.value })} />
								</div>
								<div className="mb-4">
									<label className="block text-sm font-medium text-gray-700">Gender</label>
									<div className="flex gap-4 pt-1">
										<label className="flex items-center">
											<input type="radio" name="gender" value="male" className="form-radio" onChange={(e) => setInputs({ ...inputs, gender: e.target.value })} />
											<span className="ml-2">Male</span>
										</label>
										<label className="flex items-center">
											<input type="radio" name="gender" value="female" className="form-radio" onChange={(e) => setInputs({ ...inputs, gender: e.target.value })} />
											<span className="ml-2">Female</span>
										</label>
									</div>
								</div>
							</div>
							<div className="px-4 py-3 border-t flex justify-end">
								<button type="submit" className={`bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 ${isLoading && "opacity-50 cursor-not-allowed"}`} disabled={isLoading}>
									{isLoading ? "Adding..." : "Add"}
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
		</div>
	);
}