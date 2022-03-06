import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import Popup from "./components/Popup";

ReactDOM.render(
  <Provider store={store}>
      <App />
      <Popup />
  </Provider>,
  document.getElementById("root")
);
