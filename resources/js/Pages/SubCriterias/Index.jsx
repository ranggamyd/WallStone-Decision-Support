import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import SubCriteriasTable from "./Partials/SubCriteriasTable";
import SubCriteriaForm from "./Partials/SubCriteriaForm";
import { ChartCandlestick } from "lucide-react";

export default function Index({ auth }) {
    const { criterias } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Daftar Sub Kriteria
                </h2>
            }
        >
            <Head title="Daftar Sub Kriteria" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {criterias.map((criteria) => (
                        <div
                            className="p-4 sm:p-8 bg-white shadow sm:rounded-lg"
                            key={criteria.id}
                        >
                            <section className="max-w-xl min-w-full">
                                <header className="py-3 flex justify-between">
                                    <span className="flex items-center gap-2 text-gray-700">
                                        <ChartCandlestick className="w-5 h-5" />
                                        <h2 className="text-lg font-medium">
                                            {criteria.name} ({criteria.code})
                                        </h2>
                                    </span>
                                    <SubCriteriaForm criteria={criteria} />
                                </header>
                                <SubCriteriasTable
                                    criteria={criteria}
                                    subcriterias={criteria.subcriterias}
                                />
                            </section>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
