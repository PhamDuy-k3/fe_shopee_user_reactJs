import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.scss";
import reportWebVitals from "./reportWebVitals";
import { App } from "./views/App";
import store from "./redux/store";
import { Provider } from "react-redux";
// import ReduxCounter from "./redux";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      {/* <ReduxCounter /> */}
      <App />
    </React.StrictMode>
  </Provider>
);
reportWebVitals();
