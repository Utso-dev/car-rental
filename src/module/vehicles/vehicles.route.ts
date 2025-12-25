import { Router } from "express";
import auth from "../../middleware/auth";
import { vehicleControllers } from "./vehicles.controllers";

const vehiclesRouter = Router();

vehiclesRouter.post("/", auth(), vehicleControllers.createVehicle);
vehiclesRouter.get("/", auth(), vehicleControllers.getVehicles);
vehiclesRouter.get("/:id", auth(), vehicleControllers.getVehicleById);
vehiclesRouter.put("/:id", auth(), vehicleControllers.updateVehicleById);
vehiclesRouter.delete("/:id", auth(), vehicleControllers.deleteVehicleById);

export default vehiclesRouter;
