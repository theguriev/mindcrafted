import { FC, PropsWithChildren } from "react";
import BackTrigger from "./back-trigger";

const SimpleLayout: FC<PropsWithChildren<{ title: string }>> = ({
  children,
  title,
}) => {
  return (
    <div>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
        <BackTrigger className="-ml-1" />
        <h1 className="text-xl font-semibold">{title}</h1>
      </header>
      {children}
    </div>
  );
};

export default SimpleLayout;
