export const purgeStore = () => {
  return (dispatch) => {
    dispatch({ type: "PURGE_USERS" });
    dispatch({ type: "PURGE_CATEGORIES" });
    //dispatch({type: "PURGE_USERS"})
    //dispatch({type: "PURGE_USERS"})
  };
};

/* const players = ["sachin", "virat", "dhoni", "yuvi"];
const indices = [1, 2, 3];

function arrayExcept(players, indices) {
  return players.filter((ele, index) => {
    return !indices.includes(index);
  });
}
console.log(arrayExcept(players, indices)); */ // ['sachin','dhoni']

/* const employees = [
    { id: 1, name: 'emp1'},
    { id: 2, name: 'emp2'},
    { id: 3, name: 'emp3'}
]

const empIds = [1]

const selectedEmployees = employees.filter(emp => {
    return empIds.includes(emp.id)
})

console.log(selectedEmployees)

console.log(selectedEmployees.map(emp => emp.name))
console.log(selectedEmployees.map(emp => emp.name).join(', '))

 */
