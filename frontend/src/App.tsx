import { useState } from "react";
import "./App.css";
import ToggleButton from "./components/toggle-button";

function App() {
  return (
    <div className="max-w-5xl mx-auto h-screen">
      <div className="flex justify-center items-center flex-col gap-8 h-full">
        <ToggleButton />
      </div>
    </div>
  );
}

export default App;
