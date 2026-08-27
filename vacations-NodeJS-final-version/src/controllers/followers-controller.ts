import express, {Request, Response} from "express";
import {followersService} from "../services/followers-service";
import {Follower} from '../models/follower.model'
import {DestinationAndFollowersCountModel} from '../models/destination-and-followers-count.model';
import {StatusCode} from "../models/enums";
import {tokenMiddleware} from "../middleware/token-middleware";


class FollowersController {
    public router = express.Router();

    constructor() {
        this.router.post("/api/vacations/followers", tokenMiddleware.validateToken, this.addFollower);
        this.router.post("/api/vacations/followers/csv", tokenMiddleware.validateAdmin,this.downloadVacationsFollowersCSV);
        this.router.get("/api/vacations/followers/", tokenMiddleware.validateToken, this.getFollowersList);
        this.router.get("/api/vacations/destination-followers", tokenMiddleware.validateToken, this.getVacationDestinationWithFollowersCount);
        this.router.get("/api/vacations/followers/:id", tokenMiddleware.validateToken, this.getFollowersListByUserId);
        this.router.delete("/api/vacations/followers/:id", tokenMiddleware.validateToken,this.deleteFollower);
    }

    public async addFollower(request: Request, response: Response): Promise<void> {
        const follower: Follower = new Follower(request.body);
        const followerFromDB: Follower = await followersService.addFollower(follower);
        response.status(StatusCode.Created).json(followerFromDB);
    }

    public async getFollowersList(request: Request, response: Response): Promise<void> {
        const followersList: Follower[] = await followersService.getFollowersList();
        response.json(followersList);
    }

    public async getFollowersListByUserId(request: Request, response: Response): Promise<void> {
        const id: number = +request.params.id;
        const followersList: Follower[] = await followersService.getFollowersListByUserId(id);
        response.json(followersList);
    }

    public async getVacationDestinationWithFollowersCount(request: Request, response: Response): Promise<void> {
        const destinationAndFollowersCountArr: DestinationAndFollowersCountModel[] = await followersService.getVacationDestinationWithFollowersCount();
        response.json(destinationAndFollowersCountArr);
    }

    public async downloadVacationsFollowersCSV(request: Request, response: Response): Promise<void> {
        const dataArray: any[] = request.body;
        if (!Array.isArray(dataArray)) {
            response.status(StatusCode.BadRequest).send("Invalid data format");
            return;
        }
        const csv: string = followersService.downloadVacationsFollowersCSV(dataArray);
        response.setHeader("Content-Type", "text/csv; charset=utf-8");
        response.setHeader("Content-Disposition", "attachment; filename=vacation-followers.csv");
        response.send("\uFEFF" + csv);
    }

    public async deleteFollower(request: Request, response: Response): Promise<void> {
        const id: number = +request.params.id;
        await followersService.deleteFollower(id);
        response.sendStatus(StatusCode.NoContent);
    }

}

export const followersController = new FollowersController();