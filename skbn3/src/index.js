import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch'
import getPCItmes from './pcitems';
import _ from 'lodash';


const app = express();
app.use(cors());



var pets_data;
fetch('https://gist.githubusercontent.com/isuvorov/55f38b82ce263836dadc0503845db4da/raw/pets.json')
  .then(async (res) => {
    pets_data = await res.json();
});

app.get('/task3a', async (req, res) => {

  var items =  await getPCItmes();
  return res.json(items);
});

app.get('/task3a/volumes', async (req, res) => {

  var items =  await getPCItmes();
  var result = {}
  items.hdd.forEach(function (item){
      var old_value = result[item.volume] || 0;
      result[item.volume] = old_value+item.size;
  });

  for(var index in result) {
    result[index] = result[index]+'B';
  }
  return res.json(result);
});

app.get('/task3a/*', async (req, res) => {

  var items =  await getPCItmes();
  var result = items;
  var path_steps = req.params[0].split('/');

  path_steps.forEach(function (item)
  {
      if(item=='' || result==undefined)
        return;

      if(typeof result =='string'){
        result = undefined;
        return;
      };
      if (result!=undefined){
          if (Array.isArray(result) && isNaN(item)){
              result=undefined;
          }
          else {
              result = result[item];
          }
      }
  })
  if (typeof result == "undefined") res.status(404).send('Not Found');
  if (result == null) return res.send(result+'');
  if (typeof result !== "object") return res.json(result);
  if (Object.keys(result).length>0) return res.json(result);
  res.status(404).send('Not Found');
})


function notFound(res) {
    return res.status(404).send("Not Found");
  }

  function sendPetsByUserId(id, res) {
    if (id) {
      const pets = pets_data.pets.slice()
        .filter(item => item.userId == id);
      if (pets.length>0) {
        return res.json(pets);
      }
    }
    notFound(res);

  }

  function populateUsers(users, req) {
    let pets = pets_data.pets.slice();
    let myUsers = users.slice();

    const q = req.query;
    if (q.havePet) {
      let petsFiltered = pets.filter( pet => pet.type === q.havePet);
      const usersWithPetsIDs = petsFiltered
        .filter(pet => pet.type === q.havePet)
        .map(pet => pet.userId);
      myUsers = myUsers.filter(user => _.indexOf(usersWithPetsIDs, user.id)!==-1);
    }

    myUsers = myUsers.map( user => ({
      ...user,
      pets: pets.filter( pet => pet.userId === user.id )
    }));

    return myUsers;
  }

  app.get('/task3b/', async (req, res) => {
    res.json(pets_data);
  });


  app.get('/task3b/users', (req, res) => {
    const q = req.query;
    let users = pets_data.users.slice();

    if (q.havePet) {
      const usersWithPetsIDs = pets_data.pets.slice()
        .filter(pet => pet.type === q.havePet)
        .map(pet => pet.userId);
      users = users.filter(user => _.indexOf(usersWithPetsIDs, user.id)!==-1);
    }
    return res.json(users);
  });


  app.get('/task3b/users/populate', (req, res) => {
    let users = pets_data.users.slice();
    console.log(users);
    return res.json(populateUsers(users, req));
  });


  app.get('/task3b/users/:id', (req, res) => {
    const p = req.params;
    const re = /[\d]+/;

    if (p.id) {
      let users = pets_data.users.slice();
      if (re.test(p.id)) {
          users = users.filter(item => item.id == p.id);
        if (users.length > 0) {
          return res.json(users[0]);
        }
      } else {
          users = users.filter(item => item.username == p.id);
        if (users.length>0) {
          return res.json(users[0]);
        }
      }
    }
    return res.status(404).send("Not Found");
  });


  app.get('/task3b/users/:id/populate', (req, res) => {
    const p = req.params;
    const re = /[\d]+/;
    console.log('Yo!', p);

    if (p.id) {
      let users = pets_data.users.slice();
      if (re.test(p.id)) {
          users = users.filter(item => item.id == p.id);
          console.log('id', users);
        if (users.length>0) {
          return res.json(populateUsers(users, req)[0]);
        }
      } else {
          users = users.filter(item => item.username == p.id);
          console.log('username', users);
        if (users.length>0) {
          return res.json(populateUsers(users, req)[0]);
        }
      }
    }
    return res.status(404).send("Not Found");
  });


  app.get('/task3b/users/:id/pets', (req, res) => {
    const p = req.params;

    console.log(p);
    if (p.id) {
      if (Number.isInteger(p.id)) {
        return sendPetsByUserId(p.id, res)
      } else {
        const users = pets_data.users.slice()
          .filter(user => user.username == p.id);
        if (users.length>0) {
          const id = users[0].id;

          return sendPetsByUserId(id, res);
        }
      }
    }
    return notFound(res);
  });


  app.get('/task3b/pets', (req, res) => {
    const q = req.query;
    let pets = pets_data.pets.slice();
    if (q.type) {
      pets = pets.filter(item => item.type === q.type);
    }
    if (q.age_gt) {
      pets = pets.filter(item => item.age > q.age_gt);
    }
    if (q.age_lt) {
      pets = pets.filter(item => item.age < q.age_lt);
    }
    return res.json(pets);

  });

  app.get('/task3b/pets/populate', (req, res) => {
    let pets = pets_data.pets.slice();
    let users = pets_data.users.slice();
    const q = req.query;
    if (q.type) { pets = pets.filter( pet => pet.type === q.type); }
    if (q.age_gt) { pets = pets.filter( pet => pet.age > q.age_gt); }
    if (q.age_lt) { pets = pets.filter( pet => pet.age < q.age_lt); }

    let myPets = pets.map( pet => ({
      ...pet,
      user: users.filter( user => pet.userId === user.id )[0]
    }));
    return res.json(myPets);
  });

  app.get('/task3b/pets/:id', (req, res) => {
    const p = req.params;
    let pets = pets_data.pets.slice().filter(pet => pet.id == p.id);
    console.log(p.id, pets);
    if (pets.length > 0) {
      return res.json(pets[0]);
    }
    return notFound(res);
  });

  app.get('/task3b/pets/:id/populate', (req, res) => {
    const p = req.params;
    const pets = pets_data.pets.slice();
    let pet = { ...pets.filter(pet => pet.id == p.id)[0]};
    const users = pets_data.users.slice();
    if (pet) {
      const petUser = users.filter( user => pet.userId === user.id )[0];
      console.log(petUser);
      if (petUser) {
        pet.user = petUser;
        console.log(pet);
      }
      return res.json(pet);
    }
    return notFound(res);
  });

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
