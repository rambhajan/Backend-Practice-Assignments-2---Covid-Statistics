const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const details = require('./data.js');
const port = 8080


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connection } = require('./connector');
const e = require('express');

var infect = 0;

var deth = 0;
//console.log(details.data);
app.get('/totalRecovered', (req, res) => {
    var recover = 0;
    details.data.forEach(ele => {
        recover += ele.recovered 
    })
    res.send({data: {_id: "total", recovered:recover}})

    // console.log(recover);
})

app.get('/totalActive', (req, res) => {
    var TotalAct = 0;
    details.data.forEach(ele => {
        TotalAct += ele.infected - ele.recovered
    })
    res.send({data: {_id: "total", active:TotalAct}})
})

app.get('/totalDeath', (req, res) => {
    var TotDeath = 0;
    details.data.forEach(ele => {
        TotDeath += ele.death
    })
    res.send({data: {_id:"total", death:TotDeath}})
})

app.get('/hotspotStates', (req, res) => {
    var hots = [];
    details.data.forEach(ele => {
  var roundValue=  ((ele.infected - ele.recovered) / ele.infected).toFixed(5);
     if(roundValue > 0.1){
       var obj = {
            state: ele.state,
            rate: roundValue
        }
        hots.push(obj);
    }
    })

    res.send( {data: hots});
})

app.get('/healthyStates', (req, res) => {
    var mort = [];
    details.data.forEach(ele => {
  var roundValue = (ele.death / ele.infected).toFixed(5);
     if(roundValue < 0.005){
       var obj = {
            state: ele.state,
            mortality: roundValue
        }
        mort.push(obj);
    }
    })

    res.send( {data: mort});

})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;