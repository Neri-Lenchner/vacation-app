import {ResultSetHeader} from "mysql2";
import {dal} from "../utils/dal";
import {Vacation} from "../models/vacation.model";
import {ResourceNotFound} from "../models/client-error";
import {appConfig} from "../utils/app-config";
import {uploadImageService} from "./upload-image-service";


class VacationService {

    public async addVacation(vacation: Vacation): Promise<Vacation> {
        vacation.validate();
        const sql = "INSERT INTO all_vacations (destination, description, startDate, endDate, cost, imageName) VALUES (?, ?, ?, ?, ?, ?)";
        const result = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.cost, vacation.imageName]) as ResultSetHeader;
        vacation = await this.getVacationById(result.insertId);
        return vacation;
    }

    public async getVacationById(id: number): Promise<Vacation> {
        const sql = "SELECT * FROM all_vacations WHERE id = ?";
        const result = await dal.execute(sql, [id]) as Vacation[];
        const vacation: Vacation = result[0];
        if (!vacation) {
            throw new ResourceNotFound(id);
        }
        return vacation;
    }

    public async getVacationListOffset(offset: number, limit: number): Promise<Vacation[]> {
        if (limit <= 0 || limit > appConfig.offsetLimit) {
            throw new Error("Invalid limit value");
        }
        const sql = "SELECT * FROM all_vacations ORDER BY startDate ASC LIMIT ? OFFSET ?";
        const vacationList = await dal.execute(sql, [limit, offset]) as Vacation[];
        return vacationList;
    }

    public async getVacationCount(): Promise<number> {
        const sql = "SELECT COUNT(*) AS total FROM vacations.all_vacations;";
        const result = await dal.execute(sql) as { total: number }[];
        return Number(result[0].total);
    }

    public async getUsersFollowedVacations(id: number): Promise<Vacation[]> {
        const sql = `SELECT v.* FROM all_vacations v JOIN followers f ON v.id = f.vacationId WHERE f.userId = ? ORDER BY v.startDate`;
        const followedVacations = await dal.execute(sql, [id]) as Vacation[];
        return followedVacations;
    }

    public async getActiveVacations(): Promise<Vacation[]> {
        const sql = `SELECT * FROM all_vacations WHERE startDate <= CURDATE() AND endDate >= CURDATE()`;
        const vacations = await dal.execute(sql) as Vacation[];
        return vacations;
    }

    public async getUpcomingVacations(): Promise<Vacation[]> {
        const sql = `SELECT * FROM all_vacations WHERE startDate > CURDATE()`;
        const vacations = await dal.execute(sql) as Vacation[];
        return vacations;
    }

    public async updateVacation(id: number, vacation: Vacation): Promise<Vacation> {
        vacation.validate(true);
        const vacationBeforeUpdate: Vacation = await this.getVacationById(id);
        if (!vacation.imageName) {
            vacation.imageName = vacationBeforeUpdate.imageName;
        }
        const sql = "UPDATE all_vacations set destination = ?, description = ?, startDate = ?, endDate = ?, cost = ?, imageName = ? WHERE id = ?";
        const result = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.cost, vacation.imageName, id]) as ResultSetHeader;
        if (result.affectedRows === 0) {
            throw new ResourceNotFound(id);
        }
        if (vacation.imageName !== vacationBeforeUpdate.imageName && vacationBeforeUpdate.imageName) {
            uploadImageService.deleteImage(vacationBeforeUpdate.imageName);
        }
        return vacation;
    }

    public async deleteVacation(id: number): Promise<void> {
        const vacationBeforeDelete: Vacation = await this.getVacationById(id);
        if (vacationBeforeDelete.imageName) uploadImageService.deleteImage(vacationBeforeDelete.imageName);
        const sql = "DELETE FROM all_vacations WHERE id = ?";
        const result = await dal.execute(sql, [id]) as ResultSetHeader;
        if (result.affectedRows === 0) {
            throw new ResourceNotFound(id);
        }
    }

}

export const vacationService = new VacationService();