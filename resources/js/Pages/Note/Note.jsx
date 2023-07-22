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
    console.log(auth);
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
    const toast = useContext(ToastContext);

    useEffect(() => {
        fetchNotes(currentPage);
    }, []);

    async function fetchNotes(
        currentPage,
        keepPage = false,
        replaceAll = false
    ) {
        setIsFetchingData(true);

        if (!keepPage) setCurrentPage(currentPage + 1);

        const response = await axiosInstance
            .get(
                route("notes.public.paginate", {
                    currentPage: keepPage ? currentPage - 1 : currentPage,
                })
            )
            .finally(() => {
                setIsFetchingData(false);
            });

        if (replaceAll) return setNotes(response?.data?.data);
        setNotes((prev) => [...prev, ...response?.data?.data]);
    }

    async function handleDeleteNote(id) {
        const response = await axiosInstance.delete(
            route("notes.delete", {
                id: id,
            })
        );

        toast.success(response?.data?.message);
        fetchNotes(currentPage, true, true);
    }

    function _renderDeleteButton(note, user) {
        let canDelete = false;

        if (user === null) return;
        if (
            parseInt(user?.id) === parseInt(note?.user?.id) ||
            parseInt(user?.is_super_admin) === 1
        )
            canDelete = true;

        if (canDelete)
            return (
                <div
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => handleDeleteNote(note?.id)}
                >
                    {_renderIcons("delete")}
                </div>
            );
    }

    function _renderNotes() {
        return notes?.map((note) => {
            if (isUserOnMobile) {
                return (
                    // Note Container
                    <div
                        key={note?.id}
                        className="p-5 overflow-hidden bg-white border rounded-lg shadow"
                    >
                        {/* Note Header */}
                        <div className="flex items-center gap-2 mb-1">
                            <div className="h-9 icon-container">
                                <AnonymousAvatar className={" h-full"} />
                            </div>

                            <div className="grow">
                                <p className="font-bold leading-4 decoration-solid">
                                    {note?.title || "-"}
                                </p>

                                <div className="flex justify-end gap-1">
                                    <div className="w-4">
                                        {_renderIcons("visibility")}
                                    </div>
                                    <p className="text-xs font-bold underline text-slate-500">
                                        {note?.visibility} Note
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 ms-auto">
                            {note?.user?.name || "Anonymous"}
                        </p>

                        {/* Note Body */}
                        <div className="text-justify break-words whitespace-pre-wrap note-body pe-3">
                            {note?.body || "-"}
                        </div>

                        {/* Note Footer */}

                        {/* Horizontal Line */}
                        <div className="my-2 border-b-2 border-blue-400" />

                        {/* Time & Delete Button */}
                        <div className="me-2 text-sm font-medium text-end text-slate-400 min-w-[4rem]">
                            <div className="flex items-center justify-end gap-2">
                                {/* Time Posted */}
                                <div>
                                    {`${format(
                                        new Date(note?.created_at),
                                        "dd MMMM yyyy"
                                    )} ${format(
                                        new Date(note?.created_at),
                                        "HH:mm"
                                    )}`}
                                </div>

                                {_renderDeleteButton(note, auth?.user)}
                            </div>
                        </div>
                    </div>
                );
            }

            return (
                <div
                    key={note?.id}
                    className="p-5 overflow-hidden bg-white border rounded-lg shadow"
                >
                    <div className="flex justify-between gap-2">
                        <div style={{maxWidth: "85%"}}>
                            <div className="flex gap-2 mb-2">
                                <AnonymousAvatar className="w-9 h-9" />
                                <p className="mb-1 font-bold underline decoration-solid">
                                    {note?.title}
                                </p>
                            </div>

                            <div className="text-justify break-words whitespace-pre-wrap pe-3">
                                {note?.body || "-"}
                            </div>
                        </div>
                        <div className="me-2 text-sm font-medium text-end text-slate-400 min-w-[4rem]">
                            <p className="mb-2 text-xs font-bold underline text-slate-500">
                                {note?.visibility} Note
                            </p>
                            <span className="flex items-start justify-center gap-2 ml-2">
                                {note?.user !== null
                                    ? note?.user?.name || "-"
                                    : "Anonymous"}
                            </span>
                            <div className="my-2 border-b-2 border-blue-400" />
                            <div>
                                {format(
                                    new Date(note?.created_at),
                                    "dd MMMM yyyy"
                                )}
                            </div>
                            <div>
                                {format(new Date(note?.created_at), "HH:mm")}
                            </div>

                            <div className="flex justify-end mt-1">
                                {_renderDeleteButton(note, auth?.user)}
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
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
