export function filterByType(list, entry) {
    if (entry) return list.filter((info) => info.type.includes(entry));//Filter is true/false.
    else return list;
  }

  export function filterByWeakness(list, entry) {
    if (entry) return list.filter((info) => info.weaknesses.includes(entry));//Filter is true/false.
    else return list;
  }

  export function filterBySearch(list, entry) {
    if (entry) return list.filter((info) => info.name.toLowerCase().includes(entry.toLowerCase()));//Filter is true/false.
    else return list;
  }


  
  export function getListOf(list, prop) {
    return [...new Set(list.map((pokemon) => pokemon[prop] || ""))]; //Set = collection with no dupes.
  } //Spread operator spreads out the array/adds each individual item.
  //"" placed so an empty string is returned incase the Property on the Film doesn't exist.
  
  //!!The important part here is the map. Set just eliminates dupes.!!