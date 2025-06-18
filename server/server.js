import express from 'express';
import cors from 'cors';
import { getAllPeople, getPerson, addPerson } from './fileRepo.js'

const port = 3300;
const app = express();
app.use(cors())

app.get('/api/people', (req, res) => {
  console.log('got the request')
  const people = getAllPeople()
  res.send(people)
})

app.listen(port)


function choosePerson() {
  const chosenPerson = people[Math.floor(Math.random() * people.length)]
  return chosenPerson
}

