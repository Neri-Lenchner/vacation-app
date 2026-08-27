class AppConfig {

}

class DevAppConfig extends AppConfig {
    serverAddress: string = process.env.REACT_APP_SERVER_ADDRESS!;
    apiAddress: string = this.serverAddress + "/api/";
    uploadsAddress: string = this.serverAddress + "/uploads/";
}

class ProdAppConfig extends AppConfig {
    serverAddress: string = process.env.REACT_APP_SERVER_ADDRESS!;
    apiAddress: string = this.serverAddress + "/api/";
    uploadsAddress: string = this.serverAddress + "/uploads/";
}

export const appConfig = process.env.NODE_ENV === "production" ? new ProdAppConfig() : new DevAppConfig();

