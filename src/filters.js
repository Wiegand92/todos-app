const filter = {
  text: '',
  hideCompleted: false
}

const getFilters = () => filter

const setFilters = (newFilter) => {
  if(newFilter.text !== undefined) {
    filter.text = newFilter.text
  } 

  if(newFilter.hideCompleted) {
    filter.hideCompleted = newFilter.hideCompleted
  } else if(newFilter.hideCompleted === false) {
    filter.hideCompleted = false
  }
}

export { getFilters, setFilters }