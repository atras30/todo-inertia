import NavigationBar from "@/Components/Common/NavigationBar/NavigationBar";

export default function MasterLayout({ user, header, children }) {
    console.log(user);

    return (
        <div className="relative min-h-screen bg-gray-100">
            <NavigationBar user={user}/>

            {header && (
                <header className="bg-white shadow">
                    <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
