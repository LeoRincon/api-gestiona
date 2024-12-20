import { pgpConnection } from "../db.js";

/**
 * Service class for managing seasons.
 */
export class SeasonService {

    /**
     * Retrieves all seasons from the database.
     * @returns {Promise<Array|null>} A promise that resolves to an array of seasons or null if no seasons are found.
     */
    static async getAll() {
        try {
            const seasons = await pgpConnection.manyOrNone('SELECT * FROM gestiona.temporada')
            if (seasons.length === 0) return null
            return seasons
        } catch (error) {
            console.error("error en la conexión")
        }
    }

    /**
     * Retrieves a season by its ID.
     * @param {Object} params - The parameters object.
     * @param {string} params.id - The ID of the season to retrieve.
     * @returns {Promise<Object|null>} A promise that resolves to the season object or null if not found.
     */
    static async getById({ id }) {
        const season = await pgpConnection.oneOrNone(
            'SELECT * FROM gestiona.temporada WHERE id=$1',
            [id]
        )
        if (season.length === 0) return null
        return season
    }

    /**
     * Retrieves all seasons associated with a specific crop ID.
     * @param {Object} params - The parameters object.
     * @param {string} params.idCrop - The ID of the crop.
     * @returns {Promise<Array|null>} A promise that resolves to an array of seasons or null if no seasons are found.
     */
    static async getAllByIdCrop({ idCrop }) {
        const seasons = await pgpConnection.manyOrNone(
            'SELECT * FROM gestiona.temporada WHERE id_cultivo=$1',
            [idCrop]
        )
        if (seasons.length === 0) return null
        return seasons
    }

    /**
     * Creates a new season in the database.
     * @param {Object} params - The parameters object.
     * @param {Object} params.season - The season data to create.
     * @returns {Promise<Object>} A promise that resolves to an object containing the success status and the created season data.
     * @throws Will throw an error if the season could not be created.
     */
    static async createSeason({ season }) {
        const data = await pgpConnection.one(
            'INSERT INTO gestiona.temporada (nombre_temporada, duracion, fecha_inicio, fecha_fin, id_cultivo, novedades_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
            [
                season.nombre_temporada,
                season.duracion,
                season.fecha_inicio,
                season.fecha_fin,
                season.id_cultivo,
                season.novedades_id
            ]
        )

        let newSeason = {}

        if (data.length === 0) throw new Error("It was not possible to create the season.");

        newSeason = {
            success: true,
            data
        }
        
        return newSeason
    }

    /**
     * Deletes a season by its ID.
     * @param {Object} params - The parameters object.
     * @param {string} params.id - The ID of the season to delete.
     * @returns {Promise<Object>} A promise that resolves to an object containing the success status and the deleted season data.
     * @throws Will throw an error if the season could not be deleted.
     */
    static async deleteSeason({ id }) {
        const data = await pgpConnection.one(
            'DELETE FROM gestiona.temporada WHERE id=$1 RETURNING *',
            [id]
        )

        let season = {}

        if (data.length === 0) throw new Error("It was not possible to delete the season.");

        season = {
            success: true,
            data
        }

        return season
    }

    /**
     * Updates a season by its ID.
     * @param {Object} params - The parameters object.
     * @param {string} params.id - The ID of the season to update.
     * @param {Object} params.season - The season data to update.
     * @returns {Promise<Object>} A promise that resolves to an object containing the success status and the updated season data.
     * @throws Will throw an error if the season could not be updated.
     */
    static async updateSeason({ id, season }) {
        const keys = Object.keys(season);
        const values = Object.values(season);
        const query = keys.map((key, index) => `${key}=$${index + 1}`).join(', ');
        const data = await pgpConnection.one(
            `UPDATE gestiona.temporada SET ${query} WHERE id=$${keys.length + 1} RETURNING *`,
            [...values, id]
        )

        let updatedSeason = {}

        if (data.length === 0) throw new Error("It was not possible to update the season.");

        updatedSeason = {
            success: true,
            data
        }

        return updatedSeason
    }
}

