import request = require('request');
import {Constants} from './_consts';

export class API extends Constants{
    protected language: string;
    protected version: string;
    private region: string;
    
    public constructor(region: string){
        super();
        this.region = region;
        this.getREALm();
    }

    private parseURLRealm(){
        let parsed = Constants.REALMS.replace(`{region}`, this.region);
        return parsed;
    }

    private getREALm(){
        let url = this.parseURLRealm();
        
        request(url, (err: any, res: any, body: any) => {
            if(err) console.log(err);
            let parsed = JSON.parse(body);

            this.version = parsed.v;
            this.language = parsed.l;
        })
    }

    private getJSON(url: string, method: string, data: any): Promise<any> {
        return new Promise((success, fail) => {
            request(url, (err: any, res: any, body: string) => {
                if(err) fail({error: "Some error was appened"})
                if(res.statusCode == 200){
                    success(body);
                }else{
                    fail({ code: res.statusCode, message: Constants.RESPONSE_CODES[res.statusCode]});
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