import { createContext, useState } from "react";

export const InterviewContext = createContext();


export const interviewProvider = ({children})=>{
    const [loading, setLoading]= useState(false);
    const [report, setReport] = useState(null);

    return (
        <InterviewContext.Provider value={{loading,setLoading, report, setReport}}>
            {children}
        </InterviewContext.Provider>
    )

}