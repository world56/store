import userReducer from "./user";
import systemReducer from "./system";
import sagaRuning from "./middleware";
import categoryReducer from "./category";
import createSagaMiddleware from "redux-saga";
import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    system: systemReducer,
    category: categoryReducer,
  },
  middleware: new MiddlewareArray().concat(sagaMiddleware),
});

sagaMiddleware.run(sagaRuning);

export default store;
