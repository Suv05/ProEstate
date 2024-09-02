import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; //defaults to localStorage for web
import userReducer from "./user/userSlice.js";

// Configuration for redux-persist
const persistConfig = {
  key: "root", // The key for the persisted data (root for the whole store)
  storage, // The storage engine (localStorage by default)
  whitelist: ["user"], // Specify which reducers to persist
  version: 1,
};

// Combine your reducers (if you have multiple slices)
const rootReducer = combineReducers({
  user: userReducer, // Add your slices here
});

//Persist the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create a persistor instance
export const persistor = persistStore(store);
export default store;
