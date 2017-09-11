"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
exports.BASE_URL = `https://ddragon.leagueoflegends.com/`;
//DATA
exports.data_url = `${exports.BASE_URL}cdn/{version}/data/{language}/`;
//RESOURCES
exports.resources_url = `${exports.BASE_URL}cdn/img/`;
exports.resources_url_versioned = `${exports.BASE_URL}cdn/{version}/img/`;
const RESPONSE_CODES = {
    400: "Bad Request",
    403: "Forbidden",
    404: "Not Found",
    415: "Unsupported Media Type",
    429: "Rate Limit Excceded",
    500: "Internal Server Error",
    503: "Service Unavaliable"
};
class API {
    constructor() { }
    getJSON(url, method, data) {
        return new Promise((success, fail) => {
            request(url, (err, res, body) => {
                if (err)
                    fail({ error: "Some error was appened" });
                if (res.statusCode == 200) {
                    success(body);
                }
                else {
                    fail({ code: res.statusCode, message: RESPONSE_CODES[res.statusCode] });
                }
            });
        });
    }
    makeARequest(url, method, data) {
        return new Promise((success, fail) => {
            this.getJSON(url, method, data).then((res) => {
                success(res);
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
        let parsedURL = unparsed.replace(`{version}`, this.version);
        parsedURL = parsedURL.replace(`{language}`, this.language);
        return parsedURL;
    }
    getChampionDataById(id) {
        let url = this.parseURL_data(exports.data_url);
        url += `champion/${id}.json`;
        return this.makeARequest(url, "get", null);
    }
    getProfileIcons() {
        let url = this.parseURL_data(exports.data_url);
        url += `profileicon.json`;
        return this.makeARequest(url, "get", null);
    }
    getChampionsData() {
        let url = this.parseURL_data(exports.data_url);
        url += `champion.json`;
        return this.makeARequest(url, "get", null);
    }
}
exports.DDragonApi = DDragonApi;
