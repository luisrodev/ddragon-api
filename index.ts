import {Constants} from './_consts';
import {API} from './api';

export class DDragonApi extends API {    

    public constructor(region: string){
        super(region);
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
        let url = this.parseURL_data(Constants.data_url);
        url += `champion/${id}.json`;
        console.log(url);
        return this.makeARequest(url, "get", null);
    }

    public getProfileIcons(): Promise<DDragonApi> { 
        let url = this.parseURL_data(Constants.data_url);
        url += `profileicon.json`;
        return this.makeARequest(url, "get", null);
    }

    public getChampions(): Promise<DDragonApi> {
        let url = this.parseURL_data(Constants.data_url);
        url += `champion.json`;
        return this.makeARequest(url, "get", null);
    }

    public getSummoners(): Promise<DDragonApi> {
        let url = this.parseURL_data(Constants.data_url);
        url += `summoner.json`;
        return this.makeARequest(url, "get", null);
    }

    public getChampionSquare(id: string): Promise<DDragonApi> {
        let url = this.parseURL_resources(Constants.resources_url_versioned);
        url += `champion/${id}.png`;
        return this.makeAResourceRequest(url, "get", null);
        // return url;
    }

    public getProfileIcon(id: string): Promise<DDragonApi> {
        let url = this.parseURL_resources(Constants.resources_url_versioned);
        url += `profileicon/${id}.png`;
        // return url;
        return this.makeAResourceRequest(url, "get", null);
    }

    public getChampionSplashArt(championId: string, skinNum: number): Promise<DDragonApi> {
        let url = this.parseURL_resources(Constants.resources_url);
        url += `champion/splash/${championId}_${skinNum}.jpg`;
        // return url;
        return this.makeAResourceRequest(url, "get", null);
    }

    public getChampionLoadingImage(championId: string, skinNum: number): Promise<DDragonApi> {
        let url = this.parseURL_resources(Constants.resources_url);
        url += `champion/loading/${championId}_${skinNum}.jpg`;
        // return url;
        return this.makeAResourceRequest(url, "get", null);
    }
    
    public getSpellImage(spellId: string): Promise<DDragonApi> {
        let url = this.parseURL_resources(Constants.resources_url_versioned);
        url += `spell/${spellId}.png`;
        // return url;
        return this.makeAResourceRequest(url, "get", null);
    }
    
}