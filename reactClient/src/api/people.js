
const url = `http://localhost:3300/api/people`;

export function fetchPeople() {
  return fetch(url).then(res => res.json())
}