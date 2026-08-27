import 'dotenv/config';

class AppConfig {
    public readonly host: string = process.env.DB_HOST!;
    public readonly user: string = process.env.DB_USER!;
    public readonly password: string = process.env.DB_PASSWORD!;
    public readonly database: string = process.env.DB_NAME!;
    public readonly secretKey: string = process.env.JWT_SECRET!;
    public readonly timeZone: string = process.env.DB_TIMEZONE!;
    public readonly offsetLimit: number = 10;
    public readonly port: number = Number(process.env.PORT);
}

export const appConfig = new AppConfig();