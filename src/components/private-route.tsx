import { useMeSuspenseQuery } from "@/hooks/useMeQuery";
import { FC, PropsWithChildren } from "react";

const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
  useMeSuspenseQuery();
  return children;
};

export default PrivateRoute;
