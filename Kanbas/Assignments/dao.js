import model from "./model.js";
export function findAssignmentsForCourse(courseId) {
    return model.find({ course: courseId });
}
export function createAssignment(newAssignment) {
    return model.create(newAssignment);
}
export function deleteAssignment(assignmentId) {
    return model.findByIdAndDelete(assignmentId);
}
export function updateAssignment(assignmentId, assignmentUpdates) {
    return model.updateOne({ _id: assignmentId }, assignmentUpdates);
}