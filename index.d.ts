export declare const BASE_URL = "https://ddragon.leagueoflegends.com/";
export declare const data_url: string;
export declare const resources_url: string;
export declare const resources_url_versioned: string;
export declare class API {
    constructor();
    getJSON(url: string): Promise<any>;
    request(url: string): Promise<any>;
}
export declare class DDragonApi extends API {
    private language;
    private version;
    construct(language: string, version: string): void;
    parseURL_data(unparsed: string): string;
    getChampionDataById(id: string): Promise<DDragonApi>;
}
