import { Router } from "express";
import auth from "../../middleware/auth";
import { vehicleControllers } from "./vehicles.controllers";

const vehiclesRouter = Router();

vehiclesRouter.post("/", auth(), vehicleControllers.createVehicle);
vehiclesRouter.get("/", auth(), vehicleControllers.getVehicles);

export default vehiclesRouter;
