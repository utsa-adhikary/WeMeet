import { useEffect, useState, useContext } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useParams,
} from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import MeetingPage from "./pages/MeetingPage.jsx";
import { fetchApi } from "./utils/fetchApi.js";
import AuthContext from "./contexts/AuthContext.jsx";

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
        const response = await fetchApi(`/api/meeting/id/${roomId}`, {
          method: "POST",
        });

        if (!active) return;

        const result = await response.json();

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
    return null;
  }

  if (status === "denied") {
    return <Navigate to="/" replace />;
  }

  return <MeetingPage />;
}

function ProtectedLoginRoute() {
  const { logined } = useContext(AuthContext);
  return logined ? <Navigate to="/" replace /> : <SignupPage mode="signin" />;
}

function ProtectedRegisterRoute() {
  const { logined } = useContext(AuthContext);
  return logined ? <Navigate to="/" replace /> : <SignupPage mode="signup" />;
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
    element: <ProtectedRegisterRoute />,
  },
  {
    path: "/signin",
    element: <ProtectedLoginRoute />,
  },
  {
    path: "*",
    element: <div>Error</div>,
  },
]);

function App() {
  const [logined, setLogined] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetchApi("/api/auth/me", { method: "GET" });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setLogined(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ logined, setLogined, user, setUser }}>
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
    </AuthContext.Provider>
  );
}

export default App;
