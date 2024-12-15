import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use local storage as default
import { combineReducers } from "redux";
import userReducer from "./slices/userSlice";
import filterReducer from "./slices/filterSlices"
import dataReducer from "./slices/dataSlices"
import refreshReducer from "./slices/refreshSlice"

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // State to persist
};

// Combine reducers (if you have multiple slices)
const rootReducer = combineReducers({
  user: userReducer,
  filter: filterReducer,
  data: dataReducer,
  refresh:refreshReducer
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Create persistor
const persistor = persistStore(store);

// Export types for usage in the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
