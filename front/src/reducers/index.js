import { combineReducers } from "redux";
import stockReducer from "./stockReducer";
import savedReducer from "./savedReducer";
import authReducer from "./authReducer";
import notInterestReducer from "./notInterestReducer.js";
import onboardReducer from "./onboardReducer.js";
import banReducer from "./banReducer.js";

const rootReducer = combineReducers({
    stock: stockReducer,
    saved: savedReducer,
    auth: authReducer,
    onboard: onboardReducer,
    notinterest: notInterestReducer,
    ban: banReducer,
});

export default rootReducer;