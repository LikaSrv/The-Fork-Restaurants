// Todo: Use the Fork Api to get a
// filtered list of restaurants, depending on
// the category selected (and as a bonus, the location)

const searchForm = document.getElementById("searchForm");

// Todo: select the HTML elements you need
const categoryQuery = searchForm.querySelectorAll('.form-check-input');
const responseList = document.querySelector('#restaurant-list');

let url = '';

searchForm.addEventListener("submit", (event) => {
  // Todo: Find the category selected and build the URL you will send your request to

  // delete all child of the list first
  event.preventDefault();
  responseList.querySelectorAll('.list-group-item').forEach(element => {
    responseList.removeChild(element) 
  });

  // get the position by search
  const location = document.querySelector('#location').value;
  // console.log(location);

  //get the radio button check parameter and create url
  for (i = 0; i < categoryQuery.length; i++) {
    // console.log(categoryQuery[i]);
    if (categoryQuery[i].checked) {
      url = `https://the-fork.api.lewagon.com/api/v1/restaurants?category=${categoryQuery[i].value}&location=${location}`;
      // console.log(url);
    }
  }

  // Todo: Replace "the-endpoint-url" with the URL you built
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      // Todo: Insert results into the list
      let restoList = [];
      data.forEach(element => {
        restoList.push(`<li class="list-group-item">${element.name}</li>`);
      });
      if (restoList.length === 0) {
        responseList.insertAdjacentHTML("beforeend", `<li class= "list-group-item">Sorry, no restaurant found !</li>`);
      } else {
        restoList.forEach(element => {
          responseList.insertAdjacentHTML("beforeend", element);
        });
      }
    });
});
