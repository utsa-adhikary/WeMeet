import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import MeetingPreviewPage from "./pages/MeetingPreviewPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import { generateMeetingCode, isValidMeetingCode } from "./utils/meetingCode.js";

function MeetingPreviewRoute({ onHome }) {
  const { meetingCode = "" } = useParams();

  if (!isValidMeetingCode(meetingCode)) {
    return <Navigate replace to="/" />;
  }

  return <MeetingPreviewPage meetingCode={meetingCode} onHome={onHome} />;
}

function AppRoutes() {
  const navigate = useNavigate();

  function navigateTo(path, event) {
    event?.preventDefault();
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startMeeting(event) {
    navigateTo(`/meeting-preview/${generateMeetingCode()}`, event);
  }

  const onHome = (event) => navigateTo("/", event);
  const onSignup = (event) => navigateTo("/signup", event);
  const onJoinMeeting = (meetingCode) =>
    navigateTo(`/meeting-preview/${meetingCode}`);

  return (
    <Routes>
      <Route
        element={
          <HomePage
            onHome={onHome}
            onJoinMeeting={onJoinMeeting}
            onSignup={onSignup}
            onStartMeeting={startMeeting}
          />
        }
        path="/"
      />
      <Route element={<SignupPage onHome={onHome} />} path="/signup" />
      <Route
        element={<MeetingPreviewRoute onHome={onHome} />}
        path="/meeting-preview/:meetingCode"
      />
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
