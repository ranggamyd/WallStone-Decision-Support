import { useForm, usePage } from "@inertiajs/react";
import { Search } from "lucide-react";

export default function SearchForm({ routeName }) {
    const { data, setData, get } = useForm({
        keywords: usePage().props.keywords || "",
    });

    const submit = (e) => {
        e.preventDefault();

        get(route(routeName, { keywords: data.keywords }));
    };

    return (
        <form onSubmit={submit}>
            <div className="relative max-w-xs">
                <label className="sr-only">Search</label>
                <input
                    type="text"
                    value={data.keywords}
                    onChange={(e) => setData("keywords", e.target.value)}
                    className="py-2 px-3 ps-9 block w-full border-gray-200 shadow rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Search for items"
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                    <Search className="size-4 text-gray-400" />
                </div>
            </div>
        </form>
    );
}
