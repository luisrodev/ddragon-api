"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
exports.BASE_URL = `https://ddragon.leagueoflegends.com/`;
//DATA
exports.data_url = `${exports.BASE_URL}cdn/{version}/data/{language}/`;
//RESOURCES
exports.resources_url = `${exports.BASE_URL}cdn/img/`;
exports.resources_url_versioned = `${exports.BASE_URL}cdn/{version}/img/`;
class API {
    constructor() { }
    getJSON(url, method, data) {
        return new Promise((success, fail) => {
            request(url, (err, res, body) => {
                if (err)
                    fail({ error: "Some error was appened" });
                success(body);
            });
        });
    }
    requestt(url, method, data, prop) {
        return new Promise((success, fail) => {
            this.getJSON(url, method, data).then((d) => {
                console.log("Fron request: ", d);
                if (prop === null) {
                    success();
                }
                else if (prop === undefined) {
                    success(d);
                }
                else {
                    success(d[prop]);
                }
            }).catch((err) => {
                fail(err);
            });
        });
    }
}
exports.API = API;
class DDragonApi extends API {
    constructor(language, version) {
        super();
        this.language = language;
        this.version = version;
    }
    parseURL_data(unparsed) {
        console.log(this.version + ' ' + this.language);
        let parsedURL = unparsed.replace(`{version}`, this.version);
        parsedURL = parsedURL.replace(`{language}`, this.language);
        console.log(parsedURL);
        return parsedURL;
    }
    getChampionDataById(id) {
        let url = this.parseURL_data(exports.data_url);
        url += `champion/${id}.json`;
        console.log(url);
        return this.requestt(url, "get", null);
    }
}
exports.DDragonApi = DDragonApi;
