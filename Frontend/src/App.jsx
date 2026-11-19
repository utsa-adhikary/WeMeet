import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import MeetingPreviewPage from "./pages/MeetingPreviewPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/meeting/:roomId",
    element: <MeetingPreviewPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "*",
    element: <div>Error</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
