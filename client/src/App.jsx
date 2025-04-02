import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import LoginPage from "./pages/auth/Login/LoginPage";
import RegisterPage from "./pages/auth/Register/RegisterPage";
import BillsPage from "./pages/user/BillsPage/BillsPage";
import BudgetsPage from "./pages/user/BudgetsPage/BudgetsPage";
import DashboardPage from "./pages/user/DashboardPage/DashboardPage";
import ProfilePage from "./pages/user/ProfilePage/ProfilePage";
import SubscriptionsPage from "./pages/user/SubscriptionsPage/SubscriptionsPage";
import { validateAuth } from "./utils/api";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <AuthProvider>
      <div className="">
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<HomePage />} />

            <Route path="/auth" element={<AuthLayout />}>
              <Route index path="register" element={<RegisterPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/not-found" replace />} />
            </Route>

            <Route path="/user" element={<DashboardLayout />}>
              <Route index path="dashboard" element={<DashboardPage />} />
              <Route path="bills" element={<BillsPage />} />
              <Route path="budgets" element={<BudgetsPage />} />
              <Route path="subscriptions" element={<SubscriptionsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="*" element={<Navigate to="/not-found" replace />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
