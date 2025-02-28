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
const ShoulderPage = lazy(() => import("./dashboard/shoulder/page"));
const ChestPage = lazy(() => import("./dashboard/chest/page"));
const WaistPage = lazy(() => import("./dashboard/waist/page"));
const HipsPage = lazy(() => import("./dashboard/hips/page"));
const HipPage = lazy(() => import("./dashboard/hip/page"));
const NutritionPage = lazy(() => import("./dashboard/nutrition/page"));
const ExercisePage = lazy(() => import("./dashboard/exercise/page"));

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
          <Route
            path="/dashboard/shoulder"
            element={
              <SimpleLayout title="Обхват плеча">
                <ShoulderPage />
              </SimpleLayout>
            }
          />
          <Route
            path="/dashboard/chest"
            element={
              <SimpleLayout title="Обхват грудей">
                <ChestPage />
              </SimpleLayout>
            }
          />
          <Route
            path="/dashboard/waist"
            element={
              <SimpleLayout title="Обхват талії">
                <WaistPage />
              </SimpleLayout>
            }
          />
          <Route
            path="/dashboard/hips"
            element={
              <SimpleLayout title="Обхват стегон">
                <HipsPage />
              </SimpleLayout>
            }
          />
          <Route
            path="/dashboard/hip"
            element={
              <SimpleLayout title="Обхват стегна">
                <HipPage />
              </SimpleLayout>
            }
          />
          <Route
            path="/dashboard/nutrition"
            element={
              <SimpleLayout title="Харчування">
                <NutritionPage />
              </SimpleLayout>
            }
          />
          <Route
            path="/dashboard/exercise"
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
