import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import AxiosProvider from "./Provider/Axios/AxiosProvider";
import ToastProvider from "./Provider/Toast/ToastProvider";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Notes";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ToastProvider>
                <AxiosProvider>
                        <App {...props} />
                </AxiosProvider>
            </ToastProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
