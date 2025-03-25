import useMeQuery from "@/hooks/use-me-query";
import { FC, PropsWithChildren } from "react";

const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
  useMeQuery();
  return children;
};

export default PrivateRoute;
