import { useState } from "react";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function DeleteProductForm({ id }) {
    const [confirmingProductDeletion, setConfirmingProductDeletion] = useState(false);
    const { delete: destroy, processing } = useForm();

    const confirmProductDeletion = () => setConfirmingProductDeletion(true);

    const deleteProduct = (e) => {
        e.preventDefault();

        const promise = new Promise((resolve, reject) => {
            destroy(route("products.destroy", id), {
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
            success: "Product deleted",
            error: "Failed to delete product",
        });
    };

    const closeModal = () => setConfirmingProductDeletion(false);

    return (
        <>
            <DangerButton onClick={confirmProductDeletion}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
            </DangerButton>

            <Modal show={confirmingProductDeletion} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete product?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once product is deleted, all of its resources and data will
                        be permanently deleted.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <DangerButton
                            onClick={deleteProduct}
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
