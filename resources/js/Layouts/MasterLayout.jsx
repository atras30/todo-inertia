import ButtonWithRippleEffect from "@/Components/Common/Buttons/ButtonWithRippleEffect";
import NavigationBar from "@/Components/Common/NavigationBar/NavigationBar";
import { useWindowSize } from "@uidotdev/usehooks";

export default function MasterLayout({
    user,
    header,
    headerBackgroundColor,
    navBackgroundColor,
    bottomNavigationColor,
    children,
    className,
    backgroundClassName = "purple-100",
}) {
    const size = useWindowSize();
    const isUserOnMobile = size.width < 640;

    return (
        <div
            id="master-layout"
            className={`relative min-h-screen bg-gray-100 ${backgroundClassName}`}
        >
            <NavigationBar
                user={user}
                navBackgroundColor={navBackgroundColor}
                bottomNavigationColor={bottomNavigationColor}
            />

            {header && (
                <header
                    className={`shadow ${
                        headerBackgroundColor ?? "purple-500"
                    }`}
                >
                    <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className={`${className} ${isUserOnMobile && "pb-[10rem]"}`}>
                {children}
            </main>
        </div>
    );
}
