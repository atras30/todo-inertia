import { Fragment, useContext, useEffect, useState } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";
import { useWindowSize } from "@uidotdev/usehooks";
import ButtonWithRippleEffect from "../Buttons/ButtonWithRippleEffect";
import PrimaryButton from "@/Components/PrimaryButton";
import _renderIcons from "@/Components/icons/IconRenderer";
import { HelperContext } from "@/Provider/Helper/HelperProvider";

export default function NavigationBar({ user, navBackgroundColor, bottomNavigationColor }) {
    // Main State
    const [
        showAuthenticationDropdownOptions,
        setShowAuthenticationDropdownOptions,
    ] = useState(false);

    // Misc
    const size = useWindowSize();
    const isUserOnMobile = size.width < 640;
    const isUserOnCreateNotePage =
        route().current("notes.public") || route().current("notes.my");

    const { logo } = useContext(HelperContext);

    function _renderAuthenticatedDropdownButton() {
        return (
            <div className="relative ml-3">
                <Dropdown>
                    <Dropdown.Trigger>
                        <span className="inline-flex rounded-md">
                            <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-black transition duration-150 ease-in-out border border-transparent rounded-md purple-card hover:text-slate-600 focus:outline-none"
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

    function _renderLoginButton() {
        return (
            <div className="relative ml-3">
                <NavLink href={route("login")} className="text-white hover:text-gray-300">
                    Login
                </NavLink>
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
                    className="p-2 text-sm text-left border-l-4 text-slate-600 border-l-indigo-500 bg-slate-100"
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
        return (
            <div className="border border-1 shadow-lg border-black absolute top-0 right-0 translate-y-[-120%] p-2 m-2 bg-white rounded min-w-[12rem]">
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
                    className={"flex items-center justify-center grow"}
                >
                    <Link
                        href={route("notes.public")}
                        className="w-full text-sm font-bold grow"
                    >
                        <div className="w-6 h-6 mx-auto mb-1">
                            {_renderIcons("notes")}
                        </div>
                        <p>Public Notes</p>
                    </Link>
                </ButtonWithRippleEffect>

                {/* My Notes */}
                <ButtonWithRippleEffect
                    className={"flex items-center justify-center grow"}
                >
                    <Link
                        href={route("notes.my")}
                        className="w-full text-sm font-bold grow"
                    >
                        <div className="w-6 h-6 mx-auto mb-1">
                            {_renderIcons("notes-2")}
                        </div>
                        <p>My Notes</p>
                    </Link>
                </ButtonWithRippleEffect>

                {/* Authentication */}
                {user ? (
                    <ButtonWithRippleEffect
                        className={"flex items-center justify-center grow"}
                        onClick={() =>
                            setShowAuthenticationDropdownOptions(
                                (prev) => !prev
                            )
                        }
                    >
                        <div className="w-6 h-6 mx-auto mb-1">
                            {_renderIcons("user-icon")}
                        </div>
                        <p>{user.name}</p>
                    </ButtonWithRippleEffect>
                ) : (
                    <ButtonWithRippleEffect
                        className={"flex items-center justify-center grow text-slate-600"}
                        onClick={() =>
                            setShowAuthenticationDropdownOptions(
                                (prev) => !prev
                            )
                        }
                    >
                        <div className="w-6 h-6 mx-auto mb-1">
                            {_renderIcons("key")}
                        </div>
                        <p className="text-white">Authentication</p>
                    </ButtonWithRippleEffect>
                )}
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
            <section className="fixed bottom-0 left-0 right-0 z-10 select-none">
                {isUserOnCreateNotePage && _renderAddNoteButton()}

                <div
                    id="bottom-navigation-bar-section"
                    className={`relative text-white shadow ${bottomNavigationColor ?? "purple-500"}`}
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
        <nav className={`border-b border-gray-100 ${navBackgroundColor ?? "purple-800"}`}>
            <div className="pe-6">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex items-center shrink-0">
                            <Link href="/" className="h-full">
                                <img
                                    className="object-contain w-full h-full"
                                    src={logo}
                                    alt="Logo"
                                ></img>
                                {/* <ApplicationLogo className="block w-auto text-gray-800 fill-current h-9" /> */}
                            </Link>
                        </div>

                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                            <NavLink
                                href={route("notes.public")}
                                active={route().current("notes.public")}
                                className="text-white focus:text-gray-200 hover:text-gray-300"
                                tabIndex={3}
                            >
                                Notes
                            </NavLink>
                            <NavLink
                                href={route("notes.my")}
                                active={route().current("notes.my")}
                                className="text-white focus:text-gray-200 hover:text-gray-300"
                                tabIndex={4}
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
                </div>
            </div>

            {isUserOnMobile && _renderBottomNavigationBar()}
        </nav>
    );
}
