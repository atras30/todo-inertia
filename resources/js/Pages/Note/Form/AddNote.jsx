import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { format } from "date-fns";
import { Fragment, useEffect, useState } from "react";

export default function Dashboard({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        body: "",
    });

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
        <AuthenticatedLayout user={auth.user} header={<Header />}>
            <Head title="Create New Note" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
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
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.title}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="body" value="Content" />

                                <TextInput
                                    id="body"
                                    name="body"
                                    value={data.body}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        setData("body", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.body}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton
                                    className="ml-4"
                                    disabled={processing}
                                >
                                    Register
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
