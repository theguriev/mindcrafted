import { Loader2 } from "lucide-react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Navigate, Route } from "react-router";

const LoginPage = lazy(() => import("./login/page"));
const DashboardPage = lazy(() => import("./dashboard/page"));
const ErrorPage = lazy(() => import("./error/page"));
const OnePage = lazy(() => import("./wizard/one/page"));
const TwoPage = lazy(() => import("./wizard/two/page"));

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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
