import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard/Dashboard'
import Roadmap from './pages/Dashboard/Roadmap'
import Signup from './pages/SignUp'
import Login from './pages/Login'
import { Toaster } from 'sonner'
import Community from './pages/Community/Community'
import AdminPanel from "./pages/Admin/AdminPanel";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import AdminRoutes from "./AdminLogin/AdminRoutes";
import AdminServices from "./pages/Admin/AdminServices";
import MainPage from "./pages/Dashboard/MainPage";
import AdminMentor from "./pages/Admin/AdminMentor";
import News from "./pages/News/News";
import Intro from "./pages/Intro/Intro";
import Advice from "./pages/Advice/Advice";
import AdminLogin from "./AdminLogin/AdminLogin";
// import ProtectedAdminRoute from "./ProtectedRoute/ProtectedAdminRoute";
const App = () => {
  return (
    <Router>
       <Routes>
        <Route path='/' element={<Intro/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
         <Route path="/admin/login" element={<AdminLogin/>}/>

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/roadmap/" element={
          <ProtectedRoute>
            <Roadmap />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/roadmap/:id" element={
          <ProtectedRoute>
            <MainPage/>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/advice" element={
          <ProtectedRoute>
            <Advice/>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/news" element={
          <ProtectedRoute>
            <News/>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/community" element={
          <ProtectedRoute>
            <Community />
          </ProtectedRoute>
        } />
       
       <Route path="/adminpanel" element={<AdminRoutes />}>
          <Route index element={<AdminPanel />} />
          <Route path="services" element={<AdminServices/>}/>
          <Route path="mentor" element={<AdminMentor/>}/>
       </Route>

       </Routes>
       <Toaster position='top-right' richColors/>
    </Router>
  )
}

export default App