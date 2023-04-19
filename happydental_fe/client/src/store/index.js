import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import loginSlice from "../slices/loginSlice";
import registerSilce from "../slices/registerSlice";
import userSlice from "../slices/userSlice";

const rootReducer = combineReducers({
    login: loginSlice,
    register: registerSilce,
    user: userSlice
});

const persistConfig = {
    key: 'user',
    storage: storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export let persistor = persistStore(store);