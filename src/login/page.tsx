import isValidTelegramHash, { TelegramUser } from "@/lib/isValidTelegramHash";
import TelegramLoginButton from "./components/telegram-bot-button";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleTelegramAuth = (receivedUser: TelegramUser) => {
    console.log("log: ", receivedUser);
    setLoading(true);
    if (isValidTelegramHash(receivedUser, import.meta.env.VITE_BOT_TOKEN)) {
      navigate("/wizard/one");
      return;
    }
    navigate("/error");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {loading ? (
        <div className="bg-[#54a9eb] rounded-3xl w-44 h-10 flex justify-center items-center">
          <Loader2 className="animate-spin text-white" />
        </div>
      ) : (
        <TelegramLoginButton
          botName={import.meta.env.VITE_BOT_NAME}
          onAuth={handleTelegramAuth}
          buttonSize="large"
          cornerRadius={24}
          requestAccess="write"
        />
      )}
    </div>
  );
};

export default LoginPage;
