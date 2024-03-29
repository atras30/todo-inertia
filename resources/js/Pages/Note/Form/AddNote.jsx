import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { ToastContext } from "@/Provider/Toast/ToastProvider";
import { Head, Link, useForm } from "@inertiajs/react";
import { useContext, useEffect } from "react";
import Select from "react-select";
import { router } from "@inertiajs/react";
import { AxiosContext } from "@/Provider/Axios/AxiosProvider";
import MasterLayout from "@/Layouts/MasterLayout";

export default function Dashboard({ auth, note }) {
    const toast = useContext(ToastContext);
    const axiosInstance = useContext(AxiosContext);

    const visibilityAnonymousList = [{ value: "public", label: "Public" }];
    const visibilityAuthenticatedUserList = [
        { value: "public", label: "Public" },
        { value: "private", label: "Private" },
        { value: "unlisted", label: "Unlisted" },
    ];
    let visibilityList = visibilityAnonymousList;
    if (auth.user !== null) visibilityList = visibilityAuthenticatedUserList;

    const { data, setData, post, processing, errors, reset } = useForm({
        title: note ? note?.title : "",
        body: note ? note?.body : "",
        visibility: note ? note?.visibility : visibilityList[0].value,
        user_id: auth?.user?.id ?? null,
    });

    useEffect(() => {
        // Do Something
    }, []);

    const submit = async (e) => {
        e.preventDefault();

        //edit ? handle edit
        if(note) {
            const response = await axiosInstance.put(route("notes.edit"), {...data, id: note.id});

            toast.success(response?.data?.message);
            router.get(route("notes.public"));
            return;
        }

        //handle create note
        const response = await axiosInstance.post(route("notes.create"), data);

        toast.success(response?.data?.message);
        router.get(route("notes.public"));
    };

    function Header() {
        return (
            <div className="flex justify-between">
                <div className="flex items-center justify-center">
                    <h2 className="text-xl font-semibold leading-tight text-white align-middle">
                        Create New Note
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <MasterLayout className={"p-2"} user={auth.user} header={<Header />}>
            <Head title="Create New Note" />

            <div className="max-w-6xl mx-auto space-y-3">
                <form onSubmit={submit}>
                    <div className="mb-2">
                        <InputLabel htmlFor="title" value="title" />

                        <TextInput
                            id="title"
                            name="title"
                            value={data.title}
                            className="block w-full mt-1 bg-slate-100"
                            isFocused={true}
                            onChange={(e) => setData("title", e.target.value)}
                        />

                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="body"
                            value="Content"
                            required={true}
                        />

                        <textarea
                            id="body"
                            rows={5}
                            className="w-full mt-1 border-gray-300 rounded-md shadow-sm bg-slate-100 focus:border-indigo-500 focus:ring-indigo-500"
                            name="body"
                            value={data.body}
                            onChange={(e) => setData("body", e.target.value)}
                            required
                        />

                        <InputError message={errors.body} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="visibility"
                            value="Visibility"
                            required={true}
                        />

                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            defaultValue={note ? visibilityList.find(record => record.value == note.visibility) : visibilityList[0]}
                            isSearchable={true}
                            name="visibility"
                            options={visibilityList}
                            onChange={(select) =>
                                setData("visibility", select?.value || "public")
                            }
                        />

                        <InputError
                            message={errors.visibility}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ml-4" disabled={processing}>
                            Create New Note !
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </MasterLayout>
    );
}
