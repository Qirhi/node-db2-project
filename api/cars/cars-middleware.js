const Car = require('./cars-model');
var vinValidator = require('vin-validator');
// (https://www.npmjs.com/package/vin-validator)


const checkCarId = async (req, res, next) => {
  try {
    const car = await Car.getById(req.params.id)
    if(car){
      console.log("car: ", car)
      req.car = car
      next()
    } else {
      res.status(404).json({ message: "car not found" })
    }
  } catch (err) {
    next(err)
  }
}

const checkCarPayload = async (req, res, next) => {
  const {vin, make, model, mileage, transmission, title} = req.body;

  let trimmedVin = undefined;
  let trimmedMake = undefined;
  let trimmedModel = undefined;


  if (typeof vin === "undefined") {
    res.status(400).json({ message: "vin is missing"})
  
  } else if (typeof make === "undefined") {
    res.status(400).json({ message: "make is missing"})

  } else if (typeof model === "undefined") {
    res.status(400).json({ message: "model is missing"})

  } else if (typeof mileage === "undefined") {
    res.status(400).json({ message: "mileage is missing"})

  } else {
    trimmedVin = vin.trim()
    trimmedMake = make.trim()
    trimmedModel = model.trim()


    const car = {
      vin: trimmedVin,
      make: trimmedMake,
      model: trimmedModel,
      mileage: mileage,
      title: title ? title.trim() : title,
      transmission: transmission ? transmission.trim() : transmission
    }

    req.car = car

    next();
  }
  console.log("Done with payload validation")
}

const checkVinNumberValid = (req, res, next) => {
  console.log("starting checkVinNumberValid: ", req.body.vin)
  let newVin = req.body.vin;
  newVin = newVin.trim().toLowerCase();
  console.log("Checking: ", newVin)
  let isValidVin = vinValidator.validate(newVin); 
  console.log("isValidVin", isValidVin)

  if(isValidVin){
    next()
  } else {
    res.status(400).json({ message: `vin ${newVin} is invalid` })
  }
  console.log("done with checkVinNumberValid")
};

const checkVinNumberUnique = (req, res, next) => {
  let newVin = req.body.vin;
  newVin = newVin.trim().toLowerCase();
console.log("we are in the checkVinNumberUnique")
  Car.getAll()
    .then ((cars) => {
      const existingVin = cars.find((car) => {
        return car.vin.trim().toLowerCase() === newVin;
      })

      if (existingVin) {
        return res.status(400).json({ message: `vin ${newVin} already exists` });
      } else {
        next();
      }
    })
    .catch((err) => {
      next(err);
    });
    console.log("done with checkVinNumberUnique")
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}