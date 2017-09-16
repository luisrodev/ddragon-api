"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _consts_1 = require("./_consts");
const api_1 = require("./api");
class DDragonApi extends api_1.API {
    constructor(region) {
        super(region);
    }
    parseURL_data(unparsed) {
        let parsedURL = unparsed.replace(`{version}`, this.version);
        parsedURL = parsedURL.replace(`{language}`, this.language);
        return parsedURL;
    }
    parseURL_resources(unparsed) {
        let parsedURL = unparsed.replace(`{version}`, this.version);
        return parsedURL;
    }
    getChampionById(id) {
        let url = this.parseURL_data(_consts_1.Constants.data_url);
        url += `champion/${id}.json`;
        console.log(url);
        return this.makeARequest(url, "get", null);
    }
    getProfileIcons() {
        let url = this.parseURL_data(_consts_1.Constants.data_url);
        url += `profileicon.json`;
        return this.makeARequest(url, "get", null);
    }
    getChampions() {
        let url = this.parseURL_data(_consts_1.Constants.data_url);
        url += `champion.json`;
        return this.makeARequest(url, "get", null);
    }
    getSummoners() {
        let url = this.parseURL_data(_consts_1.Constants.data_url);
        url += `summoner.json`;
        return this.makeARequest(url, "get", null);
    }
    getChampionSquare(id) {
        let url = this.parseURL_resources(_consts_1.Constants.resources_url_versioned);
        url += `champion/${id}.png`;
        return url;
    }
    getProfileIcon(id) {
        let url = this.parseURL_resources(_consts_1.Constants.resources_url_versioned);
        url += `profileicon/${id}.png`;
        return url;
    }
    getChampionSplashArt(championId, skinNum) {
        let url = this.parseURL_resources(_consts_1.Constants.resources_url);
        url += `champion/splash/${championId}_${skinNum}.jpg`;
        return url;
    }
    getChampionLoadingImage(championId, skinNum) {
        let url = this.parseURL_resources(_consts_1.Constants.resources_url);
        url += `champion/loading/${championId}_${skinNum}.jpg`;
        return url;
    }
    getSpellImage(spellId) {
        let url = this.parseURL_resources(_consts_1.Constants.resources_url_versioned);
        url += `spell/${spellId}.png`;
        return url;
    }
}
exports.DDragonApi = DDragonApi;
