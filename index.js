import express from 'express';
import mongoose from 'mongoose';
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import "dotenv/config";
import session from "express-session";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from './Kanbas/Modules/routes.js';
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import EnrollementsRoutes from './Kanbas/Enrollments/route.js';
import QuizRoutes from './Kanbas/Quizzes/routes.js';

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING ||"mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(
    cors({
        credentials: true,
        origin: process.env.NETLIFY_URL || "http://localhost:3000" || 
        "https://a5--wonderful-cannoli-5646c0.netlify.app",
    })
);
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        //domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));

app.use(express.json());
Lab5(app)
Hello(app)
UserRoutes(app)
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollementsRoutes(app);
QuizRoutes(app);
app.listen(process.env.PORT || 4000)