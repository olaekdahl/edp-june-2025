import { Person } from "./Person"

export const People = ({ people }) => {
  return (
    <section id="unpicked-people">
      {people.map(p => <Person person={p} key={p.id} />)}
    </section>
  )
}