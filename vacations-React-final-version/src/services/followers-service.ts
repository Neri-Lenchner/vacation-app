import axios from 'axios';
import { saveAs } from 'file-saver';
import {Follower} from '../models/follower.model';
import {appConfig} from "../utils/app-config";
import {authStore} from "../state/auth-state";
import {FollowerActionType, followersStore} from "../state/followers-state";
import {DestinationAndFollowersCountModel} from "../models/destination-and-followers-count.model";

class FollowerService {
    public async getFollowersList(): Promise<Follower[]> {
        try {
            const response = await axios.get<Follower[]>(
                appConfig.apiAddress + "vacations/followers/", {headers: {Authorization: "Bearer " + authStore.getState().token}});
            followersStore.dispatch({type: FollowerActionType.GetCurrentUserFollowedVacations, payload: response.data});
            return followersStore.getState().currentUserFollowedVacations;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("failed fetching followers list", error);
            throw error;
        }
    }

    public async getFollowersListByUserId(id: number): Promise<Follower[]> {
        try {
            const response = await axios.get<Follower[]>(
                appConfig.apiAddress + "vacations/followers/" + id, {headers: {Authorization: "Bearer " + authStore.getState().token}});
            followersStore.dispatch({type: FollowerActionType.GetCurrentUserFollowedVacations, payload: response.data});
            return response.data;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("fetching followers list by ID failed:", error);
            throw error;
        }
    }

    public async addFollower(follower: Follower): Promise<Follower> {
        try {
            const response = await axios.post<Follower>(appConfig.apiAddress + "vacations/followers", follower, {headers: {Authorization: "Bearer " + authStore.getState().token }});
            followersStore.dispatch({type: FollowerActionType.AddFollower, payload: response.data});
            return response.data;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("adding follower failed:", error);
            throw error;
        }
    }

    public async deleteFollower(id: number): Promise<void> {
        try {
            await axios.delete<void>(appConfig.apiAddress + "vacations/followers/" + id, {headers: { Authorization: "Bearer " + authStore.getState().token }});
            followersStore.dispatch({type: FollowerActionType.DeleteFollower, payload: id});
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("delete follower failed:", error);
            throw error;
        }
    }

    public async getVacationDestinationWithFollowerCount(): Promise<DestinationAndFollowersCountModel[]> {
        try {
            const response = await axios.get<DestinationAndFollowersCountModel[]>(
                appConfig.apiAddress + "vacations/destination-followers", {headers: {Authorization: "Bearer " + authStore.getState().token}});
            followersStore.dispatch({type: FollowerActionType.GetFollowersCountList, payload: response.data});
            return response.data;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("fetching destination and followers count failed:", error);
            throw error;
        }
    }

    public async downloadFollowersMapCSV(vacationData: DestinationAndFollowersCountModel[]): Promise<void> {
        try {
            const response = await axios.post<Blob>(
                appConfig.apiAddress + "vacations/followers/csv",
                vacationData,
                {
                    headers: { Authorization: "Bearer " + authStore.getState().token },
                    responseType: 'blob'
                }
            );
            saveAs(response.data, 'vacation-followers.csv');
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("failed to download CSV:", error);
            throw error;
        }
    }

}

export const followersService = new FollowerService();