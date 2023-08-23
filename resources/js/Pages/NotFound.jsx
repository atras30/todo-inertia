import { Head, router} from "@inertiajs/react";
import MasterLayout from "@/Layouts/MasterLayout";
import { useContext, useEffect } from "react";
import { ToastContext } from "@/Provider/Toast/ToastProvider";

export default function Unauthorized() {
    const toast = useContext(ToastContext);

    useEffect(() => {
        toast.info("Oops... The item you're looking for is not found.");
        router.get(route('notes.public'));
    }, []);

    return (
        <MasterLayout className={"p-2"}>
            <Head title="Item Not Found" />

            <div>The item you're looking for is not found.</div>
        </MasterLayout>
    );
}
