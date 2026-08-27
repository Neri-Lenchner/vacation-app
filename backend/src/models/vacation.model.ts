import Joi, {CustomHelpers} from "joi";
import {ValidationError} from "./client-error";

export class Vacation {
    public destination: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public cost: number;
    public imageName?: string;
    public id?: number;
    public isSeed?: boolean;

    constructor(vacation: Vacation) {
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.cost = vacation.cost;
        this.imageName = vacation.imageName;
        this.id = vacation.id;
        this.isSeed = vacation.isSeed;
    }

    private static addValidationSchema = Joi.object({
        destination: Joi.string().required().min(2).max(20),
        description: Joi.string().required().min(2).max(1000),
        startDate: Joi.date().required().custom((value: any, helpers: CustomHelpers<any>): any => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (value < today) return helpers.message('Start date cannot be in the past' as any);
            return value;
        }),
        endDate: Joi.date().required().greater(Joi.ref('startDate')),
        cost: Joi.number().required().positive().max(10000),
        imageName: Joi.string().optional(),
        id: Joi.number().optional().positive(),
        isSeed: Joi.boolean().optional()
    });

    private static updateValidationSchema = Joi.object({
        destination: Joi.string().required().min(2).max(20),
        description: Joi.string().required().min(2).max(1000),
        startDate: Joi.date().required(),
        endDate: Joi.date().required().greater(Joi.ref('startDate')),
        cost: Joi.number().required().positive().max(10000),
        imageName: Joi.string().optional(),
        id: Joi.number().optional().positive(),
        isSeed: Joi.boolean().optional()
    });

    public validate(isUpdate = false): void {
        const schema = isUpdate ? Vacation.updateValidationSchema : Vacation.addValidationSchema;
        const result = schema.validate(this);
        if (result.error) {
            throw new ValidationError(result.error.message);
        }
    }
}