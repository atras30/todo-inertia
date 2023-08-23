import { Head, router} from "@inertiajs/react";
import MasterLayout from "@/Layouts/MasterLayout";
import { useContext, useEffect } from "react";
import { ToastContext } from "@/Provider/Toast/ToastProvider";

export default function Unauthorized() {
    const toast = useContext(ToastContext);

    useEffect(() => {
        toast.error("Oops... you're not authorized to do this action!");
        router.get(route('notes.public'));
    }, []);

    return (
        <MasterLayout className={"p-2"}>
            <Head title="Unauthorized" />

            <div>Unauthorized</div>
        </MasterLayout>
    );
}
