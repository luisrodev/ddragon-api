import request = require('request');

export const BASE_URL = `https://ddragon.leagueoflegends.com/`;

//DATA
export const data_url = `${BASE_URL}cdn/{version}/data/{language}/`;

//RESOURCES
export const resources_url = `${BASE_URL}cdn/img/`;
export const resources_url_versioned = `${BASE_URL}cdn/{version}/img/`;

const RESPONSE_CODES = {
    400: "Bad Request",
    403: "Forbidden",
    404: "Not Found",
    415: "Unsupported Media Type",
    429: "Rate Limit Excceded",
    500: "Internal Server Error",
    503: "Service Unavaliable"
}

export class API {

    public constructor(){}

    

    private getJSON(url: string, method: string, data: any): Promise<any> {
        return new Promise((success, fail) => {
            request(url, (err: any, res: any, body: string) => {
                if(err) fail({error: "Some error was appened"})
                if(res.statusCode == 200){
                    success(body);
                }else{
                    fail({ code: res.statusCode, message: RESPONSE_CODES[res.statusCode]});
                }
            });
        });
    }

    protected makeARequest(url: string, method: string, data: any): Promise<any> {
        return new Promise((success, fail) => {
            this.getJSON(url, method, data).then((res) => {
                success(res);
            }).catch((err) => {
                fail(err);
            });
        });
    }
}

export class DDragonApi extends API {
    private language: string;
    private version: string;

    public constructor(language: string, version: string){
        super();
        this.language = language;
        this.version = version;
    }

    private parseURL_data(unparsed: string): string{
        let parsedURL = unparsed.replace(`{version}`, this.version);
        parsedURL = parsedURL.replace(`{language}`, this.language);
        return parsedURL;
    }

    private parseURL_resources(unparsed: string){
        let parsedURL = unparsed.replace(`{version}`, this.version);

        return parsedURL;
    }

    public getChampionById(id: string): Promise<DDragonApi>{
        let url = this.parseURL_data(data_url);
        url += `champion/${id}.json`;
        return this.makeARequest(url, "get", null);
    }

    public getProfileIcons(): Promise<DDragonApi> { 
        let url = this.parseURL_data(data_url);
        url += `profileicon.json`;
        return this.makeARequest(url, "get", null);
    }

    public getChampions(): Promise<DDragonApi> {
        let url = this.parseURL_data(data_url);
        url += `champion.json`;
        return this.makeARequest(url, "get", null);
    }

    public getSummoners(): Promise<DDragonApi> {
        let url = this.parseURL_data(data_url);
        url += `summoner.json`;
        return this.makeARequest(url, "get", null);
    }
    
    public getChampionSquare(id: string): String {
        let url = this.parseURL_resources(resources_url_versioned);
        url += `champion/${id}.png`;
        return url;
    }

    public getProfileIcon(id: string): String {
        let url = this.parseURL_resources(resources_url_versioned);
        url += `profileicon/${id}.png`;
        return url;
    }

    public getChampionSplashArt(championId: string, skinNum: number): String {
        let url = this.parseURL_resources(resources_url);
        url += `champion/splash/${championId}_${skinNum}.jpg`;
        return url;
    }

    public getChampionLoadingImage(championId: string, skinNum: number): String {
        let url = this.parseURL_resources(resources_url);
        url += `champion/loading/${championId}_${skinNum}.jpg`;
        return url;
    }
    
    public getSpellImage(spellId: string): String {
        let url = this.parseURL_resources(resources_url_versioned);
        url += `spell/${spellId}.png`;
        return url;
    }
    
}