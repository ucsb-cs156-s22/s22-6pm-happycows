
export function sortByWealth(userCommonsArray, returnArraySize = userCommonsArray.length){
  return userCommonsArray.sort((a, b) => {
    return b.totalWealth - a.totalWealth;
  }).slice(0, returnArraySize);
}

export function sortByNumCows(userCommonsArray, returnArraySize = userCommonsArray.length){
  return userCommonsArray.sort((a, b) => {
    return b.numOfCows - a.numOfCows;
  }).slice(0, returnArraySize);
}

export function sortByCowHealth(userCommonsArray, returnArraySize = userCommonsArray.length){
  //sorts in decreasing order, so the comparison function returns a negative when the first parameter is larger
  return userCommonsArray.sort((a, b) => {
    return b.cowHealth - a.cowHealth;
  }).slice(0, returnArraySize);
}
