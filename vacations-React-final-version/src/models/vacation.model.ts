export class Vacation {

    constructor(
        public destination: string,
        public description: string,
        public startDate: Date | string,
        public endDate: Date | string,
        public cost : number,
        public imageName?: string,
        public id?: number
    ) {}
        
}