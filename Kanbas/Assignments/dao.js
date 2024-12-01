import Database from "../Database/index.js";
import model from "./model.js";
export function findAssignmentsForCourse(courseId) {
    // const { assignments } = Database;
    // return assignments.filter((assignment) => assignment.course === courseId);
    console.log("courseId", courseId);
    return model.find({ course: courseId });
}
export function createAssignment(newAssignment) {
    // Database.assignments.push(newAssignment);
    // return newAssignment;
    return model.create(newAssignment);
}
export function deleteAssignment(assignmentId) {
    // const { assignments } = Database;
    // Database.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
    return model.findByIdAndDelete(assignmentId);
}
export function updateAssignment(assignmentId, assignmentUpdates) {
    return model.updateOne({ _id: assignmentId }, assignmentUpdates);
    // const { assignments } = Database;
    // const assignment = assignments.find((assignment) => assignment._id === assignmentId);
    // Object.assign(assignment, assignmentUpdates);
    // return assignment;
}