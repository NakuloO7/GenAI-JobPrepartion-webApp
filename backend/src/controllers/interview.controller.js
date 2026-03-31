
const pdfParse = require('pdf-parse')
const {generateInterviewReport, gnerateResumePdf} = require('../services/ai.service');
const interviewReportModel = require('../models/interviewReport.model');



/**
 * @description controller to get the interview report based on user, self description, job desc and resume
 */
async function generateInterviewReportController(req, res){
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();  //taking the resume in pdf and reading the text
    const {jobDescription, selfDescription} = req.body;

    //make a call to the ai service which we created
    const interviewReportByAi = await generateInterviewReport({resume : resumeContent.text, selfDescription, jobDescription});

    //added the generated interview report to the database
    const interviewReport = await interviewReportModel.create({
        user : req.user.id,
        resume : resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    });

    res.status(201).json({

        message : "Interview report generated successfully",
        interviewReport
    })
}

/**
 * @description controller to get interview report based in id
 */
async function getInterviewReportByIdController(req, res){
    const {interviewId} = req.params;

    const interviewReport = await interviewReportModel.findOne({_id : interviewId, user:req.user.id});

    if(!interviewReport){
        return res.status(401).json({
            message : "Interview report not found!"
        })
    }

    res.status(200).json({
        message : "Interview report fetched successfully!",
        interviewReport
    })
}


/**
 * @description controller to get all the interview reports of the logged in user
 */

async function getAllInterviewReportsController(req, res){
    const interviewReports = await interviewReportModel.find({user:req.user.id}).sort({createdAt : -1}).select("-resume -jobDescription -selfDescription -__v -technicalQuestions -behaviouralQuestion -skillGaps -preparationPlan");
    res.status(201).json({
        message : "Interview Reports fetched Successfully!",
        interviewReports
    })
}

/**
 * @description controller to generate resume pdf based on users resume, self description and job description
 */
async function generateResumsPdfController(req, res){
    const {interviewReportId} = req.params;
    const interviewReport = await interviewReportModel.findById(interviewReportId);
    if(!interviewReport){
        return res.status(404).json({
            message : "Interview report not found!"
        })
    }
    const {resume, selfDescription, jobDescription} = interviewReport;
    const pdfBuffer = await gnerateResumePdf({resume, selfDescription, jobDescription});

    res.set({
        "Content-Type" : 'application/pdf',
        "Contend-Disposition" : `attachment; filename=resume_${interviewReportId}.pdf`
    });
    res.send(pdfBuffer);
}

module.exports = {
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumsPdfController
};