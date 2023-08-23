import NoteSkeleton from "@/Components/Loading/Skeleton/Note/NoteSkeleton";
import PrimaryButton from "@/Components/PrimaryButton";
import AnonymousAvatar from "@/Components/Icons/AnonymousAvatar";
import MasterLayout from "@/Layouts/MasterLayout";
import { AxiosContext } from "@/Provider/Axios/AxiosProvider";
import { Head, Link } from "@inertiajs/react";
import { format } from "date-fns";
import { useContext, useEffect, useRef, useState } from "react";
import _renderIcons from "@/Components/icons/IconRenderer";
import { ToastContext } from "@/Provider/Toast/ToastProvider";
import { HelperContext } from "@/Provider/Helper/HelperProvider";
import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";

export default function Note({ auth }) {
    // Main State
    const [notes, setNotes] = useState([]);
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    // Loading State
    const [isFetchingData, setIsFetchingData] = useState(false);
    // Misc
    const [search, setSearch] = useState("");
    const [hasNextPage, setHasNextPage] = useState(false);
    const tagRef = useRef(null);

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
        replaceAll = false,
        search = ""
    ) {
        setIsFetchingData(true);

        if (!keepPage) setCurrentPage(currentPage + 1);

        const activeTags = getActiveTags();
        const response = await axiosInstance
            .get(
                route("notes.my.paginate", {
                    currentPage: keepPage ? currentPage - 1 : currentPage,
                    search: search,
                    visibilities: activeTags,
                })
            )
            .finally(() => {
                setIsFetchingData(false);
            });

        // Check next page
        setHasNextPage(response?.data?.hasNextPage || false);

        if (replaceAll) {
            setNotes(response?.data?.data);
            setCurrentPage(2);
            return;
        }

        return setNotes((prev) => [...prev, ...response?.data?.data]);
    }

    function _renderDeleteButton(note, user) {
        let canDelete = false;

        if (user === null) return;
        if (user?.id === note?.user?.id || user?.is_super_admin === 1)
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

    function redirectToEditNote(note) {
        if(!note) return;

        router.get(`/notes/form/${note?.id}`);
    }

    function _renderEditButton(note, user) {
        let canEdit = false;

        if (user === null) return;
        if (user?.id === note?.user?.id || user?.is_super_admin === 1)
            canEdit = true;

        if (canEdit)
            return (
                <div>
                    <button onClick={() => redirectToEditNote(note)} className="items-center px-4 py-1 mt-2 text-xs font-bold text-gray-700 uppercase transition-all rounded-md shadow-md cursor-pointer select-none bg-amber-300 active:bg-amber-400 leading-sm">
                        Edit
                    </button>
                </div>
            );
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
                        className="p-5 overflow-hidden border rounded-lg shadow purple-card test"
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
                            <div className="flex items-center justify-between gap-2">
                                {/* Edit Button */}
                                {_renderEditButton(note, auth?.user)}

                                <div className="flex justify-end gap-2 flex-item">
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

                                    {/* Delete Button */}
                                    {_renderDeleteButton(note, auth?.user)}
                                </div>
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
                        <div
                            className="flex flex-col justify-between"
                            style={{ maxWidth: "85%" }}
                        >
                            <div className="flex-item">
                                <div className="flex gap-2 mb-1">
                                    <AnonymousAvatar className="w-9 h-9" />
                                    <p className="font-bold underline decoration-solid">
                                        {note?.title}
                                    </p>
                                </div>

                                <div className="text-justify break-words whitespace-pre-wrap pe-3">
                                    {note?.body || "-"}
                                </div>
                            </div>

                            {/* Edit Button */}
                            {_renderEditButton(note, auth?.user)}
                        </div>
                        <div className="me-2 text-sm font-medium text-end text-slate-400 min-w-[4rem]">
                            <p className="text-xs font-bold underline text-slate-500">
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
                    <h2 className="text-xl font-semibold leading-tight text-white align-middle">
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

    function handleSearch(e) {
        e?.preventDefault();
        fetchNotes(1, false, true, search);
    }

    function handleTagClick(event) {
        const element = event.target;
        element.classList.toggle("tag-active");

        fetchNotes(1, false, true, search);
    }

    function getActiveTags() {
        const tagContainer = tagRef.current;
        const currentActiveTag = tagContainer.querySelectorAll(".tag-active");
        const activeTags = [...currentActiveTag].map((record) =>
            record.textContent.toLowerCase()
        );
        return activeTags;
    }

    return (
        <MasterLayout
            className={"p-2 max-w-6xl mx-auto"}
            user={auth.user}
            header={<Header />}
        >
            <Head title="Notes" />

            {/* Search Form */}
            <form
                className="flex justify-between gap-2 mb-2"
                onSubmit={handleSearch}
            >
                <TextInput
                    id="search"
                    name="search"
                    value={search}
                    className="block w-full bg-slate-100"
                    placeholder="Search Something..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <PrimaryButton
                    onClick={handleSearch}
                    className="purple-card focus:bg-purple-300 active:bg-purple-300 hover:bg-purple-300"
                >
                    <span className="text-black">Search</span>
                </PrimaryButton>
            </form>

            <div className="flex items-center gap-2 tag-container" ref={tagRef}>
                <div
                    onClick={handleTagClick}
                    className="inline-flex items-center px-3 py-1 mb-2 text-xs font-bold text-gray-700 uppercase bg-white rounded-md shadow-md cursor-pointer select-none leading-sm"
                >
                    Public
                </div>
                <div
                    onClick={handleTagClick}
                    className="inline-flex items-center px-3 py-1 mb-2 text-xs font-bold text-gray-700 uppercase bg-white rounded-md shadow-md cursor-pointer select-none leading-sm"
                >
                    Private
                </div>
                <div
                    onClick={handleTagClick}
                    className="inline-flex items-center px-3 py-1 mb-2 text-xs font-bold text-gray-700 uppercase bg-white rounded-md shadow-md cursor-pointer select-none leading-sm"
                >
                    Unlisted
                </div>
            </div>

            <div className="space-y-2">
                {_renderNotes()}

                {/* Is fetching data ? show loading. else, show button */}
                {isFetchingData ? (
                    <NoteSkeleton count={5} />
                ) : (
                    hasNextPage && (
                        <PrimaryButton
                            className={`w-full`}
                            onClick={() =>
                                fetchNotes(currentPage, false, false, search)
                            }
                        >
                            <div className="w-full text-center">Load More</div>
                        </PrimaryButton>
                    )
                )}
            </div>
        </MasterLayout>
    );
}
