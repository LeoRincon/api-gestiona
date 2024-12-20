import { Router } from "express";
import { SeasonController } from "../controllers/seasons.js";

/**
 * Creates a router for handling season-related routes.
 * 
 * @param {Object} dependencies - The dependencies required by the router.
 * @param {Object} dependencies.seasonService - The service used to manage seasons.
 * @returns {Router} The configured router for season routes.
 */
export const createSeasonRouter = ({ seasonService }) => {
    const seasonRouter = Router();

    // Initialize the season controller with the provided season service
    const seasonController = new SeasonController({ seasonService });

    /**
     * Route to get all seasons by crop ID.
     * @name GET /crop
     * @function
     * @memberof module:routers/seasons~createSeasonRouter
     * @inner
     */
    seasonRouter.get("/crop", seasonController.getAllByIdCrop);

    /**
     * Route to get all seasons.
     * @name GET /
     * @function
     * @memberof module:routers/seasons~createSeasonRouter
     * @inner
     */
    seasonRouter.get("/", seasonController.getAll);

    /**
     * Route to get a season by ID.
     * @name GET /:id
     * @function
     * @memberof module:routers/seasons~createSeasonRouter
     * @inner
     * @param {string} id - The ID of the season to retrieve.
     */
    seasonRouter.get("/:id", seasonController.getById);

    /**
     * Route to update a season by ID.
     * @name PATCH /:id
     * @function
     * @memberof module:routers/seasons~createSeasonRouter
     * @inner
     * @param {string} id - The ID of the season to update.
     * @param {Object} season - The season data to update.
     */
    seasonRouter.patch("/:id", seasonController.updateSeason);

    /**
     * Route to delete a season by ID.
     * @name DELETE /:id
     * @function
     * @memberof module:routers/seasons~createSeasonRouter
     * @inner
     * @param {string} id - The ID of the season to delete.
     */
    seasonRouter.delete("/:id", seasonController.deleteSeason);

    /**
     * Route to create a new season.
     * @name POST /
     * @function
     * @memberof module:routers/seasons~createSeasonRouter
     * @inner
     * @param {Object} season - The season data to create.
     */
    seasonRouter.post("/", seasonController.createSeason);

    return seasonRouter;
}