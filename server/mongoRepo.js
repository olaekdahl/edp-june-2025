import { MongoClient, ObjectId } from 'mongodb';

// Get connection to the mongo db
let db;
let client;
let peopleCollection;
try {
  const url = "mongodb://localhost:27017";
  client = await MongoClient.connect(url);
  db = client.db("peoplepicker");
  peopleCollection = db.collection("people");

} catch (ex) {
  console.error(`Couldn't connect to Mongo at ${url}. Error: ${ex.message}`)
  throw ex
}

/**
 * Retrieves all people in the DB
 * @returns {Promise<Person[]>} A promise that resolves to all people
 */
export const getAllPeople = async () => {
  const data = await peopleCollection.find().toArray();
  return data;
};

/**
 * Finds the person with the provided id.
 * @param {number} id - The ID of the person to find.
 * @returns {Promise<Person|undefined>} A promise that resolves to the person found or undefined if no person exists with that id.
 * 
 * Attempts to convert the id to a number if possible.
 */
export const getPerson = async (id) => {
  const person = await peopleCollection.findOne({ id: +id });
  return person;
};

/**
 * Finds the person with the provided ObjectId.
 * @param {string} oid - The ObjectId of the person to find.
 * @returns {Promise<Person|null>} A promise that resolves to the person found or null if no person exists with that ObjectId.
 */
export const getPersonByObjectId = async (oid) => {
  const person = await peopleCollection.findOne({ _id: ObjectId.createFromHexString(oid) });
  return person;
};

/**
 * Finds the first person in the DB with that first name
 * @param {string} firstName 
 * @returns {Promise<Person|undefined>} A promise that resolves to the person found or undefined if no person exists with that name
 */
export const getPersonByFirstName = async (firstName) => {
  const person = await peopleCollection.findOne({ firstName: firstName });
  return person;
};

/**
 * Inserts/Adds a new person to the DB
 * @param {Person} newPerson 
 * @returns {Promise<Person>} A promise that resolves to the new person added -- with their DB id!
 */
export const addPerson = async (newPerson) => {
  const result = await peopleCollection.insertOne(newPerson);
  return result;
};

/**
 * Deletes a person from the DB
 * @param {number} id The id of the person to delete
 * @returns {Promise<void>} A promise that resolves to void
 */
export const deletePerson = async (id) => {
  const result = await peopleCollection.deleteOne({ id: +id });
  return result;
};

/**
 * Updates/changes a person in the DB with the person passed in
 * @param {Person} newPerson The updated person
 * @returns {Promise<Person>} A promise that resolves to the updated person
 * 
 * newPerson must have an id. 
 */
export const updatePerson = async (id, newPerson) => {
  const result = await peopleCollection.updateOne({ id: +id }, { $set: newPerson });
  return result;
};


// Disconnect cleanly from the DB server
export function closeDataServer() {
  client.close();
}