import { Person } from "./Person"
import './People.css';

export const People = ({ people }) => {
  return (
    <section className="People">
      {people.map(p => <Person person={p} key={p.id} />)}
    </section>
  )
}