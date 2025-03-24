import { Route, Routes, useNavigate } from "react-router";
import { FC } from "react";
import PrivateBoundary from "./components/private-boundary";
import useUpdateMetaMutate from "./hooks/useUpdateMetaMutate";
import { FieldValues } from "react-hook-form";
import routes from "./constants/routes";

const WizardRoutes: FC = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useUpdateMetaMutate();

  const createSubmitHandle =
    (index: number) => (body: { meta: FieldValues }) => {
      const routesList =
        body.meta.sex === "male" ? routes.slice(0, routes.length - 2) : routes;
      const path = routesList[index + 1]?.[0] || "/welcome";
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
