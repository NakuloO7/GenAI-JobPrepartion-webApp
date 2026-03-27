const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const interviewRouter = express.Router();
const interviewController = require('../controllers/interview.controller');
const upload = require('..//middleware/file.middleware');


/**
 * @route /api/interview
 * @description generate the new interview report on the basis of your resume, self and job description
 */
interviewRouter.post('/',authMiddleware, upload.single("resume"), interviewController.generateInterviewReportController)


module.exports = interviewRouter;