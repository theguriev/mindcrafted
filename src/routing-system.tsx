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
              <PrivateBoundary>
                <MainLayout title="Головна">
                  <DashboardPage />
                </MainLayout>
              </PrivateBoundary>
            }
          />
          <Route
            path="/steps"
            element={
              <PrivateBoundary>
                <SimpleLayout title="Кроки">
                  <StepsPage />
                </SimpleLayout>
              </PrivateBoundary>
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
              <PrivateBoundary>
                <SimpleLayout title="Обхват плеча">
                  <ShoulderPage />
                </SimpleLayout>
              </PrivateBoundary>
            }
          />
          <Route
            path="/chest"
            element={
              <PrivateBoundary>
                <SimpleLayout title="Обхват грудей">
                  <ChestPage />
                </SimpleLayout>
              </PrivateBoundary>
            }
          />
          <Route
            path="/waist"
            element={
              <PrivateBoundary>
                <SimpleLayout title="Обхват талії">
                  <WaistPage />
                </SimpleLayout>
              </PrivateBoundary>
            }
          />
          <Route
            path="/hips"
            element={
              <PrivateBoundary>
                <SimpleLayout title="Обхват стегон">
                  <HipsPage />
                </SimpleLayout>
              </PrivateBoundary>
            }
          />
          <Route
            path="/hip"
            element={
              <PrivateBoundary>
                <SimpleLayout title="Обхват стегна">
                  <HipPage />
                </SimpleLayout>
              </PrivateBoundary>
            }
          />
          <Route
            path="/nutrition"
            element={
              <PrivateBoundary>
                <SimpleLayout title="Харчування">
                  <NutritionPage />
                </SimpleLayout>
              </PrivateBoundary>
            }
          />
          <Route
            path="/exercise"
            element={
              <PrivateBoundary>
                <SimpleLayout title="Тренування">
                  <ExercisePage />
                </SimpleLayout>
              </PrivateBoundary>
            }
          />
          <Route path="/error" element={<ErrorPage />} />
          <Route
            path="/welcome"
            element={
              <PrivateBoundary>
                <WelcomePage />
              </PrivateBoundary>
            }
          />
          <Route path="/*" element={<WizardRoutes />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Providers>
    </BrowserRouter>
  );
};

export default RoutingSystem;
