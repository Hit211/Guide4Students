import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from './pages/Intro'
import Dashboard from './pages/Dashboard/Dashboard'
import Roadmap from './pages/Dashboard/Roadmap'
import Advice from './pages/Dashboard/Advice'
import News from './pages/Dashboard/News'
import Signup from './pages/SignUp'
import Login from './pages/Login'
import { Toaster } from 'sonner'
import Community from './pages/Community/Community'
import AdminPanel from "./pages/Admin/AdminPanel";
import AdminLogin from "./Admin/AdminLogin";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import AdminRoutes from "./Admin/AdminRoutes";
import AdminServices from "./pages/Admin/AdminServices";
import MainPage from "./pages/Dashboard/MainPage";
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
            <Advice />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/news" element={
          <ProtectedRoute>
            <News />
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
       </Route>

       </Routes>
       <Toaster position='top-right' richColors/>
    </Router>
  )
}

export default App