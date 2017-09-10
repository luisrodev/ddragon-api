import request = require('request');

export const BASE_URL = `https://ddragon.leagueoflegends.com/`;

//DATA
export const data_url = `${BASE_URL}cdn/{version}/data/{language}/`;

//RESOURCES
export const resources_url = `${BASE_URL}cdn/img/`;
export const resources_url_versioned = `${BASE_URL}cdn/{version}/img/`;

export class API {

    public constructor(){}
    

    public getJSON(url: string, method: string, data: any): Promise<any> {
        return new Promise((success, fail) => {
            request(url, (err: any, res: any, body: string) => {
                if(err) fail({error: "Some error was appened"})
                
                success(body);
            });
        });
    }

    public requestt(url: string, method: string, data: any, prop?: string): Promise<any> {
        return new Promise((success, fail) => {
            this.getJSON(url, method, data).then((d) => {
                console.log("Fron request: ", d);
                if(prop === null){
                    success();
                } else if(prop === undefined){
                    success(d);
                }else{
                    success(d[prop]);
                }
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

    public parseURL_data(unparsed: string): string{
        console.log(this.version + ' ' + this.language);
        let parsedURL = unparsed.replace(`{version}`, this.version);
        parsedURL = parsedURL.replace(`{language}`, this.language);
        console.log(parsedURL);
        return parsedURL;
    }

    public getChampionDataById(id: string): Promise<DDragonApi>{
        let url = this.parseURL_data(data_url);
        url += `champion/${id}.json`;
        console.log(url)
        return this.requestt(url, "get", null);
    }
}