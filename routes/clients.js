//import { resolve } from 'dns';

var express = require('express');
var router = require('express').Router();
var Client = require('./../models/Client');
var Type = require('./../models/Type');


router.get('/', (req, res)=> {
    Client.find({}).populate('types').then(clients=>{
        res.render('clients/index.html', {clients:clients})
    });
});


router.get('/new', (req,res) => {
    Type.find({}).then(types => {
        var client = new Client();
        res.render('clients/edit.html', {client:client , types:types, endpoint:'/'});
    })
});

router.get('/edit/:id', (req,res) => {
    Type.find({}).then(types => {
        Client.findById(req.params.id).then(client => {
            res.render('clients/edit.html' , {client:client , types:types, endpoint:'/'+ client._id.toString() });
        });
    });
});

router.get('/delete/:id', (req,res) => {
    Client.findOneAndRemove({_id: req.params.id}).then(() => {
        res.redirect('/');
    });
})


router.get('/:id' , (req,res) => {
    Client.findById(req.params.id).populate('types').then(client =>{
        res.render('clients/show.html', {client:client});
    },
    err => res.status(500).send(err));
});


router.post('/:id?', (req,res) => {
    new Promise((resolve,reject) => {
        if(req.params.id) {
            Client.findById(req.params.id).then(resolve,reject);
        }
        else {
            resolve(new Client())
        }
    }).then(client => {
        client.name = req.body.name;
        client.description = req.body.description;
        client.number = req.body.number;
        client.types = req.body.types;

        if(req.file) client.picture = req.file.filename;

        return client.save();
    }).then(() => {
        res.redirect('/');
    })
});

module.exports = router;

/*
var router = require('express').Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Pokedex');
var conn = mongoose.connection;
require('mongoose').set('debug', true);

var Client = require('./../models/Client.js');


var bulbi = {
    name : 'bulbi',
    description : 'joli poke'
}



router.get('/', function (req,res) {

    Client.find({'name':'bulbi'}).then(clients => {
        res.render('Clients/index.html', {clients: clients});
        console.log( "l'etat de la connexion est:" + mongoose.connection.readyState);
    });
    //conn.collection('Clients').insert(bulbi);  // Inserted correctly one element
    
    
   //res.render('clients/index.html');
   //res.send(Client.find({"name":"bulbi"}));
});


module.exports = router;
*/