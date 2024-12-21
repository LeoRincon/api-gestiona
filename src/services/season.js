import { pgpConnection } from "../db.js";


export class SeasonService {


    static async getAll() {
        try {
            const seasons = await pgpConnection.manyOrNone('SELECT * FROM gestiona.temporada')
            if (seasons.length === 0) return null
            return seasons
        } catch (error) {
            console.error("It was not possible to fetch the seasons.");
        }
    }

    static async getById({ id }) {
        try {
            const season = await pgpConnection.oneOrNone(
                'SELECT * FROM gestiona.temporada WHERE id=$1',
                [id]
            )
            if (season.length === 0) return null
            return season
        } catch (error) {
            console.error("It was not possible to fetch the season.");
        }

    }

    static async getAllByIdCrop({ idCrop }) {
        try {
            const seasons = await pgpConnection.manyOrNone(
                'SELECT * FROM gestiona.temporada WHERE id_cultivo=$1',
                [idCrop]
            )
            if (seasons.length === 0) return null
            return seasons
        } catch (error) {
            console.error("It was not possible to fetch the seasons.");
        }

    }

    static async createSeason({ season }) {
        try {
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
        } catch (error) {
            console.error("It was not possible to create the season.");
        }
    }

    static async deleteSeason({ id }) {
        try {
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
        } catch (error) {
            console.error("It was not possible to delete the season.");
        }
    }

    static async updateSeason({ id, season }) {
        const keys = Object.keys(season);
        const values = Object.values(season);
        const query = keys.map((key, index) => `${key}=$${index + 1}`).join(', ');
        try {
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
        } catch (error) {
            console.error("It was not possible to update the season.");
        }
    }
}

