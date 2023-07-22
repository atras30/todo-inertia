import NoteSkeleton from "@/Components/Loading/Skeleton/Note/NoteSkeleton";
import PrimaryButton from "@/Components/PrimaryButton";
import AnonymousAvatar from "@/Components/Icons/AnonymousAvatar";
import MasterLayout from "@/Layouts/MasterLayout";
import axiosInstance, { AxiosContext } from "@/Provider/Axios/AxiosProvider";
import { Head, Link } from "@inertiajs/react";
import { format } from "date-fns";
import { Fragment, useContext, useEffect, useState } from "react";
import _renderIcons from "@/Components/icons/IconRenderer";
import { ToastContext } from "@/Provider/Toast/ToastProvider";
import { HelperContext } from "@/Provider/Helper/HelperProvider";

export default function Note({ auth }) {
    // Main State
    const [notes, setNotes] = useState([]);
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    // Loading State
    const [isFetchingData, setIsFetchingData] = useState(false);
    // Misc
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);

    // Context
    const axiosInstance = useContext(AxiosContext);
    const toast = useContext(ToastContext);
    const { isUserOnMobile } = useContext(HelperContext);

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
                route("notes.my.bin.paginate", {
                    currentPage: keepPage ? currentPage - 1 : currentPage,
                })
            )
            .finally(() => {
                setIsFetchingData(false);
            });
        // Check response
        if (response?.data === null) return;

        // Check next page
        setHasNextPage(response?.data?.hasNextPage || false);

        // set new note list
        if (replaceAll) return setNotes(response?.data?.data);
        setNotes((prev) => [...prev, ...response?.data?.data]);
    }

    async function handleRestore(id) {
        const response = await axiosInstance.put(
            route("notes.my.bin.restore", {
                id: id,
            })
        );
        if (response?.data === null) return;

        toast.success(response?.data?.message);
        fetchNotes(currentPage, true, true);
    }

    function _renderNotes() {
        if (notes?.length === 0 && !isFetchingData)
            return <div className="text-center">No Record Found.</div>;

        return notes?.map((note) => {
            if (isUserOnMobile) {
                return (
                    // Note Container
                    <div
                        key={note?.id}
                        className="p-5 overflow-hidden border rounded-lg shadow purple-card"
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

                                <PrimaryButton
                                    className="w-16 h-8 mt-2 ml-auto cursor-pointer"
                                    style={{
                                        backgroundColor: "#70ff7a",
                                        padding: 0,
                                    }}
                                    onClick={() => handleRestore(note?.id)}
                                >
                                    {_renderIcons("restore")}
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                );
            }

            return (
                <div
                    key={note?.id}
                    className="p-5 overflow-hidden border rounded-lg shadow purple-card"
                >
                    <div className="flex justify-between gap-2">
                        <div style={{ maxWidth: "85%" }}>
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

                            <PrimaryButton
                                className="w-16 h-8 mt-2 ml-auto cursor-pointer"
                                style={{
                                    backgroundColor: "#70ff7a",
                                    padding: 0,
                                }}
                                onClick={() => handleRestore(note?.id)}
                            >
                                {_renderIcons("restore")}
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            );
        });
    }

    function _renderDeleteModal() {
        return (
            <div
                className="fixed top-0 bottom-0 left-0 right-0 bg-slate-200"
                style={{ opacity: ".8" }}
            >
                <div className="fixed bg-red-600 top-50 left-50 w-2xl">
                    testing
                </div>
            </div>
        );
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

    function Header() {
        return (
            <div className="flex justify-between">
                <div className="flex items-center justify-between ">
                    <h2 className="text-xl font-semibold leading-tight text-white align-middle">
                        Recycle Bin
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <MasterLayout
            className={"p-2 max-w-6xl mx-auto"}
            user={auth.user}
            header={<Header />}
        >
            <Head title="Notes" />

            <div className="space-y-2">
                {_renderNotes()}

                {/* Is fetching data ? show loading. else, show button */}
                {isFetchingData ? (
                    <NoteSkeleton count={5} />
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

            {/* Modals */}
            {showDeleteModal && _renderDeleteModal()}
        </MasterLayout>
    );
}
