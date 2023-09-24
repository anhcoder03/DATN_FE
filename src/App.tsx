import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ReceptionList from "./pages/reception/ReceptionList";
import ExaminationList from "./pages/examination/ExaminationList";
function App() {
  const router = createBrowserRouter([
    { path: "", element: <Home /> },
    {
      path: "reception",
      element: <ReceptionList />,
    },
    {
      path: "examination",
      element: <ExaminationList />,
    },
  ]);
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
}

export default App;
