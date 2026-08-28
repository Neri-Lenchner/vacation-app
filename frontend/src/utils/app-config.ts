class AppConfig {

}

class DevAppConfig extends AppConfig {
    serverAddress: string = process.env.REACT_APP_SERVER_ADDRESS!;
    apiAddress: string = this.serverAddress + "/api/";
}

class ProdAppConfig extends AppConfig {
    serverAddress: string = process.env.REACT_APP_SERVER_ADDRESS!;
    apiAddress: string = this.serverAddress + "/api/";
}

export const appConfig = process.env.NODE_ENV === "production" ? new ProdAppConfig() : new DevAppConfig();

