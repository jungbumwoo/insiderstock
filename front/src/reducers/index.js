import { combineReducers } from "redux";
import stockReducer from "./stockReducer";
import savedReducer from "./savedReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    stock: stockReducer,
    saved: savedReducer,
    auth: authReducer
});

export default rootReducer;