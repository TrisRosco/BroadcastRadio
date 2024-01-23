import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.css";
import { ThemeProvider } from "@fluentui/react";
import { getTheme } from "@fluentui/react";

import Artist from "./artist";
import Artists from "./artists";

const theme = getTheme();

export default function App() {
  return (
    <>
      <ThemeProvider>
        <div className="card" style={{ boxShadow: theme.effects.elevation8 }}>
          <div className="header">
            <h1 className="app_name">Artist Management</h1>
          </div>

          <BrowserRouter>
            <Routes>
              <Route element={<Artist />} path="/artists/:id" />
              <Route element={<Artists />} path="/" />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </>
  );
}
