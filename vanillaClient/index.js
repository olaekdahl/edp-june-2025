let unpickedPeople = []
let pickedPeople = []
let pickedPerson = undefined
const unpickedPeopleSection = document.querySelector('#unpicked-people');
const pickedPersonSection = document.querySelector('#picked-person');
const pickedPeopleSection = document.querySelector('#picked-people');

function pickPerson() {
  if (unpickedPeople.length === 0) {
    alert("No more unpicked people");
    return;
  }

  if (pickedPerson !== undefined) {
    pickedPeople = [...pickedPeople, pickedPerson];
  }

  const randomIndex = Math.floor(Math.random() * unpickedPeople.length);
  const person = unpickedPeople[randomIndex];
  pickedPerson = person;
  unpickedPeople = [...unpickedPeople.filter((p) => p !== pickedPerson)];

  let html = unpickedPeople.map(person => makePersonSection(person)).join('')
  render(html)

  console.log({ pickedPeople, pickedPerson, unpickedPeople })
}

/**
 * Makes a GET request for all the people and renders them when they arrive.
 */
async function reset() {
  const url = "http://localhost:3300/api/people"
  const people = await fetch(url).then(res => res.json())
  unpickedPeople = people;
  pickedPeople = []
  pickedPerson = undefined;
  // Old way with a for-of loop:
  // let html = '';
  // for (let person of people)
  //   html += makePersonSection(person)
  // Refactored way with a .map() 🔥
  render()
  console.log({ pickedPeople, pickedPerson, unpickedPeople })
}

/**
 * Creates the HTML to render for a person object
 * @param {Person} person 
 * @returns {string} The HTML 
 */
function makePersonSection(person) {
  return `
      <section class="person-card">
        <img src="${person?.imageUrl}" alt="${person?.first}" />
        <h3>${person?.first} ${person?.last}</h3>
        <p>Email: ${person?.email}</p>
        <p>Phone: ${person?.phone}</p>        
        <p>${person?.about}</p>
      </section>
  `
}

/**
 * Crams the html in the section with an id of person-cards
 * @param {string} html 
 */
function render() {
  let unpickedPeopleHtml = unpickedPeople.map(person => makePersonSection(person)).join('')
  let pickedPersonHtml = makePersonSection(pickedPerson)
  let pickedPeopleHtml = pickedPeople.map(person => makePersonSection(person)).join('')

  // try {  // <-- In case the section wasn't found. (It's an error to refer to the innerHTML of a 'null')
  unpickedPeopleSection.innerHTML = unpickedPeopleHtml;
  pickedPersonSection.innerHTML = pickedPersonHtml;
  pickedPeopleSection.innerHTML = pickedPeopleHtml;
  // } catch (e) {
  //   console.error("No person cards section was found. Refresh the page.")
  // }
}
