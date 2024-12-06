import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
    {
        _id: { type: String },
        title: { type: String },
        course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel", },
        not_available_until: { type: String },
        due: { type: String, },
        points: { type: Number, },
        description: { type: String },
        assignment_group: { type: String, },
        display_grade_as: { type: String, },
        submission_type: { type: String, },
        online_entry_option: [{ type: String }],
    },
    { collection: "assignments" }
);

export default assignmentSchema;