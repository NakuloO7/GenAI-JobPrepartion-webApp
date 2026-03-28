const mongoose = require('mongoose');

/**
 * - job description shema :string
 * - resume text : string
 * - self description : string
 * 
 * - matchScore : number
 * 
 * - Technical questions : [{
 *     question : "",
 *     intention : "",
 *     answer : "",
 *   }]
 * - Behaviour questions : [{
 *     question : "",
 *     intention : "",
 *     answer : "",
 *   }]
 * - Skill gaps : [{
 *     skill : 
 *     severity : {
 *       type : string,
 *       enum : ["low", "medium", "high"]
 *     }
 *   }]
 * - Preparation plan : [{
 *      day : Number,
 *      topic : string,
 *      focus : string,
 *      tast : [string]
 *   }]
 */


const technicalQuestionsSchema = new mongoose.Schema({ 
    question : {
        type : String,
        required : [true, "Technical question is required!"]
    },
    intention : {
        type : String,
        required : [true, "Intention is required!"]
    }, 
    answer : {
        type : String,
        required : [true, "Answer is required!"]
    }
}, {
    _id : false
});

const behaviouralQuestionSchema  = new mongoose.Schema({
    question : {
        type : String,
        required : [true, "Technical question is required!"]
    },
    intention : {
        type : String,
        required : [true, "Intention is required!"]
    }, 
    answer : {
        type : String,
        required : [true, "Answer is required!"]
    }
}, {
    _id : false
});

const skillGapsSchema = new mongoose.Schema({
    skill : {
        type : String,
        required : [true, "Skill is required"]
    },
    severity : {
        type : String,
        enum : ["low", "medium", "high"],
        required : [true, "Severity is required"]
    }
}, {
    _id : false
});


const preparationPlanSchema = new mongoose.Schema({
    day : {
        type : Number,
        required : [true, "Day is required"]
    },
    focus : {
        type : String,
        required : [true,"Focus is required"]
    },
    tasks : [{
        type : String,
        required : [true, "Task is required"]
    }]
}, {
    _id : false
})


const interviewReportSchema = new mongoose.Schema({
    jobDescription : {
        type : String, 
        required : [true, "Job Description is required"]
    },
    resume : {
        type : String,
    },
    selfDescription : {
        type : String,
    },
    matchScore : {
        type : Number,
        min : 0,
        max : 100
    },
    technicalQuestions : [technicalQuestionsSchema],
    behaviouralQuestion : [behaviouralQuestionSchema],
    skillGaps : [skillGapsSchema],
    preparationPlan : [preparationPlanSchema],
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    title : {
        type : String,
        required: [true, "Job title is required"]
    }
}, {
    timestamps : true
});

const interviewReportModel = mongoose.model("InterviewReport",interviewReportSchema);
module.exports = interviewReportModel;