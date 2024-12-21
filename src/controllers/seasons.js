import { json } from "express";
import { validatePartialSeason, validateSeason } from "../schemas/seasons.js";

/**
 * Controller for handling season-related operations.
 */
export class SeasonController {
    constructor({ seasonService }) {
        /**
         * @param {Object} seasonService - Service for handling season data operations.
         */
        this.seasonService = seasonService;
    }

    /**
     * Fetches all seasons from the database.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>} - Responds with a JSON array of all seasons.
     */
    getAll = async (req, res) => {
        try {
            const seasons = await this.seasonService.getAll();
            res.json(seasons);
        } catch (error) {
            console.error("Error fetching information from the database.", error.message);
            res.status(500).send("Error fetching information from the database.");
        }
    }

    /**
     * Fetches all seasons by crop ID from the database.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>} - Responds with a JSON array of seasons for the specified crop ID.
     */
    getAllByIdCrop = async (req, res) => {
        const { id } = req.query;
        try {
            const seasons = await this.seasonService.getAllByIdCrop({ idCrop: id });
            res.json(seasons);
        } catch (error) {
            console.error("Error fetching information from the database.", error.message);
            res.status(500).send("Error fetching information from the database.");
        }
    }

    /**
     * Fetches a season by its ID from the database.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>} - Responds with a JSON object of the season.
     */
    getById = async (req, res) => {
        const { id } = req.params;
        try {
            const season = await this.seasonService.getById({ id });
            res.json(season);
        } catch (error) {
            console.error("Error fetching information from the database.", error.message);
            res.status(500).send("Error fetching information from the database.");
        }
    }

    /**
     * Creates a new season in the database.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>} - Responds with a JSON object of the newly created season.
     */
    createSeason = async (req, res) => {
        const season = req.body;
        const result = validateSeason(season);
        if (!result.success) {
            return res.status(400).json(result.error);
        }
        try {
            let validateSeason = result.data;
            const newSeason = await this.seasonService.createSeason({ season: validateSeason });
            res.json(newSeason);
        } catch (error) {
            console.error("Error saving data to the database.", error);
            res.status(500).send("Error saving data to the database.");
        }
    }

    /**
     * Deletes a season by its ID from the database.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>} - Responds with a JSON object of the deleted season.
     */
    deleteSeason = async (req, res) => {
        const { id } = req.params;
        try {
            const season = await this.seasonService.deleteSeason({ id });
            res.json(season);
        } catch (error) {
            console.error("Error removing data from the database.", error);
            res.status(500).send("Error removing data from the database.");
        }
    }

    /**
     * Updates a season by its ID in the database.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>} - Responds with a JSON object of the updated season.
     */
    updateSeason = async (req, res) => {
        const { id } = req.params;
        const season = req.body;
        const result = validatePartialSeason(season);
        if (!result.success) {
            return res.status(400).json({error: result.error});
        }
        try {
            const validatedSeason = result.data;
            const updatedSeason = await this.seasonService.updateSeason({ id, season: validatedSeason });
            res.json(updatedSeason);
        } catch (error) {
            console.error("Error updating data in the database.", error);
            res.status(500).send("Error updating data in the database.");
        }
    }
}