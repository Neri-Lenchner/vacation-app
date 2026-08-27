import Joi from "joi";
import {ValidationError} from "./client-error";

export class Follower {
    public userId: number;
    public vacationId: number;
    public id?: number;
    constructor(follower: Follower) {
        this.userId = follower.userId;
        this.vacationId = follower.vacationId;
    }

    private static validationSchema = Joi.object({
        userId: Joi.number().required().positive(),
        vacationId: Joi.number().required().positive(),
        id: Joi.number().optional().positive(),
    }).unknown(false);

    public validate(): void {
        const result = Follower.validationSchema.validate(this);
        if (result.error) {
            throw new ValidationError(result.error.message);
        }
    }
}