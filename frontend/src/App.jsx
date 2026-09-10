import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import AboutPage from "./Pages/AboutPage.jsx";
import CollectionsPage from "./Pages/CollectionsPage.jsx";
import ContactPage from "./Pages/ContactPage.jsx";
import ProductPage from "./Pages/ProductPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import RegistrationPage from "./Pages/RegistrationPage.jsx";
import ProtectedPage from "./Components/ProtectedPage.jsx";
import Spinner from "./Components/Spinner.jsx";
import SellerProfilePage from "./Pages/SellerProfilePage.jsx";
import AdminDashboard from "./Pages/adminDashboard/AdminDashboard.jsx";
import { useSelector } from "react-redux";
import PrivacyPolicy from "./Pages/PrivacyPolicy.jsx";
import TermsOfUse from "./Pages/TermsOfUse.jsx";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import NotFoundPage from "./Pages/NotFoundPage.jsx";
import UserDashboard from "./Pages/UserDashboard.jsx";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage.jsx";
import PasswordResetPage from "./Pages/PasswordResetPage.jsx";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore.js";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

// protected routes
const AdminOnlyRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    // toast.error("You need to log in to access this page");
    return <Navigate to="/user-login" replace />;
  }

  if (!user.isAdmin) {
    toast.error("You aren't authorized to view this page!");
    return <Navigate to="/" replace />;
  }

  return children;
};

// protected routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    // toast.error("You need to log in to access this page");
    return <Navigate to="/user-login" replace />;
  }

  if (user.status !== "active") {
    toast.error("Your account is not active, contact HR!");
    return <Navigate to="/verify-handler" replace />;
  }

  return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.status === "active") {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  // const { loading } = useSelector((state) => state.loaders);

  return (
    <div className="">
      {/* {loading && <Spinner />} */}
      <ScrollToTop />
      <Routes>
        {/* unprotected routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* protected routes */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* private routes for only authenticated users */}
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password"
          // path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <PasswordResetPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectAuthenticatedUser>
              <RegistrationPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
