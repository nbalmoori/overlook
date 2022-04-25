const getFetch = (address) => {
  return fetch(`http://localhost:3001/api/v1/${address}`)
  .then(response => response.json())
  .catch((error) => {
    //remember to update to change HTML
    console.log('Error loading data. Please try again later.');
  });
};

const addBooking = (newBooking) => {
  fetch("http://localhost:3001/api/v1/bookings", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBooking)
  })
  .then(response => {
    if (!response.ok) {
      throw Error()
    } else {
      return response.json()
    }
  })
  .then(response => console.log("POSTED", response))
  // .then(response => refreshPantry(newIngredient.userID))
  .catch(error => {
    showError('There was an issue adding this booking. Try again!')
  });
}






export { getFetch, addBooking }
