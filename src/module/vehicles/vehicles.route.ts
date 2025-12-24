import { Router } from "express";
import { vehicleControllers } from "./vehicles.controllers";

const vehiclesRouter = Router();

vehiclesRouter.post("/", vehicleControllers.createVehicle );
vehiclesRouter.get("/", vehicleControllers.getVehicles );

export default vehiclesRouter;