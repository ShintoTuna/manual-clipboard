import { render } from "react-dom";
import { StateProvider } from "./State";
import App from "./App";

const rootElement = document.getElementById("root");
render(
  <StateProvider>
    <App />
  </StateProvider>,
  rootElement
);
