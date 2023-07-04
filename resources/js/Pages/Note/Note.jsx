import NoteSkeleton from "@/Components/Loading/Skeleton/Note/NoteSkeleton";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axiosInstance from "@/Service/Axios/AxiosInstance";
import { Head, Link } from "@inertiajs/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function Note({ auth }) {
    // Main State
    const [notes, setNotes] = useState([]);
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    // Loading State
    const [isFetchingData, setIsFetchingData] = useState(false);

    useEffect(() => {
        fetchNotes(currentPage);
    }, []);

    async function fetchNotes(currentPage) {
        setIsFetchingData(true);
        setCurrentPage(currentPage + 1);

        const response = await axiosInstance
            .get(
                route("notes.paginate", {
                    currentPage: currentPage,
                })
            )
            .catch((error) => {
                return;
            })
            .finally(() => {
                setIsFetchingData(false);
            });

        setNotes((prev) => [...prev, ...response.data.data]);
    }

    function _renderNotes() {
        return notes?.map((note) => (
            <div
                key={note?.id}
                className="p-5 overflow-hidden bg-white border rounded-lg shadow"
            >
                <div className="flex justify-between">
                    <div>
                        <p className="mb-2 font-bold underline decoration-solid">
                            {note?.title}
                        </p>

                        <div className="break-all">{note?.body || "-"}</div>
                    </div>
                    <div className="mt-auto mb-auto text-sm font-medium text-end text-slate-400 min-w-[4rem]">
                        <div>
                            {format(new Date(note?.created_at), "dd MMMM yyyy")}
                        </div>
                        <div>{format(new Date(note?.created_at), "HH:mm")}</div>
                    </div>
                </div>
            </div>
        ));
    }

    function _renderAddNoteButton() {
        return (
            <Link
                href={route("notes.form")}
                className="z-10 text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <PrimaryButton
                    className={`sm:static sm:opacity-100 sm:end-0 fixed bottom-[1rem] opacity-50 end-[1rem]`}
                >
                    Add New Note
                </PrimaryButton>
            </Link>
        );
    }

    function Header() {
        return (
            <div className="flex justify-between">
                <div className="flex items-center justify-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 align-middle">
                        Your Notes
                    </h2>
                </div>

                {_renderAddNoteButton()}
            </div>
        );
    }

    return (
        <AuthenticatedLayout user={auth.user} header={<Header />}>
            <Head title="Notes" />

            <div className="py-6">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="space-y-3">
                        {_renderNotes()}

                        {/* Is fetching data ? show loading. else, show button */}
                        {isFetchingData ? (
                            <NoteSkeleton count={5} />
                        ) : (
                            <PrimaryButton
                                className={`w-full`}
                                onClick={() => fetchNotes(currentPage)}
                            >
                                <div className="w-full text-center">
                                    Load More
                                </div>
                            </PrimaryButton>
                    )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
