export default function Toast({
    message,
    backgroundColor,
    textColor,
    type,
    TOAST,
}) {
    const masterStyle = {
        backgroundColor: {
            backgroundColor: backgroundColor ?? "#FFF",
        },
        color: {
            color: textColor ?? "#000",
        },
    };

    return (
        <div
            id="toast-simple"
            className={`shadow-md border borer-2 border-slate-200 flex items-center w-full max-w-xs p-4 space-x-2 text-gray-500 bg-white divide-gray-200 rounded-lg dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800`}
            style={masterStyle.backgroundColor}
            role="alert"
        >
            {type === TOAST.TYPE.SUCCESS && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.6rem"
                    height="1.6rem"
                    viewBox="0 0 1024 1024"
                >
                    <path
                        fill="#070"
                        d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
                    />
                </svg>
            )}

            {type === TOAST.TYPE.ERROR && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.6rem"
                    height="1.6rem"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.5-5.009c0-.867.659-1.491 1.491-1.491.85 0 1.509.624 1.509 1.491 0 .867-.659 1.509-1.509 1.509-.832 0-1.491-.642-1.491-1.509zM11.172 6a.5.5 0 0 0-.499.522l.306 7a.5.5 0 0 0 .5.478h1.043a.5.5 0 0 0 .5-.478l.305-7a.5.5 0 0 0-.5-.522h-1.655z"
                        fill="#770404"
                    />
                </svg>
            )}

            {type === TOAST.TYPE.INFO && (
                <svg
                    width="1.8rem"
                    height="1.8rem"
                    viewBox="0 0 24.00 24.00"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ccc62e"
                    stroke-width="0.00024000000000000003"
                >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.696-3.534c.63 0 1.332-.288 2.196-1.458l.911-1.22a.334.334 0 0 0-.074-.472.38.38 0 0 0-.505.06l-1.475 1.679a.241.241 0 0 1-.279.061.211.211 0 0 1-.12-.244l1.858-7.446a.499.499 0 0 0-.575-.613l-3.35.613a.35.35 0 0 0-.276.258l-.086.334a.25.25 0 0 0 .243.312h1.73l-1.476 5.922c-.054.234-.144.63-.144.918 0 .666.396 1.296 1.422 1.296zm1.83-10.536c.702 0 1.242-.414 1.386-1.044.036-.144.054-.306.054-.414 0-.504-.396-.972-1.134-.972-.702 0-1.242.414-1.386 1.044a1.868 1.868 0 0 0-.054.414c0 .504.396.972 1.134.972z"
                            fill="#a2c200"
                        ></path>
                    </g>
                </svg>
            )}

            <div
                className="pl-0 text-sm font-semibold"
                style={masterStyle.color}
            >
                {message}
            </div>
        </div>
    );
}
