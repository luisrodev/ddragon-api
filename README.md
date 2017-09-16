# ddragon-api

This API will help us in the communication with the [datadragon tool](http://ddragon.leagueoflegends.com/tool/).

## Install
```
$ npm install ddragon-api --save
```

## Test
```
// build command
$ npm run build

// test command
$ npm run test
```


## Usage
```javascript
const ddragonApi = require('ddragon-api');

// region used to get data.
const region = "na";

const ddragon = new ddragonApi.DDragonApi(region);

const championId = "Nidalee";

ddragon.getChampionById(championId).then((championData) => {
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

getProfileIcon(id: string);

getChampionSplashArt(championId: string, skinNum: nu,ber);

getChampionLoadingImage(championId: string, skinNum: number);

getSpellImage(spellId: string);
```