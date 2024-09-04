import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import { FilePen } from "lucide-react";

export default function ComparisonForm({
  criterias,
  comparisons,
  className = "",
}) {
  const { data, setData, post } = useForm({
    comparisons: comparisons || {},
    weights: {},
  });

  const scaleOptions = [
    { value: 9, label: "9" },
    { value: 8, label: "8" },
    { value: 7, label: "7" },
    { value: 6, label: "6" },
    { value: 5, label: "5" },
    { value: 4, label: "4" },
    { value: 3, label: "3" },
    { value: 2, label: "2" },
    { value: 1, label: "Sama penting" },
    { value: 1 / 2, label: "2" },
    { value: 1 / 3, label: "3" },
    { value: 1 / 4, label: "4" },
    { value: 1 / 5, label: "5" },
    { value: 1 / 6, label: "6" },
    { value: 1 / 7, label: "7" },
    { value: 1 / 8, label: "8" },
    { value: 1 / 9, label: "9" },
  ];

  const handleRadioChange = (criteria1Id, criteria2Id, value) => {
    setData("comparisons", {
      ...data.comparisons,
      [`${criteria1Id}_${criteria2Id}`]: value,
      [`${criteria2Id}_${criteria1Id}`]: 1 / value,
    });
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">
          Form Perbandingan Berpasangan
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Berikan penilaian sesuai skala intensitas kepentingan antar kriteria.
          Hasil dari perbandingan akan dihitung menggunakan metode{" "}
          <b>
            AHP (<i>Analytical Hierarchy Process</i>)
          </b>{" "}
          untuk mendapatkan bobot kriteria yang sesuai.
        </p>
      </header>

      <div className="mt-6 space-y-6">
        <div className="border rounded-lg divide-y divide-gray-200 shadow mt-4">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 h-[52px]">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase"
                  >
                    Kriteria 1
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase"
                  >
                    Perbandingan
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase"
                  >
                    Kriteria 2
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {criterias.map((criteria1, index) =>
                  criterias.slice(index + 1).map((criteria2) => (
                    <tr
                      key={`${criteria1.id}_${criteria2.id}`}
                      className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <th className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {criteria1.name}
                      </th>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                        <div className="flex justify-center items-center space-x-1">
                          {scaleOptions.map((option, i) => (
                            <label key={i} className="flex items-center">
                              <input
                                type="radio"
                                name={`${criteria1.id}_${criteria2.id}`}
                                value={option.value}
                                checked={
                                  parseFloat(
                                    data.comparisons[
                                      `${criteria1.id}_${criteria2.id}`
                                    ]?.toFixed(5)
                                  ) === parseFloat(option.value.toFixed(5))
                                }
                                onChange={() =>
                                  handleRadioChange(
                                    criteria1.id,
                                    criteria2.id,
                                    option.value
                                  )
                                }
                                className="hidden"
                              />
                              <span
                                className={`cursor-pointer px-2 py-1 border rounded-full ${
                                  parseFloat(
                                    data.comparisons[
                                      `${criteria1.id}_${criteria2.id}`
                                    ]?.toFixed(5)
                                  ) === parseFloat(option.value.toFixed(5))
                                    ? "bg-blue-500 text-white"
                                    : "bg-white text-gray-800"
                                }`}
                              >
                                {option.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </td>
                      <th className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {criteria2.name}
                      </th>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
