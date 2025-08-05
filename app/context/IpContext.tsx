import {createContext, useContext, useState} from "react";

interface IpContextType{
    ip : string,
    setIp: (newIp : string) => void;
}

const IpContext = createContext<IpContextType | undefined>(undefined);

export function IpProvider({children} : {children : React.ReactNode}){
    const [ip, setIp] = useState("");

    return (
        <IpContext.Provider value={{ip,setIp}}>
            {children}
        </IpContext.Provider>
    );
};

export const useIp = () =>{
    const context = useContext(IpContext);
    if(!context){
        throw new Error("useIp must be used within an IpProvider")
    }
    return context
};
