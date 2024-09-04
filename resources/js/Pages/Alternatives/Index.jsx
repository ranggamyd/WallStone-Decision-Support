import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import AlternativeForm from "./Partials/AlternativeForm";
import SearchForm from "@/Components/SearchForm";
import AlternativesTable from "./Partials/AlternativesTable";

export default function Index({ auth }) {
    const alternatives = usePage().props.alternatives.data;
    const { links, current_page, per_page } = usePage().props.alternatives;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Daftar Alternatif
                </h2>
            }
        >
            <Head title="Daftar Alternatif" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="flex flex-col">
                            <div className="-m-1.5 overflow-x-auto">
                                <div className="p-1.5 min-w-full inline-block align-middle">
                                    <div className="py-3 flex justify-between">
                                        <AlternativeForm />
                                        <SearchForm routeName={"alternatives"} />
                                    </div>

                                    <AlternativesTable
                                        alternatives={alternatives}
                                        links={links}
                                        current_page={current_page}
                                        per_page={per_page}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
