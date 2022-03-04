import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";
import Popup from "./components/Popup";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Popup />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
