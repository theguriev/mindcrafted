import { FC, lazy } from "react";
import { BrowserRouter, Routes, Navigate, Route } from "react-router";
import Providers from "./providers";
import PrivateBoundary from "./components/private-boundary";

const LoginPage = lazy(() => import("./login/page"));
const DashboardPage = lazy(() => import("./dashboard/page"));
const ErrorPage = lazy(() => import("./error/page"));
const WizardPage = lazy(() => import("./wizard/page"));

const RoutingSystem: FC = () => {
  return (
    <BrowserRouter>
      <Providers>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route
            path="/wizard/:step"
            element={
              <PrivateBoundary>
                <WizardPage />
              </PrivateBoundary>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Providers>
    </BrowserRouter>
  );
};

export default RoutingSystem;
