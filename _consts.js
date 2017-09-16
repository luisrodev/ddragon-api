"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BASE_URL = `https://ddragon.leagueoflegends.com/`;
const REALMS = `${BASE_URL}realms/{region}.json`;
//DATA
const data_url = `${BASE_URL}cdn/{version}/data/{language}/`;
//RESOURCES
const resources_url = `${BASE_URL}cdn/img/`;
const resources_url_versioned = `${BASE_URL}cdn/{version}/img/`;
const RESPONSE_CODES = {
    400: "Bad Request",
    403: "Forbidden",
    404: "Not Found",
    415: "Unsupported Media Type",
    429: "Rate Limit Excceded",
    500: "Internal Server Error",
    503: "Service Unavaliable"
};
class Constants {
    static get RESPONSE_CODES() {
        return RESPONSE_CODES;
    }
    static get REALMS() {
        return REALMS;
    }
    static get data_url() {
        return data_url;
    }
    static get resources_url() {
        return resources_url;
    }
    static get resources_url_versioned() {
        return resources_url_versioned;
    }
}
exports.Constants = Constants;
