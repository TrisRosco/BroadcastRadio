import { createRoot } from "react-dom/client";
import { initializeIcons } from "@fluentui/font-icons-mdl2";

import App from "./app";

initializeIcons();

export * from "./app";

createRoot(document.querySelector("#root")).render(<App />);
