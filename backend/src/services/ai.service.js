const {GoogleGenAI} = require('@google/genai');
const {z} = require('zod');
const {zodToJsonSchema} = require('zod-to-json-schema');
const puppeteer =  require ('puppeteer');

const ai = new GoogleGenAI({
    apiKey : process.env.GOOGLE_GENAI_API_KEY
});

//we need the data form the ai in a particular format such that we can easily store it in the database
//this schema is created for the Ai to let know the purpose of the particular property
const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions : z.array(z.object({
        question : z.string().describe("The technical question can be asked in the interview"),
        intention : z.string().describe("The intention of interviewr behind asking this question"),
        answer : z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions can be asked in the interview along with their intention how to answer them"),

    behaviouralQuestion : z.array(z.object({
        question : z.string().describe("The behavourial question can be asked in the interview"),
        intention : z.string().describe("The intention of interviewr behind asking this question"),
        answer : z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioural questions can be asked in the interview along with their intention how to answer them"),

    skillGaps : z.array(z.object({
        skill : z.string().describe("The skill which candidate is lagging"),
        severity : z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),

    preparationPlan : z.array(z.object({
        day : z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
}).strict(); //this prevents extra fields

async function generateInterviewReport({resume, selfDescription, jobDescription}){
    const prompt = `You are an AI that MUST return STRICT JSON.

    You MUST follow this exact JSON structure:
    
    {
      "matchScore": number,
      "technicalQuestions": [
        {
          "question": string,
          "intention": string,
          "answer": string
        }
      ],
      "behaviouralQuestion": [
        {
          "question": string,
          "intention": string,
          "answer": string
        }
      ],
      "skillGaps": [
        {
          "skill": string,
          "severity": "low" | "medium" | "high"
        }
      ],
      "preparationPlan": [
        {
          "day": number,
          "focus": string,
          "tasks": string[]
        }
      ],
      "title": string
    }
    RULES:
    - Return ONLY a JSON object
    - DO NOT return array
    - DO NOT add extra fields
    - Follow schema strictly
    
    Generate interview report for:
    Resume : ${resume}
    selfDescription : ${selfDescription}
    jobDescription : ${jobDescription}`

    const response = await ai.models.generateContent({
        model : "gemini-2.5-flash-lite",
        contents : prompt,
    });
    // return JSON.parse(response.text);
    const raw = response.text;

    const cleaned = raw
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(cleaned);
}


async function generatePdfFormHtml(htmlContent){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, {waitUntil : 'networkidle0'});

    const pdfBuffer = await page.pdf({format : "A4", margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
      });
    await browser.close();
    return pdfBuffer;
}

async function gnerateResumePdf({resume, selfDescription, jobDescription}){
    const resumepdfSchema = z.object({
      html : z.string().describe("The html content of resume which will be converted to pdf using an library like puppeteer")
    })
  
    const prompt = `Generate a resume for a candidate with the following details: 
                  Resume : ${resume}
                  Self Description : ${selfDescription}
                  Job Description : ${jobDescription}
                  
                  the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                  The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                  The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                  you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                  The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                  The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                  `
  
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents : prompt,
      config : {
        responseMimeType : 'application/json',
        responseSchema : zodToJsonSchema(resumepdfSchema)
      }
    })

    const jsonContent =  JSON.parse(response.text);
    const pdfBuffer = generatePdfFormHtml(jsonContent.html);
    return pdfBuffer;

}

module.exports = {
  generateInterviewReport,
  gnerateResumePdf
};