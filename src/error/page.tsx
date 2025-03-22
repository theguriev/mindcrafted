import type React from "react";
import { Link } from "react-router";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  title?: string;
  description?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  title = "Сторінку не знайдено",
  description = "Нажаль, ми не змогли знайти сторінку, яку ви шукаєте.",
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="max-w-md w-full">
        <div className="flex justify-center mb-6">
          <h1 className="text-8xl font-bold text-black">404</h1>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-medium mb-2">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="flex justify-center">
          <Button asChild className="w-full max-w-xs">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              На головну
            </Link>
          </Button>
        </div>

        <div className="mt-6 text-center">
          <Button variant="link" asChild>
            <Link
              to="#"
              onClick={() => window.history.back()}
              className="text-muted-foreground flex items-center justify-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Повернутися назад
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
