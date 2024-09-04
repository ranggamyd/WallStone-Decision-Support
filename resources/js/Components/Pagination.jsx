import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    function getClassName(active) {
        if (active)
            return "px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150";

        return "px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150";
    }
    return (
        <div className="mb-4">
            <div className="flex flex-wrap gap-x-1 justify-center mt-5">
                {links.map((link, key) =>
                    link.url === null ? (
                        <div
                            key={key}
                            className="px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 opacity-25"
                        >
                            {link.label
                                .replace("&laquo;", "«")
                                .replace("&raquo;", "»")}
                        </div>
                    ) : (
                        <Link
                            key={key}
                            className={getClassName(link.active)}
                            href={link.url}
                        >
                            {link.label
                                .replace("&laquo;", "«")
                                .replace("&raquo;", "»")}
                        </Link>
                    )
                )}
            </div>
        </div>
    );
}
