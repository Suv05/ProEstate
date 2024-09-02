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

//react query tanstack
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./components/routes/App.jsx";
import Home from "./components/pages/Home.jsx";
import About from "./components/pages/About.jsx";
import Signup from "./components/pages/Signup.jsx";
import Signin from "./components/pages/Signin.jsx";
import Protected from "./components/routes/Protected.jsx";
import Createlistings from "./components/User-Page/Createlistings.jsx";
import Viewlistings from "./components/User-Page/Viewlistings.jsx";
import Account from "./components/User-Page/Account.jsx";
import Listingitem from "./components/User-Page/Listingitem.jsx";
import Listings from "./components/Listings-UI/Listings.jsx";
import SingleList from "./components/Listings-UI/SingleList.jsx";
import Favorite from "./components/pages/Favorite.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="signup" element={<Signup />} />
      <Route path="signin" element={<Signin />} />

      <Route element={<Protected />}>
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:id" element={<SingleList />} />
        <Route path="/listings/favorite" element={<Favorite />} />
        <Route path="/account" element={<Account />} />
        <Route path="/new" element={<Createlistings />} />
        <Route path="/yourestate" element={<Viewlistings />} />
        <Route path="/yourestate/:listingId" element={<Listingitem />} />
      </Route>
    </Route>
  )
);

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* PersistGate delays rendering until the persisted state is rehydrated */}
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
