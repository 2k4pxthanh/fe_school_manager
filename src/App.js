import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import DefaultLayout from "./layouts/DefaultLayout";
import ProtectedRoute from "./middlewares/PrivateRoute";

function App() {
  return (
    <Routes>
      {publicRoutes.map((route, index) => {
        const Page = route.component;
        let Layout = DefaultLayout;

        if (route.layout) {
          Layout = route.layout;
        } else if (route.layout === null) {
          Layout = Fragment;
        }

        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout>
                <Page />
              </Layout>
            }
          />
        );
      })}

      {privateRoutes.map((route, index) => {
        const Page = route.component;
        let Layout = DefaultLayout;

        if (route.layout) {
          Layout = route.layout;
        } else if (route.layout === null) {
          Layout = Fragment;
        }

        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout>
                <ProtectedRoute>
                  <Page />
                </ProtectedRoute>
              </Layout>
            }
          />
        );
      })}
    </Routes>
  );
}

export default App;
