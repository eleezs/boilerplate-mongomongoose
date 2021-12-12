const mongoose = require('mongoose')
require('dotenv').config();

//connect to mongodb and creating a db
let url ="mongodb://localhost:27017/freeCodeCamp";

mongoose.connect(url, function(err, db){
  if(err) throw err;
  console.log('Mongodb Connected and Database created')
  db.close
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age :{
    type: Number
  },
  favoriteFoods :{
    type: [ String ]
  } 
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let newPerson = new Person ({name: 'Uche', age: 12, favoriteFoods: ['rice', 'beans']});
  newPerson.save((err, data)=>{
    if (err) return console.log(err)
    done(null , data);
  });
 
};

//array of people
let arrayOfPeople =[
  {name: 'Uche', age: 12, favoriteFoods: ['rice', 'beans']}, 
  {name: 'Obi', age: 15, favoriteFoods: ['garri', 'beans']}
] 

const createManyPeople = (arrayOfPeople, done) => {
  let newPersons = Person.create((arrayOfPeople), (err, data) => {
    if (err) return console.log(err)

    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name : personName}, (err, data) => {
    if (err) return console.log(err)

    done(null, data);
  })
  
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods : food}, (err, data) =>{
    if (err) return console.log(err)

    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id : personId}, (err, data) => {
    if (err) return console.log(err)

    done(null, data);
  })
 
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id : personId}, (err, person) => {
    if (err) return console.log(err)

    person.favoriteFoods.push(foodToAdd);

    person.save((err, data) => {
      if (err) return console.log(err)
      done(null, data);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name : personName}, {age : ageToSet}, {new : true}, (err, data) => {
    if (err) return console.log(err)

    done(null,  data);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id :personId}, (err, data) =>{
    if (err) return console.log(err)

    done(null, data);
  })
 
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name : nameToRemove}, (err, response) => {
    if (err) return console.log(err);

    done(null, response);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods : foodToSearch}).sort({name :'asc'}).limit(2).select({age :0}).exec((err, data) => {
    if (err) return console.log(err);

    done(null, data);
  })

  
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
