import NoteSkeleton from "@/Components/Loading/Skeleton/Note/NoteSkeleton";
import PrimaryButton from "@/Components/PrimaryButton";
import AnonymousAvatar from "@/Components/Icons/AnonymousAvatar";
import MasterLayout from "@/Layouts/MasterLayout";
import { AxiosContext } from "@/Provider/Axios/AxiosProvider";
import { Head, Link } from "@inertiajs/react";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
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
                route("notes.my.paginate", {
                    currentPage: keepPage ? currentPage - 1 : currentPage,
                })
            )
            .finally(() => {
                setIsFetchingData(false);
            });

        if (replaceAll) return setNotes(response?.data?.data);
        setNotes((prev) => [...prev, ...response?.data?.data]);
    }

    function _renderNotes() {
        return notes?.map((note) => (
            <div
                key={note?.id}
                className="p-5 overflow-hidden bg-white border rounded-lg shadow"
            >
                <div className="flex justify-between">
                    <div>
                        <div className="flex gap-2 mb-2">
                            <AnonymousAvatar className="w-6 h-6" />
                            <p className="mb-1 font-bold underline decoration-solid">
                                {note?.title}
                            </p>
                        </div>

                        <pre className="text-justify whitespace-pre-wrap pe-3">
                            {note?.body || "-"}
                        </pre>
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

                        <div className="my-2 border-b-2 border-gray-300" />

                        <div>
                            <div>
                                {format(
                                    new Date(note?.created_at),
                                    "dd MMMM yyyy"
                                )}
                            </div>
                            <div>
                                {format(new Date(note?.created_at), "HH:mm")}
                            </div>
                        </div>

                        <div
                            className="w-6 h-6 mt-2 ml-auto cursor-pointer"
                            onClick={() => handleDeleteNote(note?.id)}
                        >
                            <svg
                                className="w-full h-full"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#ff1414"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    {" "}
                                    <path
                                        d="M10 12V17"
                                        stroke="#ff0000"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>{" "}
                                    <path
                                        d="M14 12V17"
                                        stroke="#ff0000"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>{" "}
                                    <path
                                        d="M4 7H20"
                                        stroke="#ff0000"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>{" "}
                                    <path
                                        d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                                        stroke="#ff0000"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>{" "}
                                    <path
                                        d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                        stroke="#ff0000"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>{" "}
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        ));
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
        function _renderAddNewNoteButton() {
            return (
                <Link href={route("notes.form")}>
                    <PrimaryButton className="flex items-center gap-2 text-xl font-semibold leading-tight text-gray-800 align-middle">
                        <span className="w-6">{_renderIcons("add")}</span>
                        Add New Note
                    </PrimaryButton>
                </Link>
            );
        }
        return (
            <div className="flex justify-between">
                <div className="flex items-center justify-between ">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 align-middle">
                        My Notes
                    </h2>
                </div>

                <div className="flex flex-row-reverse gap-2">
                    {!isUserOnMobile && _renderAddNewNoteButton()}
                    <Link href={route("notes.bin")}>
                        <PrimaryButton className="flex items-center gap-2 text-xl font-semibold leading-tight text-gray-800 align-middle">
                            <span>{_renderIcons("recycle-bin")}</span>
                            Recycle Bin
                        </PrimaryButton>
                    </Link>
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
