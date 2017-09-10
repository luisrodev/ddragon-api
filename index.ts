import request = require('request');

export const BASE_URL = 'https://ddragon.leagueoflegends.com/';

//DATA
export const data_url = `${BASE_URL}cdn/data/{language}/`;

//RESOURCES
export const resources_url = `${BASE_URL}cdn/img/`;
export const resources_url_versioned = `${BASE_URL}cdn/{version}/img/`;

export class API {
    
    constructor(){

    }

    public getJSON(url: string): Promise<any> {
        return new Promise((success, fail) => {
            request(
                {
                    url: url,
                    method: "GET",
                    headers: {},
                    json: true,
                    body: null
                }, (err: any, res: any, body: string) => {
                    if(res.statusCode == 200 || res.statusCode == 204){
                        try{
                            success(JSON.parse(body));
                        }catch(E){
                            success(body);
                        }
                    } else {
                        fail({code: res.statusCode, message: "Error"});
                    }
                });
        });
    }

    public request(url: string): Promise<any> {
        return new Promise((success, fail) => {
            this.getJSON(url).then((data) => {
                success(data);
            }).catch((err) => {
                fail(err);
            });
        });
    }
}

export class DDragonApi extends API {
    private language: string;
    private version: string;

    public construct(language: string, version: string){
        this.language = language;
        this.version = version;
    }

    public parseURL_data(unparsed: string): string{
        let parsedURL = unparsed.replace(/{version}/g, this.version);
        parsedURL = parsedURL.replace(/{language}/g, this.language);

        return parsedURL;
    }

    public getChampionDataById(id: string): Promise<DDragonApi>{
        return this.request(this.parseURL_data(data_url + `champion/${id}.json`));
    }
}