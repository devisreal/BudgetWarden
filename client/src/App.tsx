import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./features/auth/contexts/auth-context";
import AuthLayout from "./layouts/auth-layout";
import DashboardLayout from "./layouts/dashboard-layout";
import HomePage from "./pages/home-page";
import NotFoundPage from "./pages/not-found-page";
import LoginPage from "./features/auth/pages/login-page";
import RegisterPage from "./features/auth/pages/register-page";
import BillsPage from "./features/bills/pages/bills-page";
import BudgetsPage from "./features/budgets/pages/budgets-page";
import DashboardPage from "./features/dashboard/pages/dashboard-page";
import EditProfilePage from "./features/profile/pages/edit-profile-page";
import ProfilePage from "./features/profile/pages/profile-page";
import SubscriptionsPage from "./features/subscriptions/pages/subscriptions-page";

function App() {
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
              <Route path="profile/edit" element={<EditProfilePage />} />
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
