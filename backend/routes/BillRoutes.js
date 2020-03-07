const express = require('express');
const app = express.Router();
const Repositories = require('../repositories/Repositories');
const { MonthRepository } = Repositories;
const { BillsRepository } = Repositories;
const { HeatingRepository } = Repositories;
const { PricesRepository } = Repositories;

app.get('/months', (_,res) => {
    MonthRepository.findAll().then((months) => {
        res.json(months);
    }).catch((error) => console.log(error));
});

app.post('/months', (req, res) => {
    const { month } = req.body;
    MonthRepository.create(month).then((month) => {
        res.json(month);
    }).catch((error) => console.log(error));
});

app.delete('/months/:id', (req, res) => {
    const { id } = req.params;
    MonthRepository.deleteById(id).then((ok) => {
        console.log(ok);
        console.log(`Deleted record with id: ${id}`);
        res.status(200).json(["Ok"]);
    }).catch((error) => console.log(error));
})

app.get('/prices', (_,res) => {
    PricesRepository.findAll().then((prices) => {
        res.json(prices);
    }).catch((error) => console.log(error));
});

app.post('/prices', (req, res) => {
    const { prices } = req.body;
    PricesRepository.create(prices).then((prices) => {
        res.json(prices);
    }).catch((error) => console.log(error));
});

app.delete('/prices/:id', (req, res) => {
    const { id } = req.params;
    PricesRepository.deleteById(id).then((ok) => {
        console.log(ok);
        console.log(`Deleted record with id: ${id}`);
        res.status(200).json(ok);
    }).catch((error) => console.log(error));
})

app.get('/bills', (req, res) => {
    BillsRepository.findAll().then((bills) => {
        res.json(bills);
    }).catch((error) => console.log(error));
});

app.post('/bills', (req, res) => {
    const { bill } = req.body;
    BillsRepository.create(bill).then((bill) => {
        res.json(bill);
    }).catch((error) => console.log(error));
});

app.put('/bills/:id', (req, res) => {
    const { id } = req.params;
    const { bill } = req.body;
    BillsRepository.updateById(id, bill)
        .then((bill) => {
            res.json(bill);
        }).catch((error) => console.log(error));
});

app.get('/heating', (req, res) => {
    HeatingRepository.findAll().then((heating) => {
        res.json(heating);
    }).catch((error) => console.log(error));
});

app.post('/heating', (req, res) => {
    const { heating } = req.body;
    HeatingRepository.create(heating).then((heating) => {
        res.json(heating);
    }).catch((error) => console.log(error));
});

app.put('/heating/:id', (req, res) => {
    const { id } = req.params;
    const { heating } = req.body;
    HeatingRepository.updateById(id, heating)
        .then((heating) => {
            res.json(heating);
        }).catch((error) => console.log(error));
});

module.exports = app;