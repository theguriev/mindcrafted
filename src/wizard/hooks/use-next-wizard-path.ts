import { routesMap, ignoreForMaleRoutes } from "@/constants/routes";
import { useLocation } from "react-router";
import useMeQuery from "../../hooks/use-me-query";
import { useMemo } from "react";

const useNextWizardPath = () => {
  const { data } = useMeQuery();
  const { pathname } = useLocation();
  const isMale = useMemo(() => data.meta?.sex === "male", [data]);
  const nextPath = useMemo(() => {
    const nextPathCandidate = String(
      routesMap.get(pathname)?.nextKey || "/welcome"
    );
    if (isMale && ignoreForMaleRoutes.has(nextPathCandidate)) {
      return "/welcome";
    }
    return nextPathCandidate;
  }, [pathname, isMale]);
  return nextPath;
};

export default useNextWizardPath;
