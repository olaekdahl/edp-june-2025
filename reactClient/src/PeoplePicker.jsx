import { useEffect, useState } from 'react';
import { People } from './People';
import { fetchPeople } from './api/people';
import { Person } from './Person';
import './PeoplePicker.css'

export const PeoplePicker = () => {
  const [pickedPerson, setPickedPerson] = useState(undefined)
  const [unpickedPeople, setUnpickedPeople] = useState([]);
  const [pickedPeople, setPickedPeople] = useState([])

  useEffect(() => {
    reset();
  }, []);

  return (
    <>
      <h1>All the super cool people</h1>
      <h2>From the best Travelers EDP cohort</h2>
      <button className="btn btn-primary" onClick={(e) => pickPerson()}>Pick person</button>
      <button className="btn btn-secondary" onClick={() => reset()}>Reset</button>
      <h1>Picked Person</h1>
      <section id="picked-person">
        {pickedPerson && <Person person={pickedPerson} />}
      </section>

      <h1>Unpicked People</h1>
      <People people={unpickedPeople} />

      <h1>Picked People</h1>
      <People people={pickedPeople} />
    </>
  )


  function pickPerson() {
    // Put the OLD pickedPerson in the pickedPeople array
    if (pickedPerson) {
      let tempArray = [...pickedPeople, pickedPerson]
      setPickedPeople(tempArray)
    }
    // Pick a random person, move them to 'picked', remove them from 'unpicked'
    let newPickedPerson = unpickedPeople[Math.floor(Math.random() * unpickedPeople.length)]
    setPickedPerson(newPickedPerson);
    const newUnpickedPeople = unpickedPeople.filter(p => p !== newPickedPerson)
    setUnpickedPeople(newUnpickedPeople);
  }

  async function reset() {
    const ppl = await fetchPeople();
    setUnpickedPeople(ppl)
    setPickedPerson(undefined)
    setPickedPeople([])
  }

}