import { FC, lazy } from "react";
import { BrowserRouter, Routes, Navigate, Route } from "react-router";
import PrivateBoundary from "./components/private-boundary";
import Providers from "./providers";

const LoginPage = lazy(() => import("./login/page"));
const DashboardPage = lazy(() => import("./dashboard/page"));
const ErrorPage = lazy(() => import("./error/page"));
const OnePage = lazy(() => import("./wizard/one/page"));
const TwoPage = lazy(() => import("./wizard/two/page"));
const ThreePage = lazy(() => import("./wizard/three/page"));
const FourPage = lazy(() => import("./wizard/four/page"));
const FivePage = lazy(() => import("./wizard/five/page"));
const SixPage = lazy(() => import("./wizard/six/page"));
const SevenPage = lazy(() => import("./wizard/seven/page"));
const EightPage = lazy(() => import("./wizard/eight/page"));
const NinePage = lazy(() => import("./wizard/nine/page"));
const TenPage = lazy(() => import("./wizard/ten/page"));
const ElevenPage = lazy(() => import("./wizard/eleven/page"));
const TwelvePage = lazy(() => import("./wizard/twelve/page"));
const ThirteenPage = lazy(() => import("./wizard/thirteen/page"));
const FourteenPage = lazy(() => import("./wizard/fourteen/page"));
const FifteenPage = lazy(() => import("./wizard/fifteen/page"));
const SixteenPage = lazy(() => import("./wizard/sixteen/page"));
const SeventeenPage = lazy(() => import("./wizard/seventeen/page"));
const EighteenPage = lazy(() => import("./wizard/eighteen/page"));
const NineteenPage = lazy(() => import("./wizard/nineteen/page"));
const TwentyPage = lazy(() => import("./wizard/twenty/page"));

const RoutingSystem: FC = () => {
  return (
    <BrowserRouter>
      <Providers>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route
            path="/wizard/one"
            element={
              <PrivateBoundary>
                <OnePage />
              </PrivateBoundary>
            }
          />
          <Route
            path="/wizard/two"
            element={
              <PrivateBoundary>
                <TwoPage />
              </PrivateBoundary>
            }
          />
          <Route
            path="/wizard/three"
            element={
              <PrivateBoundary>
                <ThreePage />
              </PrivateBoundary>
            }
          />
          <Route
            path="/wizard/four"
            element={
              <PrivateBoundary>
                <FourPage />
              </PrivateBoundary>
            }
          />
          <Route
            path="/wizard/five"
            element={
              <PrivateBoundary>
                <FivePage />
              </PrivateBoundary>
            }
          />
          <Route
            path="/wizard/six"
            element={
              <PrivateBoundary>
                <SixPage />
              </PrivateBoundary>
            }
          />
          <Route
            path="/wizard/seven"
            element={
              <PrivateBoundary>
                <SevenPage />
              </PrivateBoundary>
            }
          />
          <Route
            path="/wizard/eight"
            element={
              <PrivateBoundary>
                <EightPage />
              </PrivateBoundary>
            }
          />
          <Route
            path="/wizard/nine"
            element={
              <PrivateBoundary>
                <NinePage />
              </PrivateBoundary>
            }
          />
          <Route
            path="/wizard/ten"
            element={
              <PrivateBoundary>
                <TenPage />
              </PrivateBoundary>
            }
          />
          <Route
            path="/wizard/eleven"
            element={
              <PrivateBoundary>
                <ElevenPage />
              </PrivateBoundary>
            }
          />
          <Route
            path="/wizard/twelve"
            element={
              <PrivateBoundary>
                <TwelvePage />
              </PrivateBoundary>
            }
          />
          <Route
            path="/wizard/thirteen"
            element={
              <PrivateBoundary>
                <ThirteenPage />
              </PrivateBoundary>
            }
          />
          <Route
            path="/wizard/fourteen"
            element={
              <PrivateBoundary>
                <FourteenPage />
              </PrivateBoundary>
            }
          />
          <Route
            path="/wizard/fifteen"
            element={
              <PrivateBoundary>
                <FifteenPage />
              </PrivateBoundary>
            }
          />
          <Route
            path="/wizard/sixteen"
            element={
              <PrivateBoundary>
                <SixteenPage />
              </PrivateBoundary>
            }
          />
          <Route
            path="/wizard/seventeen"
            element={
              <PrivateBoundary>
                <SeventeenPage />
              </PrivateBoundary>
            }
          />
          <Route
            path="/wizard/eighteen"
            element={
              <PrivateBoundary>
                <EighteenPage />
              </PrivateBoundary>
            }
          />
          <Route
            path="/wizard/nineteen"
            element={
              <PrivateBoundary>
                <NineteenPage />
              </PrivateBoundary>
            }
          />
          <Route
            path="/wizard/twenty"
            element={
              <PrivateBoundary>
                <TwentyPage />
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
