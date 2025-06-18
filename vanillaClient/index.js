
function pickPerson() {
  console.log('you clicked')
}

/**
 * Makes a GET request for all the people and renders them when they arrive.
 */
async function fetchPeople() {
  const url = "http://localhost:3300/api/people"
  const people = await fetch(url).then(res => res.json())
  // Old way with a for-of loop:
  // let html = '';
  // for (let person of people)
  //   html += makePersonSection(person)
  // Refactored way with a .map() 🔥
  let html = people.map(person => makePersonSection(person)).join('')
  renderPersonSection(html)
}

/**
 * Creates the HTML to render for a person object
 * @param {Person} person 
 * @returns {string} The HTML 
 */
function makePersonSection(person) {
  return `
      <section class="person-card">
        <img src="./assets/images/${person.first}.png" alt="${person.first}" />
        <h3>${person.first} ${person.last}</h3>
        <p>Email: ${person.email}</p>
        <p>Phone: ${person.phone}</p>        
        <p>${person.about}</p>
      </section>
  `
}

/**
 * Crams the html in the section with an id of person-cards
 * @param {string} html 
 */
function renderPersonSection(html) {
  const wrapperSection = document.querySelector('#person-cards');
  try {  // <-- In case the section wasn't found. (It's an error to refer to the innerHTML of a 'null')
    wrapperSection.innerHTML = html;
  } catch (e) {
    console.error("No person cards section was found. Refresh the page.")
  }
}
