# ddragon-api

This API will help us in the communication with the [datadragon tool.](http://ddragon.leagueoflegends.com/tool/).

## Install
```
$ npm install ddragon-api --save
```


## Usage
```javascript
const ddragonApi = require('ddragon-api');

const ddragon_language = "en_US"; //Language used on the data of responses.
const ddragon_version = "7.17.2"; //Version of the data we will get.

const ddragon = new ddragonApi.DDragonApi(ddragon_language, ddragon_version);

const championId = "Nidalee";

ddragon.getChampionDataById(championId).then((championData) => {
    console.log(champData);
}).catch((error) => {
    console.log(error);
})
```
## Data Request Methods

```javascript
getChampions();

getChampionById(id: string);

getProfileIcons();

getSummoners();
```

## Resources Request Methods

```javascript
getChampionSquare(id: string);
```