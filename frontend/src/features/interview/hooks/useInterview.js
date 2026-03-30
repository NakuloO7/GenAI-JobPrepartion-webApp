import { useContext } from "react"
import { InterviewContext } from "../interview.context"
import { generateInterviewReport, getAllInterviewReports, getInterviewReportById } from "../services/interview.api"

/**
 * @description form this hook we basically set interview values into the context such that we can use them into UI
 * this hook will be used in home.jsx file
 */
export const useInterview = ()=>{
    const context = useContext(InterviewContext)

    if(!context){
        throw new Error("useInterview must be used within InterviewProvider")
    }
    const {loading, setLoading, report, setReport, reports, setReports} = context;

    /**
    * @description  take the values from UI and give it to the api to generate the interview report
    */
    const generateReport = async({jobDescription, selfDescription, resumeFile})=>{
        setLoading(true);
        let response = null;
        try {
            response = await generateInterviewReport({jobDescription, selfDescription, resumeFile});
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
        return response.interviewReport; 
    }

    /**
    * @description  take the values from UI and give it to the api to get the report by Id
    */
    const getReportById = async(interviewId)=>{
        setLoading(true);
        let response = null;
        try {
            response = await getInterviewReportById({interviewId});
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }

        return response.interviewReport;
    }

    /**
    * @description gives back all the interview Reports
    */
    const getAllReports = async()=>{
        setLoading(true);
        let response = null;
        try {
            response = await getAllInterviewReports();
            setReports(response.interviewReports)
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
        return response.interviewReports
    }

    return {loading, report, reports, generateReport, getReportById, getAllReports};

}


