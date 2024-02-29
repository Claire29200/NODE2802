const express = require('express') 
const mysql = require('mysql2')// framework web


const app = express()
const port=8080

const bdd = require('./model/pool.js')

app.use(express.urlencoded({ extended : false }))
// permet la récupération des champs post
app.use(express.json())
// permet l'échange de données au format JSON

app.set('views', __dirname + '/view')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send('Bienvenue')
})
app.get('/acteur/:id', (req, res) => {
   bdd.getActeur(req.params.id, function(row){
   res.render('acteur', {acteur: row})
   })

})
app.get('/acteurs', (req, res) => {
    bdd.getAllActor( function(row){
    res.render('acteurs', {acteurs: row})
    })
 
 })
app.get('/realisateur/:id', (req, res) => {
    bdd.getRealisateur(req.params.id, function(row){
    res.render('realisateur', {realisateur: row})
    })
    
})
app.get('/realisateurs', (req, res) => {
    bdd.getAllRealisateur( function(row){
    res.render('realisateurs', {realisateurs: row})
    })
 
 })
 app.get('/ajout_acteur', (req, res) => {
    res.render('ajout_acteur')
       
    })
    app.post('/send', (req, res) => { 
        
        bdd.AddActor( req.body , function(r){
                if (r) { res.redirect('/acteurs') } else { res.send('err') }
        
        })})
 
app.listen(port, () => {console.log('listen to port'+ port)})

