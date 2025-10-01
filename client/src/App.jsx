import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import LandingPage from "./pages/LandingPage"
import SignUp from "./pages/SignUp"
import LogIn from "./pages/LogIn"
import LoggedInRoutes from "./components/LoggedInRoutes"
import Profile from "./pages/Profile"
import CreateQuiz from "./pages/CreateQuiz"
import DashboardLayout from "./components/DashboardLayout"
import CreateQuestions from "./pages/CreateQuestions"
import AdminQuizes from "./pages/AdminQuizes"
import AttemptQuiz from "./pages/AttemptQuiz"
import QuizResult from "./pages/QuizResult"
import { useSelector } from "react-redux"
import History from "./pages/History"
//C:\Users\gangt\AppData\Roaming\npm
function App() {

  const { user } = useSelector(state => state.auth)

  return (
    <div className=" bg-slate-950 text-white">
            <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/quiz/:id" element={<AttemptQuiz />} />
          <Route path="/quiz-results" element={<LoggedInRoutes><QuizResult /></LoggedInRoutes>} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<LoggedInRoutes><DashboardLayout><Profile /></DashboardLayout></LoggedInRoutes>} />
          <Route path="/dashboard/history" element={<LoggedInRoutes><DashboardLayout><History /></DashboardLayout></LoggedInRoutes>} />
          <Route path="/dashboard/create-quiz" element={<LoggedInRoutes><DashboardLayout><CreateQuiz /></DashboardLayout></LoggedInRoutes>} />
          <Route path="/dashboard/create-quiz/:id" element={<LoggedInRoutes><DashboardLayout><CreateQuestions /></DashboardLayout></LoggedInRoutes>} />
          <Route path="/dashboard/quizes" element={<LoggedInRoutes><DashboardLayout><AdminQuizes /></DashboardLayout></LoggedInRoutes>} />
          <Route path="/dashboard/edit-quiz/:id" element={<LoggedInRoutes><DashboardLayout><CreateQuiz /></DashboardLayout></LoggedInRoutes>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
