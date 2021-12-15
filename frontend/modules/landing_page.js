import config from "../conf/index.js";

async function init() {
  // console.log("From init()");

  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  // console.log(cities);

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  let response;
  try {
    response = await fetch(`${config.backendEndpoint}/cities`);
  } catch {
    return null;
  }
  let cities = await response.json();
  return cities;
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

  // const cityDiv = document.createElement("div");
  // cityDiv.className = "col-sm-6 col-lg-3 mb-3";
  // cityDiv.id = id;

  // const cityDivInnerDiv = document.createElement("div");
  // cityDivInnerDiv.className = "rounded tile";

  // const cityATag = document.createElement("a");
  // cityATag.setAttribute("href", `../pages/adventures/?city=${id}`);

  // const img = document.createElement("img");
  // img.className = "rounded";
  // img.setAttribute("src", image);

  // const descriptionDiv = document.createElement("div");
  // descriptionDiv.className = "tile-text text-center";
  // descriptionDiv.innerHTML = `${city}<br />${description}`;

  // appending child tags to appropriate parent tags
  // cityDiv.append(cityDivInnerDiv);
  // cityDivInnerDiv.append(cityATag);
  // cityATag.append(img);
  // cityATag.append(descriptionDiv);

  // console.log(cityDiv);

  // adding cityDiv to content section
  // const cityCardsContainer = document.getElementsByClassName("row")[0];
  // cityCardsContainer.append(cityDiv);
  // console.log(cityCardsContainer);
  const data = document.getElementById("data");
  const columnDiv = document.createElement("div");
  columnDiv.className = "col-12 col-sm-6 col-lg-3 mb-3";
  columnDiv.innerHTML = `
    <a href="pages/adventures/?city=${id}" id="${id}"
      <div class="tile d-flex">
        <img src="${image}" alt="" class="img-fluid">
        <div class="tile-text text-center">
          <h5>${city}</h5>
          <p>${description}</p>
        </div>
      </div>
    </a>
  `;
  data.append(columnDiv);
}

export { init, fetchCities, addCityToDOM };
