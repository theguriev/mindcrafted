import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import RoutingSystem from "./routing-system";

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <Loader2 className="animate-spin" />
        </div>
      }
    >
      <RoutingSystem />
    </Suspense>
  );
};

export default App;
