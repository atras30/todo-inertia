import { Fragment, useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { useWindowSize } from "@uidotdev/usehooks";
import ButtonWithRippleEffect from "../Buttons/ButtonWithRippleEffect";
import PrimaryButton from "@/Components/PrimaryButton";
import _renderIcons from "@/Components/icons/IconRenderer";

export default function NavigationBar({ user }) {
    // Main State
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [
        showAuthenticationDropdownOptions,
        setShowAuthenticationDropdownOptions,
    ] = useState(false);

    // Misc
    const size = useWindowSize();
    const isUserOnMobile = size.width < 640;
    const isUserOnCreateNotePage =
        route().current("notes.public") || route().current("notes.my");

    function _renderAuthenticatedMenus() {
        return (
            <Fragment>
                <ResponsiveNavLink href={route("profile.edit")}>
                    Profile
                </ResponsiveNavLink>
                <ResponsiveNavLink
                    method="post"
                    href={route("logout")}
                    as="button"
                >
                    Log Out
                </ResponsiveNavLink>
            </Fragment>
        );
    }

    function _renderAuthenticatedDropdownButton() {
        return (
            <div className="relative ml-3">
                <Dropdown>
                    <Dropdown.Trigger>
                        <span className="inline-flex rounded-md">
                            <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none"
                            >
                                {user.name}

                                <svg
                                    className="ml-2 -mr-0.5 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </span>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                        <Dropdown.Link href={route("profile.edit")}>
                            Profile
                        </Dropdown.Link>
                        <Dropdown.Link
                            href={route("logout")}
                            method="post"
                            as="button"
                        >
                            Log Out
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        );
    }

    function _renderLoginButtonForMobile() {
        return (
            <ResponsiveNavLink href={route("login")}>Login</ResponsiveNavLink>
        );
    }

    function _renderLoginButton() {
        return (
            <div className="relative ml-3">
                <NavLink href={route("login")}>Login</NavLink>
            </div>
        );
    }

    function _renderAuthenticatedDropdownContent() {
        return (
            <Fragment>
                <Link
                    className="p-2 text-sm border-l-4 text-slate-600 border-l-indigo-500 bg-slate-100"
                    href={route("profile.edit")}
                >
                    Profile
                </Link>
                <Link
                    className="p-2 text-sm border-l-4 text-slate-600 border-l-indigo-500 bg-slate-100"
                    href={route("logout")}
                    as="button"
                    method="POST"
                >
                    Log Out
                </Link>
            </Fragment>
        );
    }

    function _renderGuestDropdownContent() {
        return (
            <Fragment>
                <Link
                    className="p-2 text-sm border-l-4 text-slate-600 border-l-indigo-500 bg-slate-100"
                    href={route("login")}
                >
                    Login
                </Link>
                <Link
                    className="p-2 text-sm border-l-4 text-slate-600 border-l-indigo-500 bg-slate-100"
                    href={route("register")}
                >
                    Register
                </Link>
            </Fragment>
        );
    }

    function _renderAuthenticationDropdownContent() {
        console.log(route("login"));

        return (
            <div
                className="absolute top-0 right-0 translate-y-[-110%] p-2 m-2 bg-white border-black rounded shadow-md border-1"
                style={{ width: "calc(100% - 1rem)" }}
            >
                <div
                    id="authentication-dropdown-menus"
                    className="grid grid-cols-1 gap-1 divide-y"
                >
                  {/* Render Content */}
                    {user
                        ? _renderAuthenticatedDropdownContent()
                        : _renderGuestDropdownContent()}
                </div>
            </div>
        );
    }

    function _renderBottomNavigationBarComponent() {
        return (
            <div className="flex items-center">
                {/* Public Notes */}
                <ButtonWithRippleEffect
                    className={"py-2 grow flex items-center justify-center"}
                >
                    <div className="mx-auto">
                        <div className="w-6 h-6 mx-auto mb-2">
                            {_renderIcons("notes")}
                        </div>
                        <Link
                            href={route("notes.public")}
                            className="text-sm font-bold text-slate-600 "
                        >
                            Public Notes
                        </Link>
                    </div>
                </ButtonWithRippleEffect>

                {/* My Notes */}
                <ButtonWithRippleEffect
                    className={"py-2 grow flex items-center justify-center"}
                >
                    <div className="mx-auto">
                        <div className="w-6 h-6 mx-auto mb-2">
                            {_renderIcons("notes")}
                        </div>
                        <Link
                            href={route("notes.my")}
                            className="text-sm font-bold text-slate-600"
                        >
                            My Notes
                        </Link>
                    </div>
                </ButtonWithRippleEffect>

                {/* Authentication */}
                <ButtonWithRippleEffect
                    className={"flex items-center justify-center py-2 grow"}
                    id={"authentication-menu"}
                    onClick={() =>
                        setShowAuthenticationDropdownOptions((prev) => !prev)
                    }
                >
                    <div className="mx-auto">
                        <div className="w-6 h-6 mx-auto mb-2">
                            {_renderIcons("key")}
                        </div>
                        <div className="text-sm font-bold text-slate-600">
                            Authentication
                        </div>
                    </div>
                </ButtonWithRippleEffect>
            </div>
        );
    }

    function _renderBottomNavigationBar() {
        //   Partial Views
        function _renderAddNoteButton() {
            return (
                <div
                    id="add-new-note-section"
                    className="flex justify-end px-3 mb-2"
                >
                    <Link
                        href={route("notes.form")}
                        className="text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <PrimaryButton className={`opacity-50`}>
                            Add New Note
                        </PrimaryButton>
                    </Link>
                </div>
            );
        }

        // Return Component
        return (
            <section className="fixed bottom-0 left-0 right-0 select-none">
                {isUserOnCreateNotePage && _renderAddNoteButton()}

                <div
                    id="bottom-navigation-bar-section"
                    className="relative shadwo bg-slate-200"
                >
                    {/* Authentication Dropdown Content */}
                    {showAuthenticationDropdownOptions &&
                        _renderAuthenticationDropdownContent()}

                    {/* Bottom Navigation Bar */}
                    {_renderBottomNavigationBarComponent()}
                </div>
            </section>
        );
    }

    return (
        <nav className="bg-white border-b border-gray-100">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex items-center shrink-0">
                            <Link href="/">
                                <ApplicationLogo className="block w-auto text-gray-800 fill-current h-9" />
                            </Link>
                        </div>

                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                            <NavLink
                                href={route("notes.public")}
                                active={route().current("notes.public")}
                            >
                                Notes
                            </NavLink>
                            <NavLink
                                href={route("notes.my")}
                                active={route().current("notes.my")}
                            >
                                My Notes
                            </NavLink>
                        </div>
                    </div>

                    {/* Right side navbar items */}
                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                        {/* Not authenticated */}
                        {!user && _renderLoginButton()}

                        {/* Authenticated */}
                        {user && _renderAuthenticatedDropdownButton()}
                    </div>

                    {/* Expand navbar menu on mobile */}
                    <div className="flex items-center -mr-2 sm:hidden">
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown(
                                    (previousState) => !previousState
                                )
                            }
                            className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
                        >
                            <svg
                                className="w-6 h-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={
                                        !showingNavigationDropdown
                                            ? "inline-flex"
                                            : "hidden"
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={
                                        showingNavigationDropdown
                                            ? "inline-flex"
                                            : "hidden"
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {isUserOnMobile && _renderBottomNavigationBar()}

            {/* Render navigation menus when expanded (user clicks hamburger button) */}
            <div
                className={
                    (showingNavigationDropdown ? "block" : "hidden") +
                    " sm:hidden"
                }
            >
                <div className="pt-2 pb-3 space-y-1">
                    <ResponsiveNavLink
                        href={route("notes.public")}
                        active={route().current("notes.public")}
                    >
                        Notes
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        href={route("notes.my")}
                        active={route().current("notes.my")}
                    >
                        My Notes
                    </ResponsiveNavLink>

                    {user && _renderAuthenticatedMenus()}
                    {!user && _renderLoginButtonForMobile()}
                </div>
            </div>
        </nav>
    );
}
