// import the fs liby
import fs from 'fs'

const dbFile = './db.json';
let people = await readPeopleFromDb();

/**
 * Retrieves all people from the database
 * @returns a list of all people
 */
export const getAllPeople = () => people;

/**
 * Retrieves one person by id
 * @param {number} id 
 * @returns the person with that id
 */
export const getPerson = (id) => { }

/**
 * Inserts a new person into the database
 * @param {Person} person 
 * @returns the person (but now they have a DB id)
 */
export const addPerson = (person) => {
  const newPerson = { id: getNextId(people), ...person }
  people = [...people, newPerson];
  savePeopleToDb();
}

/**************************************************************/
// Private/local functions below
/**************************************************************/

const getNextId = (people) => {
  const biggestId = Math.max(...people.map(p => p.id));
  if (isNaN(biggestId)) throw new Error("Error getting the next ID.")
  return biggestId + 1;
}

const savePeopleToDb = () => {
  fs.writeFileSync(dbFile, JSON.stringify(people, null, 2))
}

async function readPeopleFromDb() {
  const promise = fs.promises.readFile(dbFile, 'utf8');
  return await promise.then(d => JSON.parse(d))
}