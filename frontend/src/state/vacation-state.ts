import {Vacation} from "../models/vacation.model";
import {configureStore} from "@reduxjs/toolkit";

export class VacationState {
    vacationList: Vacation[] = [];
    totalVacations: number = 0;
}

export enum VacationActionType {
    GetVacationList = "GetVacationList",
    GetTotalVacations = "GetTotalVacations",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation",
}

export interface VacationAction {
    type: VacationActionType,
    payload: unknown;
}

export function vacationReducer(vacationState: VacationState = new VacationState(), action: VacationAction): VacationState {

    const newState = {...vacationState}
    newState.vacationList = [...newState.vacationList];

    switch (action.type) {
        case VacationActionType.GetVacationList:
            newState.vacationList = action.payload as Vacation[];
            break;
        case VacationActionType.GetTotalVacations:
            newState.totalVacations = action.payload as number;
            break;
        case VacationActionType.AddVacation:
            newState.vacationList.push(action.payload as Vacation);
            break;
        case VacationActionType.UpdateVacation:
            const updatedVacation = action.payload as Vacation;
            const indexToUpdate: number = newState.vacationList.findIndex((vacation: Vacation): boolean => vacation.id === updatedVacation.id);
            newState.vacationList[indexToUpdate] = updatedVacation;
            break;
        case VacationActionType.DeleteVacation:
            const indexToDelete: number = newState.vacationList.findIndex((vacation: Vacation): boolean => vacation.id === (action.payload as number));
            newState.vacationList.splice(indexToDelete, 1);
            break;
    }

    return newState;
}

export const vacationStore = configureStore({ reducer: vacationReducer });
