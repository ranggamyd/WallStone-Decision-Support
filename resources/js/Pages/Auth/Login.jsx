import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import toast from "react-hot-toast";
import { LogIn } from "lucide-react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        credentials: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        const promise = new Promise((resolve, reject) => {
            post(route("login"), {
                onSuccess: (response) => resolve(response),
                onError: (error) => reject(error),
                onFinish: () => reset("password"),
            });
        });

        toast.promise(promise, {
            loading: "Loading...",
            success: "Login success",
            error: "Login failed",
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="login" value="Username / E-Mail" />

                    <TextInput
                        id="credentials"
                        type="text"
                        name="credentials"
                        value={data.credentials}
                        className="mt-1 block w-full"
                        autoComplete="credentials"
                        isFocused={true}
                        onChange={(e) => setData("credentials", e.target.value)}
                    />

                    <InputError message={errors.credentials} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex justify-between mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />

                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot password?
                        </Link>
                    )}
                </div>

                <div className="flex items-center justify-end mt-5">
                    <Link
                        href={route("register")}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        haven't an account yet?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Login
                        <LogIn className="w-4 h-4 ms-2" />
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
