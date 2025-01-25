import { Loader2 } from "lucide-react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Navigate, Route } from "react-router";

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

const App = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-white">
            <Loader2 className="animate-spin" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/wizard/one" element={<OnePage />} />
          <Route path="/wizard/two" element={<TwoPage />} />
          <Route path="/wizard/three" element={<ThreePage />} />
          <Route path="/wizard/four" element={<FourPage />} />
          <Route path="/wizard/five" element={<FivePage />} />
          <Route path="/wizard/six" element={<SixPage />} />
          <Route path="/wizard/seven" element={<SevenPage />} />
          <Route path="/wizard/eight" element={<EightPage />} />
          <Route path="/wizard/nine" element={<NinePage />} />
          <Route path="/wizard/ten" element={<TenPage />} />
          <Route path="/wizard/eleven" element={<ElevenPage />} />
          <Route path="/wizard/twelve" element={<TwelvePage />} />
          <Route path="/wizard/thirteen" element={<ThirteenPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
