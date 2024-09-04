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

export default function UserForm({ user }) {
    const [modal, openModal] = useState(false);
    const nameInput = useRef();
    const usernameInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();
    const passwordConfirmationInput = useRef();

    const { data, setData, post, put, errors, reset, processing } = useForm({
        name: user ? user.name : "",
        username: user ? user.username : "",
        email: user ? user.email : "",
        password: "",
        password_confirmation: "",
    });

    const mode = user ? "edit" : "create";
    const title = user ? "Edit User" : "Create User";
    const submitLabel = user ? "Update" : "Create";

    const triggerModal = () => openModal(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (mode === "create") {
            const createPromise = new Promise((resolve, reject) => {
                post(route("users.store"), {
                    preserveScroll: true,
                    onSuccess: (response) => {
                        reset();
                        closeModal();
                        resolve(response);
                    },
                    onError: (error) => {
                        if (errors.name) nameInput.current.focus();
                        if (errors.username) usernameInput.current.focus();
                        if (errors.email) emailInput.current.focus();
                        if (errors.password) passwordInput.current.focus();
    
                        reset("password", "password_confirmation");
                        reject(error);
                    },
                });
            });

            toast.promise(createPromise, {
                loading: "Loading...",
                success: "User created",
                error: "Failed to create user",
            });
        } else if (mode === "edit") {
            const updatePromise = new Promise((resolve, reject) => {
                put(route("users.update", user.id), {
                    preserveScroll: true,
                    onSuccess: (response) => {
                        reset("password", "password_confirmation");
                        closeModal();
                        resolve(response);
                    },
                    onError: (error) => {
                        if (errors.name) nameInput.current.focus();
                        if (errors.username) usernameInput.current.focus();
                        if (errors.email) emailInput.current.focus();
                        if (errors.password) passwordInput.current.focus();

                        reset("password", "password_confirmation");
                        reject(error);
                    },
                });
            });

            toast.promise(updatePromise, {
                loading: "Loading...",
                success: "User updated",
                error: "Failed to update user",
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
                        {mode === "create" ? "Create" : "Edit"} User's
                        information, email with a secure password.
                    </p>

                    <div>
                        <InputLabel htmlFor="name" value="Nama Lengkap" />

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

                    <div className="grid lg:grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="username" value="Username" />

                            <TextInput
                                id="username"
                                ref={usernameInput}
                                value={data.username}
                                onChange={(e) =>
                                    setData("username", e.target.value)
                                }
                                type="text"
                                className="mt-1 block w-full"
                                autoComplete="username"
                            />

                            <InputError
                                message={errors.username}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="E-Mail" />

                            <TextInput
                                id="email"
                                ref={emailInput}
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                type="email"
                                className="mt-1 block w-full"
                                autoComplete="email"
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="password"
                            />
                            {mode === "edit" && (
                                <p className="text-xs italic leading-6 text-gray-600">
                                    * Kosongkan password jika tidak ada
                                    perubahan
                                </p>
                            )}

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Password Confirmation"
                            />

                            <TextInput
                                id="password_confirmation"
                                ref={passwordConfirmationInput}
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="password_confirmation"
                            />

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>
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
