const express = require('express');
const app = express.Router();
const Repositories = require('../repositories/Repositories');
const { MonthRepository } = Repositories;
const { BillsRepository } = Repositories;
const { HeatingRepository } = Repositories;
const { PricesRepository } = Repositories;

const { CostCalculator } = require('../modules/CostCalculator');

app.get('/allmonths', (_,res) => {
    MonthRepository.findAll().then((months) => {
        res.json(months);
    }).catch((error) => console.log(error));
});


app.get('/months/:year/:month', (req,res) => {
    const { year } = req.params;
    const { month } = req.params;
    MonthRepository.findByYearAndMonth(year,month).then((month) => {
        // console.log(month);
        if(month) {
            console.log('Return month');
            var response = {month: month};
            BillsRepository.findByMonthId(month._id).then((bills) => {
                response.meters = bills;
                HeatingRepository.findByMonthId(month._id).then((heating) => {
                    response.heatings = heating;
                    res.json(response);
                }).catch((err) => console.log(err));
            }).catch((err) => console.log(err));
            // console.log(month);
            // res.json(month);
        } else {
            res.json({month: month});
        }
    }).catch((err) => console.log(err));

});

app.post('/testmonths', (req, res) => {
    res.json('just testmonhts')
})
app.post('/months/:year/:monthid', (req, res) => {
    const { year } = req.params;
    const { monthid } = req.params;  
    const { month } = req.body;
    const costCalculator = new CostCalculator(year, monthid);
    costCalculator.generateCosts(year, monthid, month).then((data) => {
        res.json(data);
    }).catch((error) => console.log(error));
});

app.post('/newmonth/:monthcode', (req, res) => {
    const { monthcode } = req.params;
    const costCalculator = new CostCalculator(monthcode,req.body);
    costCalculator.generateCosts(monthcode, req.body).then((data) => {
        res.json(data);
    }).catch((error) => console.log(error));
});

app.put('/months/:monthid', (req,res) => {
    const { monthid } = req.params;
    const { month } = req.body;
    console.log(monthid);
    console.log(month);
    MonthRepository.updateById(monthid, month).then((ok) => {
        res.json("Ok")
    }).catch((err) => console.log(err));
})

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

app.delete('/bills/:id',(req,res) => {
    const { id } = req.params;
    BillsRepository.deleteById(id).then((ok) => {
        res.json(ok);
    }).catch((error) => console.log(error));
})


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

app.delete('/heating/:id', (req, res) => {
    const { id } = req.params;
    HeatingRepository.deleteById(id).then((heating) => {
        res.json(heating);
    }).catch((err) => console.log(err));
})

module.exports = app;
