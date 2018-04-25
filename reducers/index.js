import { combineReducers } from "redux";
import objects from "./objects_reducer";
import hydration from "./hydration_reducer";

export default combineReducers({
    objects, hydration
});