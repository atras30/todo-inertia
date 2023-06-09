import ButtonWithRippleEffect from "@/Components/Common/Buttons/ButtonWithRippleEffect";
import NavigationBar from "@/Components/Common/NavigationBar/NavigationBar";
import { useWindowSize } from "@uidotdev/usehooks";

export default function MasterLayout({ user, header, children, className }) {
    const size = useWindowSize();
    const isUserOnMobile = size.width < 640;

    return (
        <div id="master-layout" className="relative min-h-screen bg-gray-100">
            <NavigationBar user={user} />

            {header && (
                <header className="bg-white shadow">
                    <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className={`${className} ${isUserOnMobile && "pb-[10rem]"}`}>{children}</main>
        </div>
    );
}
