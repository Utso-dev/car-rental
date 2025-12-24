import { Router } from "express";
import { vehicleControllers } from "./vehicles.controllers";
import authProtected from "../../middleware/auth";
import auth from "../../middleware/auth";

const vehiclesRouter = Router();

vehiclesRouter.post("/", vehicleControllers.createVehicle );
vehiclesRouter.get("/",auth("admin") , vehicleControllers.getVehicles );
    
export default vehiclesRouter;