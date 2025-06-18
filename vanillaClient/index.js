
function pickPerson() {
  console.log('you clicked')
}

async function fetchPeople() {
  console.log('pressed me')
  const url = "http://localhost:3300/api/people"
  // fetch(url)
  //   .then(res => res.json())
  //   .then(people => {
  //     for (let person of people)
  //       renderPerson(person)
  //   })
  const people = await fetch(url).then(res => res.json())
  for (let person of people)
    renderPerson(person)

  console.log("After the promise")
}

function renderPerson(person) {
  const html = `
      <section class="person-card">
        <img src="./assets/images/${person.first}.png" alt="${person.first}" />
        <h3>${person.first} ${person.last}</h3>
        <p>Email: ${person.email}</p>
        <p>Phone: ${person.phone}</p>        
        <p>${person.about}</p>
      </section>
  `
  const wrapperSection = document.querySelector('#person-cards')
  wrapperSection.innerHTML += html;
}