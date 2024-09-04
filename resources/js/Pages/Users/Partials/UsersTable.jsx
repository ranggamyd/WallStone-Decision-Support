import Pagination from "@/Components/Pagination";
import UserForm from "./UserForm";
import DeleteUserForm from "./DeleteUserForm";

export default function UsersTable({ users, links, current_page, per_page }) {
    return (
        <>
            <div className="border rounded-lg divide-y divide-gray-200 shadow">
                <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 h-[52px]">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase"
                                >
                                    #
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase"
                                >
                                    Nama Lengkap
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase"
                                >
                                    Username
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase"
                                >
                                    Alamat E-Mail
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase"
                                >
                                    Opsi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.length > 0 ? (
                                users.map((user, i) => (
                                    <tr
                                        key={user.id}
                                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                                    >
                                        <th className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                            {(current_page - 1) * per_page +
                                                (i + 1)}
                                        </th>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            {user.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            {user.username}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex gap-x-2 justify-center">
                                                <UserForm user={user} />
                                                <DeleteUserForm id={user.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="bg-white border-b transition duration-100 ease-in-out hover:bg-gray-100">
                                    <th
                                        colSpan={5}
                                        className="px-6 py-3 text-center text-xs font-medium text-gray-500"
                                    >
                                        No data found.
                                    </th>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Pagination links={links} />
        </>
    );
}
