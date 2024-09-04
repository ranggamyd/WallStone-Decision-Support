import Modal from "@/Components/Modal";
import Primary2Button from "@/Components/Primary2Button";
import PrimaryButton from "@/Components/PrimaryButton";
import SuccessButton from "@/Components/SuccessButton";
import WarningButton from "@/Components/WarningButton";
import { useForm, usePage } from "@inertiajs/react";
import { AlertTriangle, CircleCheck, CircleCheckBig, CircleFadingPlus, DraftingCompass, FileCheck, FileCheck2, FilePen, FileWarning } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ScoreForm({ alternative }) {
    const { criterias } = usePage().props;
    const [modal, openModal] = useState(false);

    const { data, setData, post, errors, processing } = useForm({
        alternative_id: alternative.id,
        criterias: alternative.scores.reduce((acc, score) => {
            acc[score.criteria_id] = score.value;
            return acc;
        }, {}),
    });

    const triggerModal = () => openModal(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        const createPromise = new Promise((resolve, reject) => {
            post(route("scores.store", { alternative_id: alternative.id }), {
                preserveScroll: true,
                onSuccess: (response) => {
                    closeModal();
                    resolve(response);
                },
                onError: (error) => {
                    if (errors.values) valuesInput.current.focus();

                    reject(error);
                },
            });
        });

        toast.promise(createPromise, {
            loading: "Loading...",
            success: "Alternative scored",
            error: "Failed to score alternative",
        });
    };

    const allCriteriaFilled = Object.keys(data.criterias).length === criterias.length;

    const closeModal = () => openModal(false);

    return (
        <>
            {allCriteriaFilled ? (
                <SuccessButton onClick={triggerModal}>
                    <CircleCheckBig className="w-5 h-5" />
                </SuccessButton>
            ) : (
                <WarningButton onClick={triggerModal}>
                    <CircleFadingPlus className="w-5 h-5" />
                </WarningButton>
            )}

            <Modal show={modal} onClose={closeModal}>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Perbarui Nilai Alternatif
                    </h2>

                    <p
                        className="mt-1 text-sm text-gray-600"
                        style={{ marginTop: "0.25rem" }}
                    >
                        Select a value based on criterias.
                    </p>

                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <tbody>
                                {criterias &&
                                    criterias.map((criteria) => (
                                        <tr key={criteria.id}>
                                            <th
                                                scope="col"
                                                className="px-6 py-2 text-left text-sm font-bold text-gray-800 uppercase"
                                            >
                                                {criteria.name}
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-2 text-center text-sm font-bold text-gray-800 uppercase"
                                            >
                                                :
                                            </th>
                                            <td className="px-6 py-2">
                                                <select
                                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                    value={
                                                        data.criterias[
                                                            criteria.id
                                                        ] || ""
                                                    }
                                                    onChange={(e) => {
                                                        setData("criterias", {
                                                            ...data.criterias,
                                                            [criteria.id]:
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                ),
                                                        });
                                                    }}
                                                >
                                                    <option value="">
                                                        select a value
                                                    </option>
                                                    {criteria &&
                                                        criteria.subcriterias.map(
                                                            (subcriteria) => (
                                                                <option
                                                                    key={
                                                                        subcriteria.id
                                                                    }
                                                                    value={
                                                                        subcriteria.value
                                                                    }
                                                                >
                                                                    {
                                                                        subcriteria.name
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                </select>
                                                {errors[
                                                    `criterias.${criteria.id}`
                                                ] && (
                                                    <div className="text-red-600 text-sm">
                                                        {
                                                            errors[
                                                                `criterias.${criteria.id}`
                                                            ]
                                                        }
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={processing}
                        >
                            {processing ? "Processing..." : "Save"}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
