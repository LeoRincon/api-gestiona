import { Router } from "express";
import { SeasonController } from "../controllers/seasons.js";

export const createSeasonRouter = ({ seasonService }) => {
    const seasonRouter = Router();

    // Initialize the season controller with the provided season service
    const seasonController = new SeasonController({ seasonService });

    seasonRouter.get("/crop", seasonController.getAllByIdCrop);
    seasonRouter.get("/", seasonController.getAll);
    seasonRouter.get("/:id", seasonController.getById);
    seasonRouter.patch("/:id", seasonController.updateSeason);
    seasonRouter.delete("/:id", seasonController.deleteSeason);
    seasonRouter.post("/", seasonController.createSeason);

    return seasonRouter;
}