import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import CriteriaForm from "./Partials/CriteriaForm";
import SearchForm from "@/Components/SearchForm";
import CriteriasTable from "./Partials/CriteriasTable";
import { CirclePlus, FilePen } from "lucide-react";
import Primary2Button from "@/Components/Primary2Button";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Index({ auth }) {
    const criterias = usePage().props.criterias.data;
    const { links, current_page, per_page } = usePage().props.criterias;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Daftar Kriteria
                </h2>
            }
        >
            <Head title="Daftar Kriteria" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="flex flex-col">
                            <div className="-m-1.5 overflow-x-auto">
                                <div className="p-1.5 min-w-full inline-block align-middle">
                                    <div className="py-3 flex justify-between">
                                        <div className="flex items-center gap-x-3">
                                            <CriteriaForm />
                                            <Link
                                                href={route(
                                                    "criterias.comparison"
                                                )}
                                            >
                                                <SecondaryButton>
                                                    <FilePen className="w-4 h-4 mr-2" />
                                                    Perbarui Bobot Kriteria
                                                </SecondaryButton>
                                            </Link>
                                        </div>
                                        <SearchForm routeName={"criterias"} />
                                    </div>

                                    <CriteriasTable
                                        criterias={criterias}
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
