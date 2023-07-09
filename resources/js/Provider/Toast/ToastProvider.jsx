import React, { Fragment, useEffect, useState } from "react";
import Toast from "./Toast";
import { v4 as uuidv4 } from "uuid";

export const ToastContext = React.createContext();

//constants
const TOAST = {
    TYPE: {
        SUCCESS: "success",
        ERROR: "error",
        INFO: "info",
    },
};

export default function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const defaultTimerInSecond = 3;

    useEffect(() => {
        toasts?.forEach((record) => {
            if (record.hasActiveTimeout === false) {
                setTimeout(() => {
                    console.log("toast vanish: ", record.id);
                    setToasts((prevToasts) =>
                        prevToasts.filter((toast) => toast.id !== record.id)
                    );
                }, record.timeStamp - Date.now());
            }

            record.hasActiveTimeout = true;
        });
    }, [toasts]);

    function success(message, time = defaultTimerInSecond) {
        setToasts((prev) => [
            ...prev,
            {
                id: uuidv4(),
                timeStamp: new Date().setSeconds(
                    new Date().getSeconds() + time
                ),
                message: message,
                hasActiveTimeout: false,
                backgroundColor: "#E6F4F1",
                textColor: "#069473",
                type: TOAST.TYPE.SUCCESS,
            },
        ]);
    }

    function error(message, time = defaultTimerInSecond) {
        setToasts((prev) => [
            ...prev,
            {
                id: uuidv4(),
                timeStamp: new Date().setSeconds(
                    new Date().getSeconds() + time
                ),
                message: message,
                hasActiveTimeout: false,
                backgroundColor: "#FF9999",
                textColor: "#770404",
                type: TOAST.TYPE.ERROR,
            },
        ]);
    }

    function info(message, time = defaultTimerInSecond) {
        setToasts((prev) => [
            ...prev,
            {
                id: uuidv4(),
                timeStamp: new Date().setSeconds(
                    new Date().getSeconds() + time
                ),
                message: message,
                hasActiveTimeout: false,
                backgroundColor: "#fffb8a",
                textColor: "#a8a300",
                type: TOAST.TYPE.INFO,
            },
        ]);
    }

    // Stylesheet
    const masterStyle = {
        toastContainer: {
            position: "fixed",
            top: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
        },
    };

    return (
        <ToastContext.Provider value={{ success, error, info }}>
            <div className="w-full space-y-2 sm:max-w-xl" style={masterStyle.toastContainer}>
                {toasts?.map((toast, index) => {
                    return (
                        <Toast
                            TOAST={TOAST}
                            type={toast.type}
                            backgroundColor={toast.backgroundColor}
                            textColor={toast.textColor}
                            key={index}
                            message={toast.message}
                        />
                    );
                })}
            </div>

            {children}
        </ToastContext.Provider>
    );
}
