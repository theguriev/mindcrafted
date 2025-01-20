import TelegramLoginButton from "./components/telegram-bot-button";

function App() {
  const handleTelegramAuth = (user: any) => {
    console.log("Authenticated user:", user);
    // Here you would typically send this data to your server
    // to verify the authentication and create a session
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
}

export default App;
