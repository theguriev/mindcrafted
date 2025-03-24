import { Route, Routes } from "react-router";
import { FC } from "react";
import PrivateBoundary from "./components/private-boundary";
import routes from "./constants/routes";

const WizardRoutes: FC = () => {
  return (
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
  );
};

export default WizardRoutes;
