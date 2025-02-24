import { FC, lazy } from "react";
import { BrowserRouter, Routes, Navigate, Route } from "react-router";
import Providers from "./providers";
import MainLayout from "./components/main-layout";
import SimpleLayout from "./components/simple-page-layout";

const LoginPage = lazy(() => import("./login/page"));
const DashboardPage = lazy(() => import("./dashboard/page"));
const StepsPage = lazy(() => import("./dashboard/steps/page"));
const ErrorPage = lazy(() => import("./error/page"));
const WizardRoutes = lazy(() => import("./wizard-routes"));
const WelcomePage = lazy(() => import("./welcome/page"));
const WeightPage = lazy(() => import("./dashboard/weight/page"));

const RoutingSystem: FC = () => {
  return (
    <BrowserRouter>
      <Providers>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <MainLayout title="Головна">
                <DashboardPage />
              </MainLayout>
            }
          />
          <Route
            path="/dashboard/steps"
            element={
              <SimpleLayout title="Кроки">
                <StepsPage />
              </SimpleLayout>
            }
          />
          <Route
            path="/dashboard/weight"
            element={
              <SimpleLayout title="Вага">
                <WeightPage />
              </SimpleLayout>
            }
          />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/*" element={<WizardRoutes />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Providers>
    </BrowserRouter>
  );
};

export default RoutingSystem;
