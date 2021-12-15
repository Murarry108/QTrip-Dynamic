import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

  // console.log(search.substring(6));
  return search.substring(6);
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const adventuresResponse = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    const adventures = await adventuresResponse.json();
    // console.log(adventures);
    return adventures;
  } catch {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  const adventureCardsContainer = document.getElementById("data");
  // console.log(adventureCardsContainer);

  adventures.forEach(adventure => {
    const adventureCard = document.createElement("div");
    adventureCard.className = "col-6 col-lg-3 mb-3";
    adventureCard.innerHTML = `
      <a href="detail/?adventure=${adventure.id}" id="${adventure.id}">
        <div class="card position-relative">
          <div class="text-center adventure-category rounded">
            ${adventure.category}
          </div>

          <img class="card-img-top" src="${adventure.image}" height="200" alt=""/>

          <div class="card-body">
            <div class="d-flex flex-row justify-content-between">
              <span class="card-text">${adventure.name}</span>
              <span class="card-text">&#8377;${adventure.costPerHead}</span>
            </div>

            <div class="d-flex flex-row justify-content-between">
              <span class="card-text">Duration</span>
              <span class="card-text">${adventure.duration} Hours</span>
            </div>
          </div>
        </div>
      </a>
    `;
    adventureCardsContainer.append(adventureCard);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const durationFilteredList = [];
  list.forEach(listItem => {
    const durationOfListItem = parseInt(listItem.duration);
    if (low <= durationOfListItem && durationOfListItem <= high) {
      durationFilteredList.push(listItem);
    }
  });
  return durationFilteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  if (categoryList.length === 0) {
    return list;
  }

  const categoryFilteredList = [];
  list.forEach(listItem => {
    if (categoryList.includes(listItem.category)) {
      categoryFilteredList.push(listItem);
    }
  });
  return categoryFilteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  const duration = filters.duration;
  const categoryList = filters.category;
  // console.log(categoryList);

  if (duration === "" && categoryList.length === 0) {
    return list;
  } else if (duration !== "" && categoryList.length !== 0) {
    const lowerBoundOfDuration = parseInt(duration.split("-")[0]);
    const upperBoundOfDuration = parseInt(duration.split("-")[1]);
    const durationFilteredList = filterByDuration(list, lowerBoundOfDuration, upperBoundOfDuration);

    const categoryFilteredList = filterByCategory(list, categoryList);

    const filteredList = [];
    durationFilteredList.forEach(durationFilteredListItem => {
      if (categoryFilteredList.includes(durationFilteredListItem)) {
        filteredList.push(durationFilteredListItem);
      }
    });

    return filteredList;
  } else if (duration !== "") {
    const lowerBoundOfDuration = parseInt(duration.split("-")[0]);
    const upperBoundOfDuration = parseInt(duration.split("-")[1]);
    const durationFilteredList = filterByDuration(list, lowerBoundOfDuration, upperBoundOfDuration);

    return durationFilteredList;
  } else if (categoryList.length !== 0) {
    const categoryFilteredList = filterByCategory(list, categoryList);

    return categoryFilteredList;
  }
  // Place holder for functionality to work in the Stubs
  // return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  let localStorageFilters = {
    duration: filters.duration,
    category: filters.category
  };

  localStorage.setItem("filters", JSON.stringify(localStorageFilters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  // Place holder for functionality to work in the Stubs
  return JSON.parse(localStorage.getItem("filters"));
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const categoryListDOMElement = document.getElementById("category-list");
  const categoryList = filters.category;
  categoryList.forEach(category => {
    const categoryDOMElement = document.createElement("div");
    categoryDOMElement.className = "mx-2 px-2 border border-warning";
    categoryDOMElement.style.borderRadius = "20px";
    categoryDOMElement.innerHTML = `
      ${category}
    `;
    categoryListDOMElement.append(categoryDOMElement);
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
