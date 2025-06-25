import { useState } from 'react';
import { People } from './People';
import './App.css'
import { fetchPeople } from './api/people';

function App() {
  const [people, setPeople] = useState([]);
  console.log(people)

  function pickPerson() {
    return undefined;
  }

  const reset = async () => {
    const ppl = await fetchPeople();
    setPeople(ppl)
  }
  return (
    <>
      <header>
        <h1>All the super cool people</h1>
        <h2>From the best Travelers EDP cohort</h2>
      </header>
      <main>
        <button className="btn btn-primary" onClick={() => pickPerson()}>Pick person</button>
        <button className="btn btn-secondary" onClick={() => reset()}>Reset</button>
        <h1>Picked Person</h1>
        <section id="picked-person">
        </section>
        <h1>Unpicked People</h1>
        <People people={people} />
        <h1>Picked People</h1>
        <section id="picked-people">
        </section>
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
