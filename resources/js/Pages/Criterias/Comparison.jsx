import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CircleCheck, CircleX, Save, SaveOff } from "lucide-react";

const calculateCR = (matrix, weights, n) => {
  const colSums = Array(n).fill(0);
  matrix.forEach((row) => {
    row.forEach((value, j) => {
      colSums[j] += value;
    });
  });

  const weightedSums = colSums.map((colSum, i) => colSum * weights[i]);

  const lambdaMax =
    weightedSums.reduce((sum, value) => sum + value, 0) /
    weights.reduce((sum, weight) => sum + weight, 0);

  const CI = (lambdaMax - n) / (n - 1);
  const RI = [0, 0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49];
  const CR = CI / (RI[n - 1] || 1);

  return { CR, maxEigenvalue: lambdaMax, CI };
};

export default function Index({ auth }) {
  const { criterias, comparisons } = usePage().props;
  const { data, setData, post } = useForm({
    comparisons: comparisons || {},
    weights: {},
  });

  const [matrix, setMatrix] = useState([]);
  const [normalizedMatrix, setNormalizedMatrix] = useState([]);
  const [weights, setWeights] = useState([]);
  const [crData, setCrData] = useState({ CR: 0, maxEigenvalue: 0, CI: 0 });
  const matrixSize = criterias.length;

  useEffect(() => {
    const size = criterias.length;
    const newMatrix = Array.from({ length: size }, () => Array(size).fill(1));

    criterias.forEach((criteria1, i) => {
      criterias.forEach((criteria2, j) => {
        if (i !== j) {
          newMatrix[i][j] =
            data.comparisons[`${criteria1.id}_${criteria2.id}`] || 1;
        }
      });
    });

    const colSum = Array(size).fill(0);
    newMatrix.forEach((row) => row.forEach((val, i) => (colSum[i] += val)));
    const normMatrix = newMatrix.map((row) =>
      row.map((val, i) => val / colSum[i])
    );

    const normWeights = normMatrix.map(
      (row) => row.reduce((sum, val) => sum + val, 0) / size
    );
    const { CR, maxEigenvalue, CI } = calculateCR(newMatrix, normWeights, size);

    setMatrix(newMatrix);
    setNormalizedMatrix(normMatrix);
    setWeights(normWeights);
    setCrData({ CR, maxEigenvalue, CI });

    setData("weights", normWeights);
  }, [data.comparisons]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const createPromise = new Promise((resolve, reject) => {
      post(route("criterias.saveComparison"), {
        preserveScroll: true,
        onSuccess: (response) => resolve(response),
        onError: (error) => reject(error),
      });
    });
    toast.promise(createPromise, {
      loading: "Loading...",
      success: "Comparison saved",
      error: "Failed to save comparison",
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Perbarui Bobot Kriteria
        </h2>
      }
    >
      <Head title="Perbarui Bobot Kriteria" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Comparison */}
            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
              <section className="w-full">
                <header>
                  <h2 className="text-lg font-medium text-gray-900">
                    Form Perbandingan Berpasangan
                  </h2>

                  <p className="mt-1 text-sm text-gray-600">
                    Berikan penilaian sesuai skala intensitas kepentingan antar
                    kriteria. Hasil dari perbandingan akan dihitung menggunakan
                    metode{" "}
                    <b>
                      AHP (<i>Analytical Hierarchy Process</i>)
                    </b>{" "}
                    untuk mendapatkan bobot kriteria yang sesuai.
                  </p>
                </header>
              </section>

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
                          Intensitas Kepentingan
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
                            <th
                              scope="col"
                              className="lg:w-[200px] bg-gray-50 border-r px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase"
                            >
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
                                        ) ===
                                        parseFloat(option.value.toFixed(5))
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
                                        ) ===
                                        parseFloat(option.value.toFixed(5))
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
                            <th
                              scope="col"
                              className="lg:w-[200px] bg-gray-50 border-l px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase"
                            >
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

            {/* Comparison Matrix */}
            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
              <section className="w-full">
                <header>
                  <h2 className="text-lg font-medium text-gray-900">
                    Matriks Perbandingan
                  </h2>
                </header>
              </section>

              <div className="border rounded-lg divide-y divide-gray-200 shadow mt-4">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 h-[52px]">
                      <tr>
                        <th
                          scope="col"
                          className="lg:w-[200px] px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase"
                        >
                          Kriteria
                        </th>
                        {criterias.map((criteria) => (
                          <th
                            key={criteria.id}
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase"
                          >
                            {criteria.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {matrix.map((row, i) => (
                        <tr
                          key={i}
                          className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        >
                          <th
                            scope="col"
                            className="bg-gray-50 border-r px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase"
                          >
                            {criterias[i].name}
                          </th>
                          {row.map((value, j) => (
                            <td
                              key={j}
                              className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800"
                            >
                              {value.toLocaleString("id-ID", {
                                maximumFractionDigits: 5,
                              })}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50 h-[52px]">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase"
                        >
                          JUMLAH
                        </th>
                        {matrix[0]?.map((_, colIndex) => (
                          <th
                            key={colIndex}
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-bold uppercase"
                          >
                            {matrix
                              .map((row) => row[colIndex])
                              .reduce((sum, val) => sum + val, 0)
                              .toLocaleString("id-ID", {
                                maximumFractionDigits: 5,
                              })}
                          </th>
                        ))}
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            {/* Normalized Matrix */}
            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
              <section className="w-full">
                <header>
                  <h2 className="text-lg font-medium text-gray-900">
                    Matriks Normalisasi
                  </h2>
                </header>
              </section>

              <div className="border rounded-lg divide-y divide-gray-200 shadow mt-4">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 h-[52px]">
                      <tr>
                        <th
                          scope="col"
                          className="lg:w-[200px] px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase"
                        >
                          Kriteria
                        </th>
                        {criterias.map((criteria) => (
                          <th
                            key={criteria.id}
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase"
                          >
                            {criteria.name}
                          </th>
                        ))}
                        <th
                          scope="col"
                          className="lg:w-[100px] px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase"
                        >
                          JUMLAH
                        </th>
                        <th
                          scope="col"
                          className="lg:w-[100px] px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase"
                        >
                          BOBOT
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {normalizedMatrix.map((row, i) => (
                        <tr
                          key={i}
                          className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        >
                          <th
                            scope="col"
                            className="bg-gray-50 border-r px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase"
                          >
                            {criterias[i].name}
                          </th>
                          {row.map((value, j) => (
                            <td
                              key={j}
                              className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800"
                            >
                              {value.toLocaleString("id-ID", {
                                maximumFractionDigits: 5,
                              })}
                            </td>
                          ))}
                          <th
                            scope="col"
                            className="bg-gray-50 border-x px-6 py-3 text-center text-xs font-bold uppercase"
                          >
                            {row
                              .reduce((sum, val) => sum + val, 0)
                              .toLocaleString("id-ID", {
                                maximumFractionDigits: 5,
                              })}
                          </th>
                          <th
                            scope="col"
                            className="bg-gray-50 px-6 py-3 text-center text-xs font-bold uppercase"
                          >
                            {weights[i].toLocaleString("id-ID", {
                              maximumFractionDigits: 5,
                            })}
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Consistency Ratio */}
            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
              <section className="w-full">
                <header>
                  <h2 className="text-lg font-medium text-gray-900">
                    Rasio Konsistensi (CR)
                  </h2>
                </header>
              </section>

              <div className="grid lg:grid-cols-4">
                <div>
                  <p className="mt-4">
                    CI = (λmax - n) / (n - 1) <br />
                    CI = (
                    {crData.maxEigenvalue.toLocaleString("id-ID", {
                      maximumFractionDigits: 5,
                    })}{" "}
                    - {matrixSize}) / ({matrixSize} - 1) <br />
                    CI ={" "}
                    {crData.CI.toLocaleString("id-ID", {
                      maximumFractionDigits: 5,
                    })}
                  </p>
                </div>

                <div>
                  <p className="mt-3">
                    CR = CI / RI <br />
                    CR ={" "}
                    {crData.CI.toLocaleString("id-ID", {
                      maximumFractionDigits: 5,
                    })}{" "}
                    /{" "}
                    {crData.CR.toLocaleString("id-ID", {
                      maximumFractionDigits: 5,
                    })}
                  </p>
                  <p>
                    CR ={" "}
                    <span
                      className={
                        crData.CR < 0.1 ? "text-green-800" : "text-red-800"
                      }
                    >
                      {crData.CR.toLocaleString("id-ID", {
                        maximumFractionDigits: 5,
                      })}{" "}
                      {crData.CR < 0.1 ? (
                        <span className="ms-1 bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded border border-green-400">
                          <CircleCheck className="w-2.5 h-2.5 me-1.5" />
                          CR Konsisten
                        </span>
                      ) : (
                        <span className="ms-1 bg-red-100 text-red-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded border border-red-400">
                          <CircleX className="w-2.5 h-2.5 me-1.5" />
                          CR Tidak Konsisten
                        </span>
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div class="fixed bottom-6 right-6">
              <button
                type="submit"
                class={`inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                  crData.CR >= 0.1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={crData.CR >= 0.1}
              >
                <Save className="w-4 h-4 me-2" />
                Simpan Perbandingan
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
