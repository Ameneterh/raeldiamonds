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
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />

        {/* protected routes */}
        <Route
          path="/seller-profile"
          element={
            <ProtectedPage>
              <SellerProfilePage />
            </ProtectedPage>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedPage>
              <AdminDashboard />
            </ProtectedPage>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
