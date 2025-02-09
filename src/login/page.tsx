import { TelegramUser } from "@/lib/isValidTelegramHash";
import TelegramLoginButton from "./components/telegram-bot-button";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { api } from "@/lib/openapi/apiClient";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleTelegramAuth = async (receivedUser: TelegramUser) => {
    setLoading(true);
    const request = await api.telegramAuthorization("/login", "post", {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        id: receivedUser.id,
        firstName: receivedUser.first_name,
        lastName: receivedUser.last_name || "",
        username: receivedUser.username || "",
        photoUrl: receivedUser.photo_url || "",
        authDate: receivedUser.auth_date,
        hash: receivedUser.hash,
      },
    });
    if (request.status === 200) {
      navigate("/wizard/zero");
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
