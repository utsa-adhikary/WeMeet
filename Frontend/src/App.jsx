import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import MeetingPreviewPage from "./pages/MeetingPreviewPage.jsx";
import { Toaster } from "react-hot-toast";

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
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: "10px",
            padding: "12px 16px",
            fontSize: "14px",
            fontWeight: "500",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          },
          success: {
            style: {
              background: "#ecfdf5", // Light green background
              color: "#065f46", // Dark green text
              border: "1px solid #10b981",
            },
            iconTheme: {
              primary: "#10b981", // Green checkmark circle
              secondary: "#ecfdf5", // Checkmark color
            },
          },
          error: {
            style: {
              background: "#fef2f2", // Light red background
              color: "#991b1b", // Dark red text
              border: "1px solid #ef4444",
            },
            iconTheme: {
              primary: "#ef4444", // Red X circle
              secondary: "#fef2f2", // X color
            },
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
