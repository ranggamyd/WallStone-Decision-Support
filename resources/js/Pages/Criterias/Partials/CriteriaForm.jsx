import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import Primary2Button from "@/Components/Primary2Button";
import RadioInput from "@/Components/RadioInput";
import SecondaryButton from "@/Components/SecondaryButton";
import SuccessButton from "@/Components/SuccessButton";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import { CirclePlus, FilePen, PlusCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function CriteriaForm({ criteria }) {
    const { nextCode } = usePage().props;

    const [modal, openModal] = useState(false);
    const codeInput = useRef();
    const nameInput = useRef();
    const typeInput = useRef();

    const { data, setData, post, put, errors, reset, processing } = useForm({
        code: criteria ? criteria.code : nextCode,
        name: criteria ? criteria.name : "",
        type: criteria ? criteria.type : "Benefit",
    });

    const mode = criteria ? "edit" : "create";
    const title = criteria ? "Edit Criteria" : "Create Criteria";
    const submitLabel = criteria ? "Update" : "Create";

    useEffect(() => {
        if (mode === "create") setData("code", nextCode);
    }, [nextCode, mode]);

    const triggerModal = () => openModal(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (mode === "create") {
            const createPromise = new Promise((resolve, reject) => {
                post(route("criterias.store"), {
                    preserveScroll: true,
                    onSuccess: (response) => {
                        reset();
                        closeModal();
                        resolve(response);
                    },
                    onError: (error) => {
                        if (errors.code) codeInput.current.focus();
                        if (errors.name) nameInput.current.focus();
                        if (errors.type) typeInput.current.focus();

                        reject(error);
                    },
                });
            });

            toast.promise(createPromise, {
                loading: "Loading...",
                success: "Criteria created",
                error: "Failed to create criteria",
            });
        } else if (mode === "edit") {
            const updatePromise = new Promise((resolve, reject) => {
                put(route("criterias.update", criteria.id), {
                    preserveScroll: true,
                    onSuccess: (response) => {
                        closeModal();
                        resolve(response);
                    },
                    onError: (error) => {
                        if (errors.code) codeInput.current.focus();
                        if (errors.name) nameInput.current.focus();
                        if (errors.type) typeInput.current.focus();

                        reject(error);
                    },
                });
            });

            toast.promise(updatePromise, {
                loading: "Loading...",
                success: "Criteria updated",
                error: "Failed to update criteria",
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
                    <FilePen className="w-4 h-4 mr-2" />
                    {submitLabel}
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
                        {mode === "create" ? "Create" : "Edit"} Criteria's
                        information.
                    </p>

                    <div>
                        <InputLabel htmlFor="code" value="Kode Kriteria" />

                        <TextInput
                            id="code"
                            ref={codeInput}
                            value={data.code}
                            onChange={(e) => setData("code", e.target.value)}
                            type="text"
                            className="mt-1 block w-full read-only:bg-gray-100"
                            autoComplete="code"
                            disabled
                        />

                        <InputError message={errors.code} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="name" value="Nama Kriteria" />

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
                        <InputLabel
                            htmlFor="type"
                            value="Tipe (Benefit/Cost)"
                        />

                        <RadioInput
                            id="type"
                            ref={typeInput}
                            value={data.type}
                            onChange={(e) => setData("type", e.target.value)}
                            type="radio"
                            options={[
                                {
                                    label: "Benefit",
                                    value: "Benefit",
                                    description:
                                        "Semakin tinggi nilainya, semakin baik.",
                                },
                                {
                                    label: "Cost",
                                    value: "Cost",
                                    description:
                                        "Semakin rendah nilainya, semakin baik.",
                                },
                            ]}
                            className="mt-1 block w-full"
                        />

                        <InputError message={errors.type} className="mt-2" />
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
