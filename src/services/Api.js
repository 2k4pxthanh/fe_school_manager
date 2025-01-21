import Http from "./Http";
export const getAvatarByName = (name) => Http.get(`/image/${name}`);
// TEACHER
export const getAllTeachers = (config) => Http.get("/teachers", config);
export const getTeacherById = (id) => Http.get(`/teachers/${id}`);
export const createTeacher = (data) => Http.post("/teacher/create", data);
export const editTeacher = (data, id) => Http.post(`/teacher/edit/${id}`, data);
export const deleteTeacherById = (id) => Http.delete(`/teacher/delete/${id}`);
// GRADE
export const getAllGrades = (config) => Http.get("/grades", config);
export const getGradeById = (id) => Http.get(`/grades/${id}`);
export const createGrade = (data) => Http.post("/grade/create", data);
export const editGrade = (data, id) => Http.post(`/grade/edit/${id}`, data);
export const deleteGradeById = (id) => Http.delete(`/grade/delete/${id}`);
// CLASS
export const getAllClasses = (config) => Http.get("/classes", config);
export const getClassById = (id) => Http.get(`/classes/${id}`);
export const createClass = (data) => Http.post("/class/create", data);
export const editClass = (data, id) => Http.post(`/class/edit/${id}`, data);
export const deleteClassById = (id) => Http.delete(`/class/delete/${id}`);
// STUDENT
export const getAllStudents = (config) => Http.get("/students", config);
export const getStudentById = (id) => Http.get(`/student/${id}`);
export const createStudent = (data) => Http.post("/student/create", data);
export const editStudent = (data, id) => Http.post(`/student/edit/${id}`, data);
export const deleteStudentById = (id) => Http.delete(`/student/delete/${id}`);
