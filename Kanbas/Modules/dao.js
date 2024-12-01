import Database from "../Database/index.js";
import model from "./model.js";
export function findModulesForCourse(courseId) {
    console.log(model.find({ course: courseId }));
    return model.find({ course: courseId });
    // const { modules } = Database;
    // return modules.filter((module) => module.course === courseId);
}
export function createModule(module) {
    // const newModule = { ...module, _id: Date.now().toString() };
    // Database.modules = [...Database.modules, newModule];
    // Database.modules.push(newModule);
    // return newModule;
    delete module._id
    return model.create(module);
}
export function deleteModule(moduleId) {
    return model.findByIdAndDelete(moduleId);
    // const { modules } = Database;
    // Database.modules = modules.filter((module) => module._id !== moduleId);
}

export function updateModule(moduleId, moduleUpdates) {
    return model.updateOne({ _id: moduleId }, moduleUpdates);
    // const { modules } = Database;
    // const module = modules.find((module) => module._id === moduleId);
    // Object.assign(module, moduleUpdates);
    // return module;
}



