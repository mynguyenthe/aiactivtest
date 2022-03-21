import { compose, createStore, applyMiddleware } from "redux"
import { createLogger } from "redux-logger"
import storage from "redux-persist/lib/storage"
import { persistStore, persistReducer } from "redux-persist"
import thunkMiddleware from "redux-thunk"
import rootReducer from "./rootReducer"

const loggerMiddleware = createLogger()

const persistConfig = { key: "root", storage }
// Middleware: Redux Persist Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store: any = createStore(persistedReducer, undefined, compose(applyMiddleware(thunkMiddleware), applyMiddleware(loggerMiddleware)))

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persist = persistStore(store)

export default store
