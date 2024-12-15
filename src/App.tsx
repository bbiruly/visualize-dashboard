import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import OtpVerify from "./pages/auth/OtpVerify";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ChangePassword from "./pages/auth/ChangePassword";
import Success from "./pages/auth/Success";
import Dashboard from "./pages/dashboard/Dashboard";
import { Toaster } from "react-hot-toast";
import Setting from "./pages/setting/Setting";
import Profile from "./pages/profile/Profile";
import Home from "./pages/analytics-dashborad/Home";
import { useEffect } from "react";

// Create a Protected Route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: RootState) => state.user);

  //WIP - STEP-1: FOR SHARABLE LINK CREATING PROCESS FOR DO THIS
    useEffect(() => {
      // Parse the query parameters from the URL
      const queryParams = new URLSearchParams(window.location.search);
    
      // If there are query parameters, save them to localStorage
      if (queryParams.has('age') && queryParams.has('gender') && queryParams.has('from') && queryParams.has('to')) {
        const queryParamsObj = {
          age: queryParams.get('age'),
          gender: queryParams.get('gender'),
          from: queryParams.get('from'),
          to: queryParams.get('to'),
        };
    
        // Save to localStorage
        localStorage.setItem('savedQueryParams', JSON.stringify(queryParamsObj));
      }
    }, []);
    

  


  // Check if the user is authenticated
  if (!user.isAuthenticated) {
    // If not authenticated, redirect to the login page
    window.location.href = "/login";
    return null;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-right" reverseOrder={false} />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/otp-verify" element={<OtpVerify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/success" element={<Success />} />

          {/* Protected Route - Dashboard and Nested Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            {/* Nested Routes for Dashboard */}
            <Route path="/settings" element={<Setting />} />
            <Route path="/analytics" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
