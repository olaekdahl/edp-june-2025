export const Person = ({ person }) => {
  return (
    <>
      <section className="person-card">
        <img src={"./assets/images/" + person?.first + ".png"} alt={person?.first} />
        <h3>{person?.first} {person?.last}</h3>
        <p>Email: {person?.email}</p>
        <p>Phone: {person?.phone}</p>
        <p>{person?.about}</p>
      </section>
    </>
  )
}