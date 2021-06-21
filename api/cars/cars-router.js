const router = require('express').Router();
const db = require('../../data/db-config.js');
const { 
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique    
} = require('./cars-middleware');
const Car = require('./cars-model');



router.get('/', async (req, res, next) => {
    console.log("ping")
    try {
        console.log("in the try router get")
        const cars = await Car.getAll() 
        console.log("cars: ", cars)
        res.status(200).json(cars)
      } catch (err) {
        next(err)
      }
});

router.get('/:id', checkCarId, async (req, res, next) => {
    res.status(200).json(req.car)
});

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
    const carData = req.car;
    console.log("carData: ", carData);
    try {
        const postedCar = await Car.create(carData)
        console.log("postedCar: ", postedCar);
        res.status(201).json(postedCar);
      } catch (err) {
        console.log("Error in create: ", err)
        next(err)
      }
});

module.exports = router;
