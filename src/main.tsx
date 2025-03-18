import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import {BrowserRouter} from "react-router";
import "./styles/tailwind.css";
import AllContext from "./context/AllContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<AllContext>
				<App />
			</AllContext>
		</BrowserRouter>
	</StrictMode>
);
