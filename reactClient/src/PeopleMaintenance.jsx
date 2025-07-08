import { use } from "react"
import { fetchPeople } from "./api/people"
import { Person } from "./Person"
import './PeopleMaintenance.css'

const promise = fetchPeople();

export const PeopleMaintenance = () => {
  const people = use(promise)
  return (
    <section className="PeopleMaintenance">
      {people.map(person => <Person person={person} key={person.id} />)}
    </section>
  )
}

