import express, {Request,Response} from "express";
import {StatusCode} from "../models/enums";
import {Vacation} from "../models/vacation.model";
import {vacationService} from "../services/vacation-service";
import {uploadImageService} from "../services/upload-image-service";
import {tokenMiddleware} from "../middleware/token-middleware";

class VacationController {

    router = express.Router();

    constructor() {
        this.router.post("/api/vacation", tokenMiddleware.validateAdmin, uploadImageService.upload.single("image"), this.addVacation);
        this.router.get("/api/vacations/", tokenMiddleware.validateToken, this.getVacationListOffset);
        this.router.get("/api/vacations/user/:id/followers/", tokenMiddleware.validateToken, this.getUsersFollowedVacations);
        this.router.get("/api/vacations/upcoming/", tokenMiddleware.validateToken, this.getUpcomingVacations);
        this.router.get("/api/vacations/active/", tokenMiddleware.validateToken, this.getActiveVacations);
        this.router.get("/api/vacations/count/", tokenMiddleware.validateToken, this.getVacationCount);
        this.router.get("/api/vacation/:id", tokenMiddleware.validateToken, this.getVacationById);
        this.router.put("/api/vacation/:id", tokenMiddleware.validateAdmin, uploadImageService.upload.single("image"), this.updateVacation);
        this.router.delete("/api/vacation/:id", tokenMiddleware.validateAdmin, this.deleteVacation);
    }

    public async addVacation(request: Request, response: Response): Promise<void> {
        const vacationJSON: any = JSON.parse(request.body.vacation);
        const vacation: Vacation = new Vacation(vacationJSON);
        vacation.imageName = request.file?.path;
        const vacationFromDB: Vacation = await vacationService.addVacation(vacation);
        response.status(StatusCode.Created).json(vacationFromDB);
    }

    public async getVacationCount(request: Request, response: Response): Promise<void> {
        const vacationCount: number = await vacationService.getVacationCount();
        response.json(vacationCount);
    }

    public async getVacationById(request: Request, response: Response): Promise<void> {
        const id: number = +request.params.id;
        const vacation: Vacation = await vacationService.getVacationById(id);
        response.json(vacation);
    }

    public async getUsersFollowedVacations(request: Request, response: Response): Promise<void>  {
        const id: number = +request.params.id;
        const followedVacations: Vacation[] = await vacationService.getUsersFollowedVacations(id);
        response.json(followedVacations);
    }

    public async getUpcomingVacations(request: Request, response: Response): Promise<void>  {
        const vacationList: Vacation[] = await vacationService.getUpcomingVacations();
        response.json(vacationList);
    }

    public async getActiveVacations(request: Request, response: Response): Promise<void> {
        const vacationList: Vacation[] = await vacationService.getActiveVacations();
        response.json(vacationList);
    }

    public async getVacationListOffset(request: Request, response: Response): Promise<void> {
        const offset: number = Number(request.query.offset) || 0;
        const limit: number = Number(request.query.limit) || 10;
        const vacationList: Vacation[] = await vacationService.getVacationListOffset(offset, limit);
        response.json(vacationList);
    }

    public async updateVacation(request: Request, response: Response): Promise<void> {
        const id: number = +request.params.id;
        const vacationJSON: any = JSON.parse(request.body.vacation);
        const vacation: Vacation = new Vacation(vacationJSON);
        if (request.file?.path) {
            vacation.imageName = request.file.path;
        }
        const vacationFromDB: Vacation = await vacationService.updateVacation(id, vacation);
        response.json(vacationFromDB);
    }

    public async deleteVacation(request: Request, response: Response): Promise<void> {
        const id: number = +request.params.id;
        await vacationService.deleteVacation(id);
        response.sendStatus(StatusCode.NoContent);
    }

}

export const vacationController = new VacationController();