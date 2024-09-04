import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import React, { useMemo } from "react";
// import MathJax from "react-mathjax";

export default function Calculation({ auth }) {
  const { scores, criterias, alternatives } = usePage().props;

  // Step 1: Membuat matriks keputusan
  const decisionMatrix = useMemo(() => {
    const matrix = {};

    alternatives.forEach((alternative) => {
      matrix[alternative.id] = {};

      criterias.forEach((criteria) => {
        const score = scores.find(
          (s) =>
            s.alternative_id === alternative.id && s.criteria_id === criteria.id
        );
        matrix[alternative.id][criteria.id] = score ? score.value : 0;
      });
    });

    return matrix;
  }, [alternatives, criterias, scores]);

  // Step 2: Normalisasi matriks keputusan
  const normalizedMatrix = useMemo(() => {
    const normalized = {};

    criterias.forEach((criteria) => {
      const sumSquares = Object.values(decisionMatrix).reduce(
        (sum, row) => sum + Math.pow(row[criteria.id], 2),
        0
      );
      const divisor = Math.sqrt(sumSquares);

      alternatives.forEach((alternative) => {
        normalized[alternative.id] = normalized[alternative.id] || {};
        normalized[alternative.id][criteria.id] =
          decisionMatrix[alternative.id][criteria.id] / divisor;
      });
    });

    return normalized;
  }, [decisionMatrix, alternatives, criterias]);

  // Step 3: Pembobotan matriks normalisasi
  const weightedMatrix = useMemo(() => {
    const weighted = {};

    alternatives.forEach((alternative) => {
      weighted[alternative.id] = {};

      criterias.forEach((criteria) => {
        weighted[alternative.id][criteria.id] =
          normalizedMatrix[alternative.id][criteria.id] * criteria.weight;
      });
    });

    return weighted;
  }, [normalizedMatrix, alternatives, criterias]);

  // Step 4: Menentukan solusi ideal positif dan negatif
  const idealPositive = useMemo(() => {
    const ideal = {};

    criterias.forEach((criteria) => {
      ideal[criteria.id] =
        criteria.type === "Benefit"
          ? Math.max(
              ...Object.values(weightedMatrix).map((row) => row[criteria.id])
            )
          : Math.min(
              ...Object.values(weightedMatrix).map((row) => row[criteria.id])
            );
    });

    return ideal;
  }, [weightedMatrix, criterias]);

  const idealNegative = useMemo(() => {
    const ideal = {};

    criterias.forEach((criteria) => {
      ideal[criteria.id] =
        criteria.type === "Benefit"
          ? Math.min(
              ...Object.values(weightedMatrix).map((row) => row[criteria.id])
            )
          : Math.max(
              ...Object.values(weightedMatrix).map((row) => row[criteria.id])
            );
    });

    return ideal;
  }, [weightedMatrix, criterias]);

  // Step 5: Menghitung jarak dari solusi ideal
  const distances = useMemo(() => {
    const dist = {};

    alternatives.forEach((alternative) => {
      let dPositive = 0;
      let dNegative = 0;

      criterias.forEach((criteria) => {
        dPositive += Math.pow(
          weightedMatrix[alternative.id][criteria.id] -
            idealPositive[criteria.id],
          2
        );
        dNegative += Math.pow(
          weightedMatrix[alternative.id][criteria.id] -
            idealNegative[criteria.id],
          2
        );
      });

      dist[alternative.id] = {
        dPositive: Math.sqrt(dPositive),
        dNegative: Math.sqrt(dNegative),
      };
    });

    return dist;
  }, [alternatives, criterias, weightedMatrix, idealPositive, idealNegative]);

  // Step 6: Menghitung nilai preferensi
  const preferences = useMemo(() => {
    const prefs = {};

    alternatives.forEach((alternative) => {
      const { dPositive, dNegative } = distances[alternative.id];
      prefs[alternative.id] = dNegative / (dPositive + dNegative);
    });

    return prefs;
  }, [distances, alternatives]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Perhitungan TOPSIS
        </h2>
      }
    >
      <Head title="Perhitungan TOPSIS" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  {/* Step 1: Matriks Keputusan */}
                  <h2 className="text-lg font-semibold mb-4">
                    1. Matriks Keputusan
                  </h2>
                  <table className="min-w-full border mb-8">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border">Alternatif</th>
                        {criterias.map((criteria) => (
                          <th key={criteria.id} className="px-4 py-2 border">
                            {criteria.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {alternatives.map((alternative) => (
                        <tr key={alternative.id}>
                          <td className="px-4 py-2 border">
                            {alternative.name}
                          </td>
                          {criterias.map((criteria) => (
                            <td key={criteria.id} className="px-4 py-2 border">
                              {decisionMatrix[alternative.id][
                                criteria.id
                              ].toLocaleString("id-ID", {
                                maximumFractionDigits: 5,
                              })}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Step 2: Matriks Normalisasi */}
                  <h2 className="text-lg font-semibold mb-4">
                    2. Matriks Normalisasi
                  </h2>
                  <table className="min-w-full border mb-8">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border">Alternatif</th>
                        {criterias.map((criteria) => (
                          <th key={criteria.id} className="px-4 py-2 border">
                            {criteria.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {alternatives.map((alternative) => (
                        <tr key={alternative.id}>
                          <td className="px-4 py-2 border">
                            {alternative.name}
                          </td>
                          {criterias.map((criteria) => (
                            <td key={criteria.id} className="px-4 py-2 border">
                              {normalizedMatrix[alternative.id][
                                criteria.id
                              ].toLocaleString("id-ID", {
                                maximumFractionDigits: 5,
                              })}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Step 3: Matriks Pembobotan */}
                  <h2 className="text-lg font-semibold mb-4">
                    3. Matriks Pembobotan
                  </h2>
                  <table className="min-w-full border mb-8">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border">Alternatif</th>
                        {criterias.map((criteria) => (
                          <th key={criteria.id} className="px-4 py-2 border">
                            {criteria.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {alternatives.map((alternative) => (
                        <tr key={alternative.id}>
                          <td className="px-4 py-2 border">
                            {alternative.name}
                          </td>
                          {criterias.map((criteria) => (
                            <td key={criteria.id} className="px-4 py-2 border">
                              {weightedMatrix[alternative.id][
                                criteria.id
                              ].toLocaleString("id-ID", {
                                maximumFractionDigits: 5,
                              })}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Step 4: Solusi Ideal */}
                  <h2 className="text-lg font-semibold mb-4">
                    4. Solusi Ideal
                  </h2>
                  <h3 className="text-md font-semibold mb-2">
                    Solusi Ideal Positif
                  </h3>
                  <table className="min-w-full border mb-4">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border">Kriteria</th>
                        <th className="px-4 py-2 border">Nilai</th>
                      </tr>
                    </thead>
                    <tbody>
                      {criterias.map((criteria) => (
                        <tr key={criteria.id}>
                          <td className="px-4 py-2 border">{criteria.name}</td>
                          <td className="px-4 py-2 border">
                            {idealPositive[criteria.id].toLocaleString(
                              "id-ID",
                              { maximumFractionDigits: 5 }
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <h3 className="text-md font-semibold mb-2">
                    Solusi Ideal Negatif
                  </h3>
                  <table className="min-w-full border mb-8">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border">Kriteria</th>
                        <th className="px-4 py-2 border">Nilai</th>
                      </tr>
                    </thead>
                    <tbody>
                      {criterias.map((criteria) => (
                        <tr key={criteria.id}>
                          <td className="px-4 py-2 border">{criteria.name}</td>
                          <td className="px-4 py-2 border">
                            {idealNegative[criteria.id].toLocaleString(
                              "id-ID",
                              { maximumFractionDigits: 5 }
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Step 5: Jarak dari Solusi Ideal */}
                  <h2 className="text-lg font-semibold mb-4">
                    5. Jarak dari Solusi Ideal
                  </h2>
                  <table className="min-w-full border mb-8">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border">Alternatif</th>
                        <th className="px-4 py-2 border">
                          Jarak ke Solusi Ideal Positif
                        </th>
                        <th className="px-4 py-2 border">
                          Jarak ke Solusi Ideal Negatif
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {alternatives.map((alternative) => (
                        <tr key={alternative.id}>
                          <td className="px-4 py-2 border">
                            {alternative.name}
                          </td>
                          <td className="px-4 py-2 border">
                            {distances[alternative.id].dPositive.toLocaleString(
                              "id-ID",
                              { maximumFractionDigits: 5 }
                            )}
                          </td>
                          <td className="px-4 py-2 border">
                            {distances[alternative.id].dNegative.toLocaleString(
                              "id-ID",
                              { maximumFractionDigits: 5 }
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Step 6: Nilai Preferensi */}
                  <h2 className="text-lg font-semibold mb-4">
                    6. Nilai Preferensi
                  </h2>
                  <table className="min-w-full border">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border">Alternatif</th>
                        <th className="px-4 py-2 border">Nilai Preferensi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alternatives.map((alternative) => (
                        <tr key={alternative.id}>
                          <td className="px-4 py-2 border">
                            {alternative.name}
                          </td>
                          <td className="px-4 py-2 border">
                            {preferences[alternative.id].toLocaleString(
                              "id-ID",
                              { maximumFractionDigits: 5 }
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Rumus-Rumus TOPSIS */}
                  <h2 className="text-lg font-semibold mb-4">
                    Rumus-Rumus TOPSIS
                  </h2>
                  {/* <div className="mb-4">
                    <h3 className="font-semibold">Matriks Normalisasi</h3>
                    <MathJax.Provider>
                      <MathJax.Node
                        formula={
                          "Normalized(a_{ij}) = \\frac{a_{ij}}{\\sqrt{\\sum_{k=1}^{m} a_{kj}^2}}"
                        }
                      />
                    </MathJax.Provider>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold">Matriks Pembobotan</h3>
                    <MathJax.Provider>
                      <MathJax.Node
                        formula={
                          "Weighted(a_{ij}) = Normalized(a_{ij}) \\times w_j"
                        }
                      />
                    </MathJax.Provider>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold">
                      Solusi Ideal Positif dan Negatif
                    </h3>
                    <MathJax.Provider>
                      <MathJax.Node
                        formula={
                          "S^+_j = \\max(Weighted(a_{ij})) \\quad \\text{untuk kriteria Benefit}"
                        }
                      />
                      <MathJax.Node
                        formula={
                          "S^+_j = \\min(Weighted(a_{ij})) \\quad \\text{untuk kriteria Cost}"
                        }
                      />
                      <MathJax.Node
                        formula={
                          "S^-_j = \\min(Weighted(a_{ij})) \\quad \\text{untuk kriteria Benefit}"
                        }
                      />
                      <MathJax.Node
                        formula={
                          "S^-_j = \\max(Weighted(a_{ij})) \\quad \\text{untuk kriteria Cost}"
                        }
                      />
                    </MathJax.Provider>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold">Jarak dari Solusi Ideal</h3>
                    <MathJax.Provider>
                      <MathJax.Node
                        formula={
                          "d^+_i = \\sqrt{\\sum_{j=1}^{n} (Weighted(a_{ij}) - S^+_j)^2}"
                        }
                      />
                      <MathJax.Node
                        formula={
                          "d^-_i = \\sqrt{\\sum_{j=1}^{n} (Weighted(a_{ij}) - S^-_j)^2}"
                        }
                      />
                    </MathJax.Provider>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold">Nilai Preferensi</h3>
                    <MathJax.Provider>
                      <MathJax.Node
                        formula={"C_i = \\frac{d^-_i}{d^+_i + d^-_i}"}
                      />
                    </MathJax.Provider>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
