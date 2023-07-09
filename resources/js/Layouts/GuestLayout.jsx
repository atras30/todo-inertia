import ApplicationLogo from "@/Components/ApplicationLogo";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import NavLink from "@/Components/NavLink";
import Dropdown from "@/Components/Dropdown";
import { useState } from "react";
import NavigationBar from "@/Components/Common/NavigationBar/NavigationBar";

export default function GuestLayout({ auth, header, children }) {
    console.log(auth);

    return (
        <div className="relative min-h-screen bg-gray-100">
            <NavigationBar />

            {/* Page Header */}
            {header && (
                <header className="bg-white shadow">
                    <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Render Content */}
            <main>
                <div className="py-6">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
