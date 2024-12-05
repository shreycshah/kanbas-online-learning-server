import * as quizSubmissionDao from "./dao.js"
import * as quizzes from "../Quizzes/dao.js"
import mongoose from "mongoose";
import schema from "./schema.js";

const UserDetails = mongoose.model('QuizSubmission', schema);

const userDetailsData = {
    user: new mongoose.Types.ObjectId("674f51eff42ad20284b65241"), 
    course: new mongoose.Types.ObjectId("674f51d1f42ad20284b65228"),
    quiz: new mongoose.Types.ObjectId("6750e3a4b98f8111136d6f32"), 
    timeBegin: new Date("2024-12-01T09:10:00Z"),
    timeEnd: new Date("2024-12-01T09:12:00Z"),
    score: 0,
    responses: [
        {
            questionId: "q1",
            type: "mcq",
            answer: "Object-Oriented",
        },
        {
            questionId: "q2",
            type: "tf",
            answer: "false",
        },
        {
            questionId: "q3",
            type: "fib",
            answer: "push"
        }
    ]
};

const userDetails = new UserDetails(userDetailsData);

export default function QuizSubmissionRoute(app) {
    app.get('/api/quizzes/submission/:quizId', async (req, res) => {
        const { quizId } = req.params
        const  quizDetails  = await quizzes.findQuizForUser(new mongoose.Types.ObjectId(quizId))
        let  score  = 0

        quizDetails.questions.forEach((question, index) => {
            userDetails.responses.forEach((response, index)=>{
                if(response.questionId===question.q_id){
                    if (question.type === "mcq") {
                        const correctAnswer = question.choices.find(choice => choice.isCorrect===true)
                        if(correctAnswer.option===response.answer){
                            score+=question.points
                        }
                    }
                    else if (question.type === "tf") {
                        const correctAnswer = question.answer
                        if(correctAnswer.toString()===response.answer){
                            score+=question.points
                        }
                    } 
                    else if (question.type === "fib") {
                        if(question.possibleAnswers.includes(response.answer)){
                            score+=question.points
                        }
                    }
                }
            });
        });
        userDetails.score=score
        const status = await quizSubmissionDao.createQuizSubmission(userDetails);
        res.send(status)
    })

    app.get("/api/quizzes/:quizId", async (req, res) => {
        const {quizId}=req.params
        const quizzes = await quizSubmissionDao.findAllQuizAttempt(new mongoose.Types.ObjectId(quizId), userDetailsData.user)
        res.send(quizzes);
    });
}