import NoteSkeleton from "@/Components/Loading/Skeleton/Note/NoteSkeleton";
import PrimaryButton from "@/Components/PrimaryButton";
import { ToastContext } from "@/Provider/Toast/ToastProvider";
import AnonymousAvatar from "@/Components/Icons/AnonymousAvatar";
import { Head, Link } from "@inertiajs/react";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { AxiosContext } from "@/Provider/Axios/AxiosProvider";
import MasterLayout from "@/Layouts/MasterLayout";
import _renderIcons from "@/Components/Icons/IconRenderer";
import { HelperContext } from "@/Provider/Helper/HelperProvider";

export default function Note({ auth }) {
    // Main State
    const [notes, setNotes] = useState([]);
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    // Loading State
    const [isFetchingData, setIsFetchingData] = useState(false);
    // Misc State
    const [hasNextPage, setHasNextPage] = useState(false);

    // Contexts
    const axiosInstance = useContext(AxiosContext);
    const { isUserOnMobile } = useContext(HelperContext);

    useEffect(() => {
        fetchNotes(currentPage);
    }, []);

    async function fetchNotes(currentPage) {
        setIsFetchingData(true);

        const response = await axiosInstance
            .get(
                route("notes.public.paginate", {
                    currentPage: currentPage,
                })
            )
            .catch((error) => {
                return;
            })
            .finally(() => {
                setIsFetchingData(false);
            });

        setHasNextPage(response?.data?.hasNextPage);
        setCurrentPage(currentPage + 1);
        setNotes((prev) => [...prev, ...response?.data?.data]);
    }

    function _renderNotes() {
        return notes?.map((note) => (
            <div
                key={note?.id}
                className="p-5 overflow-hidden bg-white border rounded-lg shadow"
            >
                <div className="flex justify-between gap-2">
                    <div>
                        <p className="mb-1 font-bold underline decoration-solid">
                            {note?.title}
                        </p>

                        <pre className="break-all whitespace-pre-wrap">
                            {note?.body || "-"}
                        </pre>
                    </div>
                    <div className="me-2 text-sm font-medium text-end text-slate-400 min-w-[4rem]">
                        <p className="mb-2 text-xs font-bold underline text-slate-500">
                            {note?.visibility} Note
                        </p>
                        <span className="flex items-start justify-center gap-2 ml-2">
                            <AnonymousAvatar className="w-7 h-7" />

                            {note?.user !== null
                                ? note?.user?.name || "-"
                                : "Anonymous"}
                        </span>

                        <div className="my-2 border-b-2 border-blue-400" />

                        <div>
                            {format(new Date(note?.created_at), "dd MMMM yyyy")}
                        </div>
                        <div>{format(new Date(note?.created_at), "HH:mm")}</div>
                    </div>
                </div>
            </div>
        ));
    }

    function Header() {
        return (
            <div className="flex justify-between">
                <div className="flex items-center justify-between ">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 align-middle">
                        Public Notes
                    </h2>
                </div>

                {!isUserOnMobile && (
                    <Link href={route("notes.form")}>
                        <PrimaryButton className="flex items-center gap-2 text-xl font-semibold leading-tight text-gray-800 align-middle">
                            <span className="w-6 me-1">
                                {_renderIcons("add")}
                            </span>
                            Add New Note
                        </PrimaryButton>
                    </Link>
                )}
            </div>
        );
    }

    return (
        <MasterLayout
            className={"p-2 max-w-6xl mx-auto"}
            user={auth?.user}
            header={<Header />}
        >
            <Head title="Notes" />

            <div className="space-y-2">
                {_renderNotes()}

                {/* Is fetching data ? show loading. else, show button */}
                {isFetchingData ? (
                    <NoteSkeleton count={2} />
                ) : (
                    hasNextPage && (
                        <PrimaryButton
                            className={`w-full`}
                            onClick={() => fetchNotes(currentPage)}
                        >
                            <div className="w-full text-center">Load More</div>
                        </PrimaryButton>
                    )
                )}
            </div>
        </MasterLayout>
    );
}
