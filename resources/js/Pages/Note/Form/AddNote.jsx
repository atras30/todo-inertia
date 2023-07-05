import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { format } from "date-fns";
import { Fragment, useEffect, useState } from "react";
import Select from "react-select";

export default function Dashboard({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        body: "",
        visibility: "public",
        user_id: auth?.user?.id ?? null,
    });

    const visibilityList = [
        { value: "public", label: "Public" },
        { value: "private", label: "Private" },
        { value: "unlisted", label: "Unlisted" },
    ];

    useEffect(() => {
        // Do Something
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("notes.create"));
    };

    function Header() {
        return (
            <div className="flex justify-between">
                <div className="flex items-center justify-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 align-middle">
                        Create New Note
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <GuestLayout header={<Header />}>
            <Head title="Create New Note" />

            <div className="space-y-3">
                <form onSubmit={submit}>
                    <div className="mb-2">
                        <InputLabel htmlFor="title" value="title" />

                        <TextInput
                            id="title"
                            name="title"
                            value={data.title}
                            className="block w-full mt-1"
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

                        <TextInput
                            id="body"
                            name="body"
                            value={data.body}
                            className="block w-full mt-1"
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
                            defaultValue={visibilityList[0]}
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
        </GuestLayout>
    );
}
