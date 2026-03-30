import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:3000",
    withCredentials : true
})


export const generateInterviewReport = async ({jobDescription, selfDescription, resumeFile})=>{
    try {
        const formData = new FormData(); //this is used when we send file from FE to BE
        formData.append("jobDescription", jobDescription)
        formData.append("selfDescription", selfDescription)
        formData.append("resume", resumeFile)
    
        const response = await api.post('/api/interview/', formData, {
            headers : {
                "Content-Type" : "multipart/form-data" //tells server this contains mixed data(files and text)
            }
        });
    return response.data;
    } catch (error) {
        console.log(error)
    }
}

/**(
 * @description service to get the interview report by id
) */
export const getInterviewReportById = async({interviewId})=>{
    try {
        const response =  await api.get(`/api/interview/record/${interviewId}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
/**(
 * @description service to get all the ineterview reports of the logged in user
) */
export const getAllInterviewReports = async()=>{
    try {
        const response = await api.get('/api/interview/');
        return response.data;
    } catch (error) {
        console.log(error)
    }
}