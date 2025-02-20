import { Route, Routes, useNavigate } from "react-router";
import { FC, lazy } from "react";
import PrivateBoundary from "./components/private-boundary";
import useUpdateMetaMutate from "./hooks/useUpdateMetaMutate";
import { FieldValues } from "react-hook-form";

const ZeroPage = lazy(() => import("./wizard/zero/page"));
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

const routes = [
  ["/wizard/zero", ZeroPage],
  ["/wizard/one", OnePage],
  ["/wizard/two", TwoPage],
  ["/wizard/three", ThreePage],
  ["/wizard/four", FourPage],
  ["/wizard/five", FivePage],
  ["/wizard/six", SixPage],
  ["/wizard/seven", SevenPage],
  ["/wizard/eight", EightPage],
  ["/wizard/nine", NinePage],
  ["/wizard/ten", TenPage],
  ["/wizard/eleven", ElevenPage],
  ["/wizard/twelve", TwelvePage],
  ["/wizard/thirteen", ThirteenPage],
  ["/wizard/fourteen", FourteenPage],
  ["/wizard/fifteen", FifteenPage],
  ["/wizard/sixteen", SixteenPage],
  ["/wizard/seventeen", SeventeenPage],
  ["/wizard/eighteen", EighteenPage],
  ["/wizard/nineteen", NineteenPage],
  ["/wizard/twenty", TwentyPage],
] as const;

const WizardRoutes: FC = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useUpdateMetaMutate();

  const createSubmitHandle =
    (index: number) => (body: { meta: FieldValues }) => {
      const routesList =
        body.meta.sex === "male" ? routes.slice(0, routes.length - 2) : routes;
      const path = routesList[index + 1]?.[0] || "/";
      mutate(
        {
          headers: { "Content-type": "application/json" },
          body,
        },
        {
          onSuccess: () => {
            navigate(path);
          },
        }
      );
    };
  return (
    <Routes>
      {routes.map(([path, Component], index) => (
        <Route
          key={path}
          path={path}
          element={
            <PrivateBoundary>
              <Component
                pending={isPending}
                onSubmit={createSubmitHandle(index)}
              />
            </PrivateBoundary>
          }
        />
      ))}
    </Routes>
  );
};

export default WizardRoutes;
