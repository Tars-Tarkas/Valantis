import React from "react";
import "./App.css";
import { Cards } from "./components/Cards";
import ThemeProvider from "react-bootstrap/ThemeProvider";

const App: React.FC = () => {
  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <Cards />
    </ThemeProvider>
  );
};

export default App;
