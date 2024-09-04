import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import Primary2Button from "@/Components/Primary2Button";
import SecondaryButton from "@/Components/SecondaryButton";
import SuccessButton from "@/Components/SuccessButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { CirclePlus, FilePen, PlusCircle } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function SubCriteriaForm({ criteria, subcriteria }) {
    const [modal, openModal] = useState(false);
    const criteriaNameInput = useRef();
    const nameInput = useRef();
    const valueInput = useRef();

    const { data, setData, post, put, errors, reset, processing } = useForm({
        criteria_name: criteria ? criteria.name : "",
        name: subcriteria ? subcriteria.name : "",
        value: subcriteria ? subcriteria.value : 1,
    });

    const mode = subcriteria ? "edit" : "create";
    const title = subcriteria ? "Edit Sub Criteria" : "Create Sub Criteria";
    const submitLabel = subcriteria ? "Update" : "Create";

    const triggerModal = () => openModal(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (mode === "create") {
            const createPromise = new Promise((resolve, reject) => {
                post(
                    route("subcriterias.store", { criteria_id: criteria.id }),
                    {
                        preserveScroll: true,
                        onSuccess: (response) => {
                            reset();
                            closeModal();
                            resolve(response);
                        },
                        onError: (error) => {
                            if (errors.name) nameInput.current.focus();
                            if (errors.value) valueInput.current.focus();

                            reject(error);
                        },
                    }
                );
            });

            toast.promise(createPromise, {
                loading: "Loading...",
                success: "Sub Criteria created",
                error: "Failed to create sub criteria",
            });
        } else if (mode === "edit") {
            const updatePromise = new Promise((resolve, reject) => {
                put(route("subcriterias.update", subcriteria.id), {
                    preserveScroll: true,
                    onSuccess: (response) => {
                        closeModal();
                        resolve(response);
                    },
                    onError: (error) => {
                        if (errors.name) nameInput.current.focus();
                        if (errors.type) typeInput.current.focus();

                        reject(error);
                    },
                });
            });

            toast.promise(updatePromise, {
                loading: "Loading...",
                success: "Sub Criteria updated",
                error: "Failed to update subcriteria",
            });
        }
    };

    const closeModal = () => openModal(false);

    return (
        <>
            {mode === "create" ? (
                <Primary2Button onClick={triggerModal}>
                    <CirclePlus className="w-4 h-4 mr-2" />
                    {submitLabel}
                </Primary2Button>
            ) : (
                <SuccessButton onClick={triggerModal}>
                    <FilePen className="w-4 h-4" />
                    {/* {submitLabel} */}
                </SuccessButton>
            )}

            <Modal show={modal} onClose={closeModal}>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        {title}
                    </h2>

                    <p
                        className="mt-1 text-sm text-gray-600"
                        style={{ marginTop: "0.25rem" }}
                    >
                        {mode === "create" ? "Create" : "Edit"} Sub Criteria's
                        information.
                    </p>

                    <div>
                        <InputLabel htmlFor="criteria_name" value="Kriteria" />

                        <TextInput
                            id="criteria_name"
                            ref={criteriaNameInput}
                            value={data.criteria_name}
                            onChange={(e) =>
                                setData("criteria_name", e.target.value)
                            }
                            type="text"
                            className="mt-1 block w-full read-only:bg-gray-100"
                            autoComplete="criteria_name"
                            disabled
                        />

                        <InputError
                            message={errors.criteria_name}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="name" value="Nama Sub Kriteria" />

                        <TextInput
                            id="name"
                            ref={nameInput}
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            type="text"
                            className="mt-1 block w-full"
                            autoComplete="name"
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="value" value="Nilai" />

                        <TextInput
                            id="value"
                            ref={valueInput}
                            value={data.value}
                            onChange={(e) => setData("value", e.target.value)}
                            type="number"
                            min={1}
                            max={9}
                            className="mt-1 block w-full"
                            autoComplete="value"
                        />
                        <p className="text-xs italic leading-6 text-gray-600">
                            * Isi dengan angka 1 - 9
                        </p>

                        <InputError message={errors.value} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        {mode === "create" ? (
                            <Primary2Button
                                className="ms-3"
                                disabled={processing}
                            >
                                <PlusCircle className="w-4 h-4 mr-2" />
                                {submitLabel}
                            </Primary2Button>
                        ) : (
                            <SuccessButton
                                className="ms-3"
                                disabled={processing}
                            >
                                <FilePen className="w-4 h-4 mr-2" />
                                {submitLabel}
                            </SuccessButton>
                        )}
                    </div>
                </form>
            </Modal>
        </>
    );
}
