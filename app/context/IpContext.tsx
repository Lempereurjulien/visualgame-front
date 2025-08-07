import { createContext, useContext, useState } from "react";

interface IpContextType {
    ip: string,
    setIp: (newIp: string) => void;
    resetIp: () => void;
}

const IpContext = createContext<IpContextType | undefined>(undefined);

export function IpProvider({ children }: { children: React.ReactNode }) {
    const [ip, setIpState] = useState(() => {
        if(typeof window !== "undefined"){
            return localStorage.getItem("ip") ?? ""
        }
        return "";
    });

    const setIp = (newIp: string) => {
        setIpState(newIp);
        localStorage.setItem("ip", newIp);
    }

    const resetIp = () => {
        setIpState("");
        localStorage.removeItem("ip");
    }

    return (
        <IpContext.Provider value={{ ip, setIp, resetIp }}>
            {children}
        </IpContext.Provider>
    );
};



export const useIp = () => {
    const context = useContext(IpContext);
    if (!context) {
        throw new Error("useIp must be used within an IpProvider")
    }
    return context
};
