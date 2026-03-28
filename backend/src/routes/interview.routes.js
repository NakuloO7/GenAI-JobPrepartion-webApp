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

/**
 * @route /record/:interviewId
 * @description get interview report by interview Id
 */
interviewRouter.get('/record/:interviewId', authMiddleware, interviewController.getInterviewReportByIdController);

/**
 * @route /api/interview/
 * @description get all the interview reports by the logged in user
 */

interviewRouter.get('/', authMiddleware, interviewController.getAllInterviewReportsController);

module.exports = interviewRouter;