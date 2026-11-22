import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useParams,
} from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import MeetingPreviewPage from "./pages/MeetingPreviewPage.jsx";
import { fetchApi } from "./utils/fetchApi.js";

function ProtectedMeetingRoute() {
  const { roomId } = useParams();
  const [status, setStatus] = useState("checking"); // "checking" | "allowed" | "denied"

  useEffect(() => {
    let active = true;

    async function checkAccess() {
      if (!roomId) {
        if (active) setStatus("denied");
        return;
      }

      try {
        const result = await fetchApi(`/api/meeting/id/${roomId}`, { method: "POST" });

        if (!active) return;

        if (result.success) {
          setStatus("allowed");
        } else {
          toast.error(result.message || "Invalid or unauthorized meeting.");
          setStatus("denied");
        }
      } catch {
        if (!active) return;
        toast.error("Could not verify meeting room.");
        setStatus("denied");
      }
    }

    setStatus("checking");
    checkAccess();

    return () => {
      active = false;
    };
  }, [roomId]);

  if (status === "checking") {
    return <div className="p-6 text-center">Verifying meeting room...</div>;
  }

  if (status === "denied") {
    return <Navigate to="/" replace />;
  }

  return <MeetingPreviewPage />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/meeting/:roomId",
    element: <ProtectedMeetingRoute />,
  },
  {
    path: "/signup",
    element: <SignupPage mode="signup" />,
  },
  {
    path: "/signin",
    element: <SignupPage mode="signin" />,
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
              background: "#ecfdf5",
              color: "#065f46",
              border: "1px solid #10b981",
            },
            iconTheme: {
              primary: "#10b981",
              secondary: "#ecfdf5",
            },
          },
          error: {
            style: {
              background: "#fef2f2",
              color: "#991b1b",
              border: "1px solid #ef4444",
            },
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fef2f2",
            },
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
