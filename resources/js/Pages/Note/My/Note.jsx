import NoteSkeleton from "@/Components/Loading/Skeleton/Note/NoteSkeleton";
import PrimaryButton from "@/Components/PrimaryButton";
import AnonymousAvatar from "@/Components/Icons/AnonymousAvatar";
import MasterLayout from "@/Layouts/MasterLayout";
import axiosInstance, { AxiosContext } from "@/Provider/Axios/AxiosProvider";
import { Head, Link } from "@inertiajs/react";
import { format } from "date-fns";
import { Fragment, useContext, useEffect, useState } from "react";

export default function Note({ auth }) {
    // Main State
    const [notes, setNotes] = useState([]);
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    // Loading State
    const [isFetchingData, setIsFetchingData] = useState(false);

    // Misc
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Context
    const axiosInstance = useContext(AxiosContext);

    useEffect(() => {
        fetchNotes(currentPage);
    }, []);

    async function fetchNotes(currentPage) {
        setIsFetchingData(true);
        setCurrentPage(currentPage + 1);

        const response = await axiosInstance
            .get(
                route("notes.my.paginate", {
                    currentPage: currentPage,
                })
            )
            .finally(() => {
                setIsFetchingData(false);
            });

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
                        <p className="mb-2 font-bold underline decoration-solid">
                            {note?.title}
                        </p>

                        <div className="break-all">{note?.body || "-"}</div>
                    </div>
                    <div className="me-2 mt-auto mb-auto text-sm font-medium text-end text-slate-400 min-w-[4rem]">
                        <span className="flex items-center justify-center gap-2 ml-2">
                            <AnonymousAvatar className="w-6 h-6" />
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
                            className="w-8 h-8 mt-2 ml-auto cursor-pointer"
                            onClick={() => setShowDeleteModal(true)}
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

    function Header() {
        return (
            <div className="flex justify-between">
                <div className="flex items-center justify-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 align-middle">
                        My Notes
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <MasterLayout className={"p-4 max-w-6xl mx-auto"} user={auth.user} header={<Header />}>
            <Head title="Notes" />

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
                        <div className="w-full text-center">Load More</div>
                    </PrimaryButton>
                )}
            </div>

            {/* Modals */}
            {showDeleteModal && _renderDeleteModal()}
        </MasterLayout>
    );
}
