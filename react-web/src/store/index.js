import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import memberReducer from "./reducers/member";
import employReducer from "./reducers/employ";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { loadingBarReducer } from "react-redux-loading-bar";
import { createStateSyncMiddleware , initMessageListener } from "redux-state-sync";

const authPersistconfig = { key: "auth", storage };
const memberPersistconfig = { key: "member", storage };
const employPersistconfig = { key: "employ", storage };

const syncConfig = {
    blacklist: ["persist/PERSIST"],
}
const rootReducer = combineReducers({
    auth: persistReducer(authPersistconfig, authReducer),
    member: persistReducer(memberPersistconfig, memberReducer),
    employ: persistReducer(employPersistconfig, employReducer),
    loadingBar : loadingBarReducer,
});
const store = configureStore({  
    reducer: rootReducer,
    middleware: [thunk, createStateSyncMiddleware(syncConfig)],
});

initMessageListener(store);
export default store;
export const persistor = persistStore(store);