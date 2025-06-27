import { useEffect, useState } from 'react';
import { People } from './People';
import { Person } from './Person';
import './App.css'
import { fetchPeople } from './api/people';

function App() {
  const [unpickedPeople, setUnpickedPeople] = useState([]);
  const [pickedPerson, setPickedPerson] = useState(undefined)
  const [pickedPeople, setPickedPeople] = useState([])

  useEffect(() => {
    reset();
  }, []);


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

  return (
    <>
      <header>
        <h1>All the super cool people</h1>
        <h2>From the best Travelers EDP cohort</h2>
      </header>
      <main>
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

      </main>
      <footer>
        <section>
          Copyright &copy; 2025 The best cohort
        </section>
      </footer>
    </>
  )
}

export default App
