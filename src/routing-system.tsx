import { FC, lazy } from "react";
import { BrowserRouter, Routes, Navigate, Route } from "react-router";
import Providers from "./providers";
import MainLayout from "./components/main-layout";
import PrivateBoundary from "./components/private-boundary";
import routes from "./constants/routes";

const LoginPage = lazy(() => import("./login/page"));
const DashboardPage = lazy(() => import("./page"));
const StepsPage = lazy(() => import("./steps/page"));
const ErrorPage = lazy(() => import("./error/page"));
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
                <MainLayout title="Кроки" backTrigger>
                  <StepsPage />
                </MainLayout>
              </PrivateBoundary>
            }
          />
          <Route
            path="/weight"
            element={
              <PrivateBoundary>
                <MainLayout title="Вага" backTrigger>
                  <WeightPage />
                </MainLayout>
              </PrivateBoundary>
            }
          />
          <Route
            path="/shoulder"
            element={
              <PrivateBoundary>
                <MainLayout title="Обхват плеча" backTrigger>
                  <ShoulderPage />
                </MainLayout>
              </PrivateBoundary>
            }
          />
          <Route
            path="/chest"
            element={
              <PrivateBoundary>
                <MainLayout title="Обхват грудей" backTrigger>
                  <ChestPage />
                </MainLayout>
              </PrivateBoundary>
            }
          />
          <Route
            path="/waist"
            element={
              <PrivateBoundary>
                <MainLayout title="Обхват талії" backTrigger>
                  <WaistPage />
                </MainLayout>
              </PrivateBoundary>
            }
          />
          <Route
            path="/hips"
            element={
              <PrivateBoundary>
                <MainLayout title="Обхват стегон" backTrigger>
                  <HipsPage />
                </MainLayout>
              </PrivateBoundary>
            }
          />
          <Route
            path="/hip"
            element={
              <PrivateBoundary>
                <MainLayout title="Обхват стегна" backTrigger>
                  <HipPage />
                </MainLayout>
              </PrivateBoundary>
            }
          />
          <Route
            path="/nutrition"
            element={
              <PrivateBoundary>
                <MainLayout title="Харчування" backTrigger>
                  <NutritionPage />
                </MainLayout>
              </PrivateBoundary>
            }
          />
          <Route
            path="/exercise"
            element={
              <PrivateBoundary>
                <MainLayout title="Тренування" backTrigger>
                  <ExercisePage />
                </MainLayout>
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
          <Route
            path="/*"
            element={
              <Routes>
                {routes.map(([path, Component]) => (
                  <Route
                    key={String(path)}
                    path={String(path)}
                    element={
                      <PrivateBoundary>
                        <Component />
                      </PrivateBoundary>
                    }
                  />
                ))}
              </Routes>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Providers>
    </BrowserRouter>
  );
};

export default RoutingSystem;
