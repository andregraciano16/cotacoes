const request = require('request')
const cotacao = (symbol, callback) => {

    const api_token = 'igx3Y4qQTcz0kl7fvXGC489VBo84BiKtBS5j3Ibw06Q6fUObZRvYoUoJJA39'
    const url = `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol},TWTR,VOD.L&api_token=${api_token}`

    request({url: url, json: true}, (err, response) => {
        if(err){
            return callback({
                message : `Something went wrong: ${err}`
            }, 
            undefined)
        } 

        if(response.body.data === undefined || response.body.data === undefined) {
            return callback({
                message : 'No data found'
            }, undefined)
        }

        const parsedJSON = response.body.data[0]
        const {symbol, price_open, price, day_high, day_low} = parsedJSON
        
        callback(undefined, {symbol, price_open, price, day_high, day_low})
    })
}

module.exports = cotacao