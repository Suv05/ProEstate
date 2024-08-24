//import of dependecies
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

//redux dependencies
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./components/redux/store.js";

import App from "./components/routes/App.jsx";
import Home from "./components/pages/Home.jsx";
import Signup from "./components/pages/Signup.jsx";
import Signin from "./components/pages/Signin.jsx";
import Protected from "./components/routes/Protected.jsx";
import Createlistings from "./components/User-Page/Createlistings.jsx";
import Account from "./components/User-Page/Account.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="signup" element={<Signup />} />
      <Route path="signin" element={<Signin />} />
      <Route element={<Protected />}>
        <Route path="account" element={<Account />} />
        <Route path="new" element={<Createlistings />} />
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* PersistGate delays rendering until the persisted state is rehydrated */}
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
