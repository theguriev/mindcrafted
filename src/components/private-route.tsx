import useMeQuery from "@/hooks/useMeQuery";
import { FC, PropsWithChildren } from "react";

const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
  useMeQuery();
  return children;
};

export default PrivateRoute;
