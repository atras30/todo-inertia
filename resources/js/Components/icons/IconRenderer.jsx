import { Fragment } from "react";

export default function _renderIcons(iconName = "") {
    switch (iconName) {
        case "notes":
            return (
                <svg
                    className="w-full h-full"
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 600 600"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <g
                        transform="translate(0.000000,550) scale(0.100000,-0.100000)"
                        fill="#fff"
                        stroke="none"
                    >
                        <path
                            d="M832 5060 c-176 -46 -307 -168 -364 -339 -22 -65 -22 -74 -29 -921
           -7 -892 -10 -979 -59 -1395 -43 -362 -109 -725 -200 -1103 -51 -212 -58 -279
           -39 -361 38 -166 177 -298 348 -331 35 -6 596 -10 1620 -10 1735 0 1639 -3
           1781 66 104 51 213 161 263 264 72 147 202 732 271 1220 72 507 89 820 90
           1642 1 683 1 687 -20 715 -49 66 -154 66 -194 0 -19 -31 -20 -55 -20 -612 0
           -319 -5 -679 -10 -800 -29 -642 -108 -1199 -257 -1820 -64 -269 -107 -341
           -242 -404 l-56 -26 -1585 -3 c-1107 -2 -1596 0 -1622 8 -77 22 -137 102 -138
           183 0 21 22 131 49 245 130 546 199 998 242 1602 7 85 14 517 18 960 6 801 6
           805 28 845 25 47 84 105 133 131 34 18 101 19 1920 19 l1885 0 40 -22 c47 -25
           105 -84 131 -133 18 -34 19 -109 22 -2095 3 -2338 10 -2128 -82 -2220 -92 -93
           89 -85 -1988 -85 -2021 0 -1867 5 -1908 -63 -25 -41 -25 -73 0 -114 41 -68
           -113 -63 1907 -63 1573 0 1838 2 1898 15 205 43 357 195 400 400 22 105 22
           4105 0 4210 -43 205 -195 357 -400 400 -60 13 -325 15 -1915 14 -1785 0 -1847
           -1 -1918 -19z"
                        />
                        <path
                            d="M1740 2700 c-19 -10 -51 -36 -71 -57 -39 -40 -236 -301 -269 -356
           -36 -59 -19 -141 35 -165 40 -19 99 -15 128 8 15 12 81 95 148 185 71 98 128
           165 138 165 25 0 89 -63 201 -198 161 -195 233 -243 372 -250 80 -4 92 -2 150
           25 40 19 99 62 162 119 142 128 154 136 199 130 20 -3 55 -9 77 -12 24 -4 53
           -1 71 6 57 24 80 116 42 169 -27 37 -103 72 -172 78 -121 11 -207 -30 -363
           -175 -96 -90 -139 -116 -172 -108 -34 8 -102 72 -183 171 -184 223 -270 285
           -392 285 -45 -1 -77 -7 -101 -20z"
                        />
                        <path
                            d="M3383 2260 c-34 -21 -63 -66 -63 -100 0 -54 65 -120 118 -120 57 0
           122 64 122 120 0 56 -65 120 -122 120 -13 0 -37 -9 -55 -20z"
                        />
                    </g>
                </svg>
            );
        case "notes-2":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-notes"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="1.4"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z"></path>
                    <path d="M9 7l6 0"></path>
                    <path d="M9 11l6 0"></path>
                    <path d="M9 15l4 0"></path>
                </svg>
            );
        case "key":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-key"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="1.4"
                    stroke="#fff"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1 -4.069 0l-.301 -.301l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.877 2.877 0 0 1 0 -4.069l2.643 -2.643a2.877 2.877 0 0 1 4.069 0z"></path>
                    <path d="M15 9h.01"></path>
                </svg>
            );
        case "recycle-bin":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-recycle"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 17l-2 2l2 2"></path>
                    <path d="M10 19h9a2 2 0 0 0 1.75 -2.75l-.55 -1"></path>
                    <path d="M8.536 11l-.732 -2.732l-2.732 .732"></path>
                    <path d="M7.804 8.268l-4.5 7.794a2 2 0 0 0 1.506 2.89l1.141 .024"></path>
                    <path d="M15.464 11l2.732 .732l.732 -2.732"></path>
                    <path d="M18.196 11.732l-4.5 -7.794a2 2 0 0 0 -3.256 -.14l-.591 .976"></path>
                </svg>
            );
        case "add":
            return (
                <svg
                    className="w-full h-full"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                            d="M10 14H12M12 14H14M12 14V16M12 14V12"
                            stroke="#ffffff"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        ></path>{" "}
                        <path
                            d="M22 11.7979C22 9.16554 22 7.84935 21.2305 6.99383C21.1598 6.91514 21.0849 6.84024 21.0062 6.76946C20.1506 6 18.8345 6 16.2021 6H15.8284C14.6747 6 14.0979 6 13.5604 5.84678C13.2651 5.7626 12.9804 5.64471 12.7121 5.49543C12.2237 5.22367 11.8158 4.81578 11 4L10.4497 3.44975C10.1763 3.17633 10.0396 3.03961 9.89594 2.92051C9.27652 2.40704 8.51665 2.09229 7.71557 2.01738C7.52976 2 7.33642 2 6.94975 2C6.06722 2 5.62595 2 5.25839 2.06935C3.64031 2.37464 2.37464 3.64031 2.06935 5.25839C2 5.62595 2 6.06722 2 6.94975M21.9913 16C21.9554 18.4796 21.7715 19.8853 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V11"
                            stroke="#ffffff"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        ></path>{" "}
                    </g>
                </svg>
            );

        case "restore":
            return (
                <svg
                    className="w-full h-full"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#d60000"
                >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                            d="M5.88468 17C7.32466 19.1128 9.75033 20.5 12.5 20.5C16.9183 20.5 20.5 16.9183 20.5 12.5C20.5 8.08172 16.9183 4.5 12.5 4.5C8.08172 4.5 4.5 8.08172 4.5 12.5V13.5M12.5 8V12.5L15.5 15.5"
                            stroke="#099f13"
                            strokeWidth="1.75"
                        ></path>{" "}
                        <path
                            d="M7 11L4.5 13.5L2 11"
                            stroke="#099f13"
                            strokeWidth="1.75"
                        ></path>{" "}
                    </g>
                </svg>
            );
        case "user-icon":
            return (
                <svg
                    className="w-full h-full icon icon-tabler icon-tabler-user-circle"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="1.3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#fff"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                    <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                    <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
                </svg>
            );
        case "delete":
            return (
                <svg
                    className="w-full h-full"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ff1414"
                >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                            d="M10 12V17"
                            stroke="#ff0000"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>{" "}
                        <path
                            d="M14 12V17"
                            stroke="#ff0000"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>{" "}
                        <path
                            d="M4 7H20"
                            stroke="#ff0000"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>{" "}
                        <path
                            d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                            stroke="#ff0000"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>{" "}
                        <path
                            d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                            stroke="#ff0000"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>{" "}
                    </g>
                </svg>
            );
        case "visibility":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full icon icon-tabler icon-tabler-eye"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                    <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path>
                </svg>
            );
        case "note":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full icon icon-tabler icon-tabler-note"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M13 20l7 -7"></path>
                    <path d="M13 20v-6a1 1 0 0 1 1 -1h6v-7a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7"></path>
                </svg>
            );
        default:
            return <div className="leading-none rounded bg-slate-500">-</div>;
    }
}
