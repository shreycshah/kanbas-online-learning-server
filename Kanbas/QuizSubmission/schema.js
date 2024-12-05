import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
    questionId: { type: String, required: true },
    type: { type: String, required: true, enum: ["mcq", "tf", "fib"] },
    answer: { type: String, required: false }, 
});

const schema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true }, 
        course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel", required: true }, 
        quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel", required: true }, 
        responses: [responseSchema], 
        score: { type: Number, required: false },
        timeBegin: { type: Date, required: true },
        timeEnd: { type: Date, required: true }
    },
    { collection: "QuizAttempts" }
);

export default schema;
