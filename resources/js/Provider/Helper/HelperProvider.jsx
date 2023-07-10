import React, { useContext, useEffect, useState } from "react";
import { AxiosContext } from "../Axios/AxiosProvider";
import { useWindowSize } from "@uidotdev/usehooks";

export const HelperContext = React.createContext();

export default function HelperProvider({ children }) {
    // Main State
    const [logo, setLogo] = useState("");

    // Misc
    const size = useWindowSize();
    const isUserOnMobile = size.width < 640;

    // Contexts
    const axiosInstance = useContext(AxiosContext);

    useEffect(() => {
        getLogo();
    }, []);

    async function getLogo() {
        const response = await axiosInstance.get(
            "/asset/image?path=assets/logo/logo_2.png"
        );
        if (!response?.data) return;

        setLogo(response?.data);
    }

    return (
        <HelperContext.Provider value={{ logo, isUserOnMobile }}>
            {children}
        </HelperContext.Provider>
    );
}
