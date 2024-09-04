import { useState } from "react";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function DeleteAlternativeForm({ id }) {
    const [confirmingAlternativeDeletion, setConfirmingAlternativeDeletion] = useState(false);
    const { delete: destroy, processing } = useForm();

    const confirmAlternativeDeletion = () => setConfirmingAlternativeDeletion(true);

    const deleteAlternative = (e) => {
        e.preventDefault();

        const promise = new Promise((resolve, reject) => {
            destroy(route("alternatives.destroy", id), {
                preserveScroll: true,
                onSuccess: (response) => {
                    closeModal();
                    resolve(response);
                },
                onError: (error) => reject(error),
            });
        });

        toast.promise(promise, {
            loading: "Loading...",
            success: "Alternative deleted",
            error: "Failed to delete alternative",
        });
    };

    const closeModal = () => setConfirmingAlternativeDeletion(false);

    return (
        <>
            <DangerButton onClick={confirmAlternativeDeletion}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
            </DangerButton>

            <Modal show={confirmingAlternativeDeletion} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete alternative?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once alternative is deleted, all of its resources and data will
                        be permanently deleted.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <DangerButton
                            onClick={deleteAlternative}
                            className="ms-3"
                            disabled={processing}
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </>
    );
}
