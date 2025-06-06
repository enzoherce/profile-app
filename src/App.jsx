import "./App.css";
import AboutPage from "./pages/AboutPage";
import Navbar from "./components/Navbar";
import AddProfilePage from "./pages/AddProfilePage";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import ProfileDetailPage from "./pages/ProfileDetailPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import ProfileIndexPage from "./pages/ProfileIndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage"; // ✅ Import ChatPage

import { HashRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const mode = useSelector((state) => state.mode.value);
  const LazyComponent = lazy(() => import("./pages/ProfileDetailPage"));

  return (
    <HashRouter>
      <header>
        <Navbar />
      </header>
      <main className={mode === "light" ? "light" : "dark"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/add-profile"
            element={
              <ProtectedRoute>
                <AddProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/profile/:id" element={<ProfileIndexPage />}>
            <Route
              index
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <LazyComponent />
                </Suspense>
              }
            />
            <Route
              path="edit"
              element={
                <ProtectedRoute>
                  <ProfileEditPage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </HashRouter>
  );
};

export default App;
