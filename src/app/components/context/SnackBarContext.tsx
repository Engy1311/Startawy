import { createContext, useState, ReactNode } from "react";
import MySnackbar from "../SnackBar";

export const SnackBarContext = createContext({
    open: false,
    message: "",
    showToast: (message: string) => {},
    hideToast: () => {},
});

export const SnackBarProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const showToast = (msg: string) => {
        setMessage(msg);
        setOpen(true);
    };

    const hideToast = () => {
        setOpen(false);
    };

    return (
        <SnackBarContext.Provider value={{ open, message, showToast, hideToast }}>
            {children}
            <MySnackbar open={open} message={message} onClose={hideToast} />
        </SnackBarContext.Provider>
    );
};