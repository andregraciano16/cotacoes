const path = require('path')
const hbs = require('hbs')
const express = require('express')
const cotacoes = require('./util/cotacao')

const app = express()

console.log(__dirname)
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath)) 

app.get('', (req, res) => {
    res.render('index', {
        title: 'Bem vindo ao sistema de cotações',
        author: 'André'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Bem vindo ao About',
        author: 'André'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Bem vindo ao Help',
        author: 'André'
    })
})

app.get('/cotacoes', (req, res) => {
    if(!req.query.ativo){
        return res.status(400).json({
           error : {
               message : 'O ativo deve ser informado como query parameter',
               code : 400
            }
        })
    }
    
    const symbol = req.query.ativo.toUpperCase();
    cotacoes(symbol, (err, data) => {
        if(err){
            return res.status( {error : {
                message : err.message,
                code : 400
            }}).json(message)
        }
        console.log(data)
        res.status(200).json(data)
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        author: 'André',
        errorMessage: 'Página não encontrada'
    })
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server is up on por 3000')
})