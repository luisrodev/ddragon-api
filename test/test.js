var http = require('http');
var api = require('../index');

// const ddragon = new api.DDragonApi("es_MX", "7.17.2");
const region = "na";
console.log(region);
const ddragon = new api.DDragonApi(region);


http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/plain'})
    
    

    // ddragon.getChampionById("Elise").then((data) => {
    //     console.log("DATA: ", data)
    // }).catch((err) => {
    //     console.log(err);
    // })
    ddragon.getChampionSquare("Rengar").then((data)=>{
        console.log("data: ", data.url);
    }).catch((err) =>{
        console.log(err);
    })

    res.end('Hello world!');
}).listen(8081);

console.log('Server running on port 8081');