import "./App.css";
import ToggleButton from "./components/toggle-button";
import ChangeThemeToggle from "./components/change-theme-button";
import CountButton from "./components/count-button";

function App() {
  return (
    <div className="max-w-5xl mx-auto h-screen">
      <ChangeThemeToggle />
      <div className="flex justify-center items-center flex-col gap-8 h-full">
        <ToggleButton />
        <CountButton />
      </div>
    </div>
  );
}

export default App;
