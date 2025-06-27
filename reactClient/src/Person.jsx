import './Person.css'
export const Person = ({ person }) => {
  return (
    <>
      <section className="Person">
        <img src={person?.imageUrl} alt={person?.first} />
        <h3>{person?.first} {person?.last}</h3>
        <p>Email: {person?.email}</p>
        <p>Phone: {person?.phone}</p>
        <p>{person?.about}</p>
      </section>
    </>
  )
}