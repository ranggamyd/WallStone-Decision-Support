import ApplicationLogo from "@/Components/ApplicationLogo";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Scale, Scroll, Sparkles } from "lucide-react";

export default function Dashboard({ auth, laravelVersion, phpVersion }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* <div className="p-6 text-gray-900">Selamat datang, <strong>{auth.user.name}</strong>!</div> */}

                        <div>
                            <div className="relative flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                                <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                                    <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                                        <div className="flex lg:justify-center lg:col-start-2">
                                            <ApplicationLogo className="h-12 lg:h-20 w-auto fill-current text-gray-800" />
                                        </div>
                                    </header>

                                    <main>
                                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                                            <a
                                                id="docs-card"
                                                className="flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-2 lg:p-10 lg:pb-10"
                                            >
                                                <div className="relative flex items-center gap-6 lg:items-center">
                                                    <div
                                                        id="docs-card-content"
                                                        className="flex items-start gap-6 lg:flex-col"
                                                    >
                                                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16">
                                                            <Scroll className="size-5 sm:size-6 text-[#FF2D20]" />
                                                        </div>

                                                        <div className="pt-3 sm:pt-5 lg:pt-0">
                                                            <h2 className="text-xl font-semibold text-black">
                                                                Tentang Aplikasi
                                                            </h2>

                                                            <p className="mt-4 text-sm/relaxed text-justify">
                                                                Selamat datang
                                                                di Sistem
                                                                Pendukung
                                                                Keputusan (SPK)
                                                                Pemilihan Batu
                                                                Alam untuk
                                                                Dinding Rumah.
                                                                Sistem ini
                                                                dirancang untuk
                                                                membantu Anda
                                                                memilih batu
                                                                alam yang paling
                                                                cocok untuk
                                                                dinding rumah
                                                                dengan
                                                                memanfaatkan dua
                                                                metode evaluasi
                                                                yang canggih
                                                                yaitu
                                                                <strong>
                                                                    <i>
                                                                        {" "}
                                                                        Analytic
                                                                        Hierarchy
                                                                        Process{" "}
                                                                    </i>{" "}
                                                                    (AHP)
                                                                </strong>{" "}
                                                                dan
                                                                <strong>
                                                                    <i>
                                                                        {" "}
                                                                        Technique
                                                                        for
                                                                        Order
                                                                        Preference
                                                                        by
                                                                        Similarity
                                                                        to Ideal
                                                                        Solution{" "}
                                                                    </i>{" "}
                                                                    (TOPSIS).
                                                                </strong>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>

                                            <a className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10">
                                                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16">
                                                    <Scale className="size-5 sm:size-6 text-[#FF2D20]" />
                                                </div>

                                                <div className="pt-3 sm:pt-5">
                                                    <h2 className="text-xl font-semibold text-black">
                                                        <i>
                                                            Analytic Hierarchy
                                                            Process
                                                        </i>{" "}
                                                        (AHP)
                                                    </h2>

                                                    <p className="mt-4 text-sm/relaxed">
                                                        Metode pengambilan
                                                        keputusan yang digunakan
                                                        untuk menentukan bobot
                                                        kriteria dengan
                                                        membandingkan kriteria
                                                        secara berpasangan.
                                                    </p>
                                                </div>
                                            </a>

                                            <a className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10">
                                                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16">
                                                    <Sparkles className="size-5 sm:size-6 text-[#FF2D20]" />
                                                </div>

                                                <div className="pt-3 sm:pt-5">
                                                    <h2 className="text-xl font-semibold text-black">
                                                        <i>
                                                            Technique for Order
                                                            Preference by
                                                            Similarity to Ideal
                                                            Solution
                                                        </i>{" "}
                                                        (TOPSIS)
                                                    </h2>

                                                    <p className="mt-4 text-sm/relaxed">
                                                        Metode pengambilan
                                                        keputusan yang
                                                        mengevaluasi alternatif
                                                        berdasarkan kriteria
                                                        yang ada. Alternatif
                                                        dengan skor tertinggi
                                                        dianggap sebagai pilihan
                                                        terbaik.
                                                    </p>
                                                </div>
                                            </a>
                                        </div>
                                    </main>

                                    <footer className="py-16 text-center text-sm text-black">
                                        Copyright &copy;{" "}
                                        {new Date().getFullYear()} SPK BATU ALAM
                                    </footer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
