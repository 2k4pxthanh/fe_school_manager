import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import CreateStudent from "../pages/CreateStudent";
import EditStudent from "../pages/EditStudent";
import Teachers from "../pages/Teachers";
import CreateTeacher from "../pages/CreateTeacher";
import EditTeacher from "../pages/EditTeacher";
import Classes from "../pages/Classes";
import CreateClass from "../pages/CreateClass";
import EditClass from "../pages/EditClass";
import Grades from "../pages/Grades";
import CreateGrade from "../pages/CreateGrade";
import EditGrade from "../pages/EditGrade";
import NotFound404 from "../pages/NotFound404";

const publicRoutes = [
  { path: "/", component: Login, layout: null },
  { path: "/login", component: Login, layout: null },

  { path: "*", component: NotFound404, layout: null },
];

const privateRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/students", component: Students },
  { path: "/students/create", component: CreateStudent },
  { path: "/students/edit/:id", component: EditStudent },
  { path: "/teachers", component: Teachers },
  { path: "/teachers/create", component: CreateTeacher },
  { path: "/teachers/edit/:id", component: EditTeacher },
  { path: "/classes", component: Classes },
  { path: "/classes/create", component: CreateClass },
  { path: "/classes/edit/:id", component: EditClass },
  { path: "/grades", component: Grades },
  { path: "/grades/create", component: CreateGrade },
  { path: "/grades/edit/:id", component: EditGrade },
];

export { publicRoutes, privateRoutes };
