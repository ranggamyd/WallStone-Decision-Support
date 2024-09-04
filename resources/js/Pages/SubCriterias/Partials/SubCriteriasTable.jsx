import SubCriteriaForm from "./SubCriteriaForm";
import DeleteSubCriteriaForm from "./DeleteSubCriteriaForm";

export default function SubCriteriasTable({ criteria, subcriterias }) {
    return (
        <>
            <div className="border rounded-lg divide-y divide-gray-200 shadow">
                <div className="overflow-hidden">
                    <table className="table-fixed min-w-full divide-y divide-gray-200">
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
                                    Sub Kriteria
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase"
                                >
                                    Nilai
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
                            {criteria.subcriterias.length > 0 ? (
                                criteria.subcriterias.map((subcriteria, i) => (
                                    <tr
                                        key={subcriteria.id}
                                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                                    >
                                        <th className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                            {i + 1}
                                        </th>
                                        <td className="px-6 py-4 text-sm text-gray-800">
                                            {subcriteria.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-800">
                                            {subcriteria.value}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex gap-x-2 justify-center">
                                                <SubCriteriaForm
                                                    criteria={criteria}
                                                    subcriteria={subcriteria}
                                                />
                                                <DeleteSubCriteriaForm
                                                    id={subcriteria.id}
                                                />
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
        </>
    );
}
