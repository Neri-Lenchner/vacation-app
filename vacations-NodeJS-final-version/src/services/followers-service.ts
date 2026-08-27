import {dal} from '../utils/dal';
import {Follower} from "../models/follower.model";
import {ResultSetHeader} from "mysql2";
import {ResourceNotFound} from "../models/client-error";
import {Parser} from "json2csv";
import {DestinationAndFollowersCountModel} from "../models/destination-and-followers-count.model";

class FollowersService {

    public async addFollower(follower: Follower): Promise<Follower>  {
        follower.validate();
        const sql = `INSERT INTO followers (userId, vacationId) VALUES (?, ?)`;
        const result = await dal.execute(sql, [follower.userId, follower.vacationId]) as ResultSetHeader;
        follower = await this.getSingleFollower(result.insertId);
        return follower;
    }

    public async getFollowersList(): Promise<Follower[]> {
        const sql = `SELECT * FROM followers`;
        const followersList = await dal.execute(sql) as Follower[];
        return followersList;
    }

    public async getFollowersListByUserId(id: number): Promise<Follower[]> {
        const sql = `SELECT * FROM followers WHERE userId = ?`;
        const followersList = await dal.execute(sql, [id]) as Follower[];
        return followersList;
    }

    public async getVacationDestinationWithFollowersCount(): Promise<DestinationAndFollowersCountModel[]> {
        const sql = `SELECT v.id as vacationId, v.destination as vacationDestination, COUNT(f.id) as followerCount FROM all_vacations v LEFT JOIN followers f ON v.id = f.vacationId GROUP BY v.id, v.destination`;
        const destinationAndFollowersCountArr = await dal.execute(sql) as DestinationAndFollowersCountModel[];
        return destinationAndFollowersCountArr;
    }

    public async getSingleFollower(id: number): Promise<Follower> {
        const sql = `SELECT * FROM followers WHERE id = ?`;
        const followerArr = await dal.execute(sql, [id]) as Follower[];
        const follower: Follower = followerArr[0];
        if (!follower) {
            throw new ResourceNotFound(id);
        }
        return follower;
    }

    public async deleteFollower(id: number): Promise<void> {
        const sql = `DELETE FROM followers WHERE id = ?`;
        const result = await dal.execute(sql, [id]) as ResultSetHeader;
        if (result.affectedRows === 0) {
            throw new ResourceNotFound(id);
        }
    }

    public downloadVacationsFollowersCSV(followersARR: Follower[]): string {
        if (!followersARR || !followersARR.length) return "";
        const fields: string[] = Object.keys(followersARR[0]);
        const parser = new Parser({fields});
        return parser.parse(followersARR);
    }

}

export const followersService = new FollowersService();