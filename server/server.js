import express from 'express';  // Module (new) imports
// const express = require('express')  // CommonJS (old) imports
import cors from 'cors';
import { getAllPeople, getPerson, addPerson, updatePerson, deletePerson } from './fileRepo.js'

const port = 3300;
const app = express();
app.use(cors())
app.use(express.json())

// If you want to log the request, uncomment the next line.
// app.use(logger)

//#region People routes
app.get('/api/people', async (req, res) => {
  const people = getAllPeople()
  res.send(people)
})

app.get('/api/people/:id', async (req, res) => {
  const id = +req.params.id;
  const person = getPerson(id)
  if (!person) {
    res.status(404).send("No person with that id")
  }
  res.send(person)
})

app.post('/api/people', async (req, res) => {
  const newPerson = req.body;
  const personAdded = addPerson(newPerson);
  res.status(201).send(personAdded);
})

app.delete("/api/people/:id", async (req, res) => {
  const id = +req.params.id;
  const person = await getPerson(id);
  if (!person) {
    res.status(404).send("No person with that id")
  }
  await deletePerson(id);
  res.status(200).send(`'Person ${id}' successfully deleted`)
});

// TODO app.put()
app.put("/api/people/:id", async (req, res) => {
  res.set('Allow', 'GET, POST, PATCH, DELETE');
  res.status(405).send()
})

app.patch("/api/people/:id", async (req, res) => {
  const id = +req.params.id;
  const existingPerson = await getPerson(id);
  if (!existingPerson) {
    res.status(404).send(`No person with id ${id}`);
    return;
  }
  const personToUpdate = req.body;
  const updatedPerson = await updatePerson(id, personToUpdate)
  res.status(200).send(updatedPerson);
});

// Insert a new person
app.post("/api/people", async (req, res) => {
  //TODO: Add checks here for required fields, good data types, etc. Return 400 if bad data was submitted.
  const newPerson = {
    firstName: req.body.first ?? "",
    lastName: req.body.last ?? "",
    phone: req.body.phone ?? "",
    email: req.body.email ?? "",
    about: req.body.about ?? "",
    imageUrl: req.body.imageUrl ?? "",
  }
  const newPersonWithId = await addPerson(newPerson);
  res.status(201).send(newPersonWithId);
});
//#endregion

// Now look for static content under the vanillaClient folder
app.use(express.static('../vanillaClient'))

app.listen(port, () => console.log(`Listening for http requests on port ${port}`))

/** Utility functions */
function logger(req, res, next) {
  console.log({ req, res });
  next();
}