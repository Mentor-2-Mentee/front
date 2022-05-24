import { useState } from "react";
import { TopNavigation } from "./components/TopNavigation";
import { Route, Routes } from "react-router-dom";
import { IntroPage } from "./components/IntroPage";
import { MainPage } from "./components/MainPage";

export const App = (): JSX.Element => {
  return (
    <div className="App">
      <TopNavigation />

      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </div>
  );
};

export default App;
