import isValidTelegramHash, { TelegramUser } from "@/lib/isValidTelegramHash";
import TelegramLoginButton from "./components/telegram-bot-button";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const navigate = useNavigate();
  const handleTelegramAuth = (receivedUser: TelegramUser) => {
    if (isValidTelegramHash(receivedUser, import.meta.env.VITE_BOT_TOKEN)) {
      navigate("/wizard/one");
      return;
    }
    navigate("/error");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <TelegramLoginButton
        botName="mindcrafted_bot"
        onAuth={handleTelegramAuth}
        buttonSize="large"
        cornerRadius={20}
        requestAccess="write"
      />
    </div>
  );
};

export default LoginPage;
