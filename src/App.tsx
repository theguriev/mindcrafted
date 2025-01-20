import { useState } from "react";
import TelegramLoginButton from "./components/telegram-bot-button";
import isValidTelegramHash, { TelegramUser } from "@/lib/isValidTelegramHash";

function App() {
  const [user, setUser] = useState<TelegramUser>();
  const handleTelegramAuth = (receivedUser: TelegramUser) => {
    console.log("log: ", receivedUser);
    setUser(receivedUser);
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
      {isValidTelegramHash(user, import.meta.env.VITE_BOT_TOKEN) ? "OK" : "NO"}
    </div>
  );
}

export default App;
