import { FC, PropsWithChildren, Suspense } from "react";
import { PrivateErrorBoundary } from "./private-error-boundary";
import { Loader2 } from "lucide-react";

const PrivateBoundary: FC<PropsWithChildren> = ({ children }) => {
  return (
    <PrivateErrorBoundary>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-white">
            <Loader2 className="animate-spin" />
          </div>
        }
      >
        {children}
      </Suspense>
    </PrivateErrorBoundary>
  );
};

export default PrivateBoundary;
