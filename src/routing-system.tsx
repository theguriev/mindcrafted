import { FC, lazy } from "react";
import { BrowserRouter, Routes, Navigate, Route } from "react-router";
import Providers from "./providers";
import MainLayout from "./components/main-layout";
import SimpleLayout from "./components/simple-page-layout";
import PrivateBoundary from "./components/private-boundary";

const LoginPage = lazy(() => import("./login/page"));
const DashboardPage = lazy(() => import("./page"));
const StepsPage = lazy(() => import("./steps/page"));
const ErrorPage = lazy(() => import("./error/page"));
const WizardRoutes = lazy(() => import("./wizard-routes"));
const WelcomePage = lazy(() => import("./welcome/page"));
const WeightPage = lazy(() => import("./weight/page"));
const ShoulderPage = lazy(() => import("./shoulder/page"));
const ChestPage = lazy(() => import("./chest/page"));
const WaistPage = lazy(() => import("./waist/page"));
const HipsPage = lazy(() => import("./hips/page"));
const HipPage = lazy(() => import("./hip/page"));
const NutritionPage = lazy(() => import("./nutrition/page"));
const ExercisePage = lazy(() => import("./exercise/page"));

const RoutingSystem: FC = () => {
  return (
    <BrowserRouter>
      <Providers>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <MainLayout title="Головна">
                <DashboardPage />
              </MainLayout>
            }
          />
          <Route
            path="/steps"
            element={
              <SimpleLayout title="Кроки">
                <StepsPage />
              </SimpleLayout>
            }
          />
          <Route
            path="/weight"
            element={
              <PrivateBoundary>
                <SimpleLayout title="Вага">
                  <WeightPage />
                </SimpleLayout>
              </PrivateBoundary>
            }
          />
          <Route
            path="/shoulder"
            element={
              <SimpleLayout title="Обхват плеча">
                <ShoulderPage />
              </SimpleLayout>
            }
          />
          <Route
            path="/chest"
            element={
              <SimpleLayout title="Обхват грудей">
                <ChestPage />
              </SimpleLayout>
            }
          />
          <Route
            path="/waist"
            element={
              <SimpleLayout title="Обхват талії">
                <WaistPage />
              </SimpleLayout>
            }
          />
          <Route
            path="/hips"
            element={
              <SimpleLayout title="Обхват стегон">
                <HipsPage />
              </SimpleLayout>
            }
          />
          <Route
            path="/hip"
            element={
              <SimpleLayout title="Обхват стегна">
                <HipPage />
              </SimpleLayout>
            }
          />
          <Route
            path="/nutrition"
            element={
              <SimpleLayout title="Харчування">
                <NutritionPage />
              </SimpleLayout>
            }
          />
          <Route
            path="/exercise"
            element={
              <SimpleLayout title="Тренування">
                <ExercisePage />
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
