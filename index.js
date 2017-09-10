"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
exports.BASE_URL = 'https://ddragon.leagueoflegends.com/';
//DATA
exports.data_url = `${exports.BASE_URL}cdn/data/{language}/`;
//RESOURCES
exports.resources_url = `${exports.BASE_URL}cdn/img/`;
exports.resources_url_versioned = `${exports.BASE_URL}cdn/{version}/img/`;
class API {
    constructor() {
    }
    getJSON(url) {
        return new Promise((success, fail) => {
            request({
                url: url,
                method: "GET",
                headers: {},
                json: true,
                body: null
            }, (err, res, body) => {
                if (res.statusCode == 200 || res.statusCode == 204) {
                    try {
                        success(JSON.parse(body));
                    }
                    catch (E) {
                        success(body);
                    }
                }
                else {
                    fail({ code: res.statusCode, message: "Error" });
                }
            });
        });
    }
    request(url) {
        return new Promise((success, fail) => {
            this.getJSON(url).then((data) => {
                success(data);
            }).catch((err) => {
                fail(err);
            });
        });
    }
}
exports.API = API;
class DDragonApi extends API {
    construct(language, version) {
        this.language = language;
        this.version = version;
    }
    parseURL_data(unparsed) {
        let parsedURL = unparsed.replace(/{version}/g, this.version);
        parsedURL = parsedURL.replace(/{language}/g, this.language);
        return parsedURL;
    }
    getChampionDataById(id) {
        return this.request(this.parseURL_data(exports.data_url + `champion/${id}.json`));
    }
}
exports.DDragonApi = DDragonApi;
