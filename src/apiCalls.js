const getFetch = (address) => {
  return fetch(`http://localhost:3001/api/v1/${address}`)
  .then(response => response.json())
  .catch((error) => {
    //remember to update to change HTML
    console.log('Error loading data. Please try again later.');
  });
};

export { getFetch }
