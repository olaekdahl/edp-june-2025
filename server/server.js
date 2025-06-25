import express from 'express';
import cors from 'cors';
import { getAllPeople, getPerson, addPerson, updatePerson, deletePerson } from './fileRepo.js'

const port = 3300;
const app = express();
app.use(cors())
app.use(express.json())

//#region People routes
app.get('/api/people', (req, res) => {
  const people = getAllPeople()
  res.send(people)
})

app.get('/api/people/:id', (req, res) => {
  const id = +req.params.id;
  const person = getPerson(id)
  res.send(person)
})

app.post('/api/people', (req, res) => {
  const newPerson = req.body;
  const personAdded = addPerson(newPerson);
  res.send(personAdded);
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
  console.log(existingPerson)
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

app.listen(port, () => console.log(`Listening for http requests on port ${port}`))
