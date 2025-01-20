import type { FC } from "react";
import { useEffect, useRef } from "react";

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

declare global {
  interface Window {
    TelegramLoginWidget: {
      dataOnauth: (user: TelegramUser) => void;
    };
  }
}

const TelegramLoginButton: FC<{
  botName: string;
  onAuth: (user: TelegramUser) => void;
  buttonSize?: "large" | "medium" | "small";
  cornerRadius?: number;
  requestAccess?: "write" | "read";
}> = ({
  botName,
  onAuth,
  buttonSize = "large",
  cornerRadius,
  requestAccess = "write",
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.TelegramLoginWidget = {
      dataOnauth: (user: TelegramUser) => onAuth(user),
    };

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", botName);
    script.setAttribute("data-size", buttonSize);
    if (cornerRadius !== undefined) {
      script.setAttribute("data-radius", cornerRadius.toString());
    }
    script.setAttribute("data-onauth", "TelegramLoginWidget.dataOnauth(user)");
    script.setAttribute("data-request-access", requestAccess);
    script.async = true;

    buttonRef.current?.appendChild(script);

    return () => {
      buttonRef.current?.removeChild(script);
    };
  }, [botName, onAuth, buttonSize, cornerRadius, requestAccess]);

  return <div ref={buttonRef}></div>;
};

export default TelegramLoginButton;
