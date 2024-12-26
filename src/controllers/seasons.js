import { json } from "express";
import { validatePartialSeason, validateSeason } from "../schemas/seasons.js";

export class SeasonController {
    constructor({ seasonService }) {
        this.seasonService = seasonService;
    }

    getAll = async (req, res) => {
        try {
            const seasons = await this.seasonService.getAll();
            res.json(seasons);
        } catch (error) {
            console.error("Error fetching information from the database.", error.message);
            res.status(500).send("Error fetching information from the database.");
        }
    }

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