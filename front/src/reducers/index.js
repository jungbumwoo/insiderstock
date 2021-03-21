import { combineReducers } from "redux";
import stockReducer from "./stockReducer";
import savedReducer from "./savedReducer";

const rootReducer = combineReducers({
    stock: stockReducer,
    saved: savedReducer
});

export default rootReducer;