import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  // Place holder for functionality to work in the Stubs
  const urlParams = new URLSearchParams(search);
  return urlParams.get('adventure');
}

//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  // Place holder for functionality to work in the Stubs
  try {
    const adventureDetailsResponse =
      await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    const adventureDetails = await adventureDetailsResponse.json();
    // console.log(adventureDetails);
    return adventureDetails;
  } catch { 
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const name = adventure.name;
  const adventureNameDOMElement = document.getElementById('adventure-name');
  adventureNameDOMElement.innerHTML = name;

  const subtitle = adventure.subtitle;
  const adventureSubtitleDOMElement = document.getElementById('adventure-subtitle');
  adventureSubtitleDOMElement.innerHTML = subtitle;

  const images = adventure.images;
  const adventurePhotoGalleryDOMElement = document.getElementById('photo-gallery');
  images.forEach(image => {
    const imgDOMElement = document.createElement('img');
    imgDOMElement.setAttribute('src', image);
    imgDOMElement.className = 'activity-card-image';
    adventurePhotoGalleryDOMElement.append(imgDOMElement);
  });

  const content = adventure.content;
  const adventureContentDOMElement = document.getElementById('adventure-content');
  adventureContentDOMElement.innerHTML = `
    <p>
      ${content}
    </p>
  `;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const bootstrapPhotoGalleryDOMElement = document.createElement('div');
  bootstrapPhotoGalleryDOMElement.className = 'carousel slide';
  bootstrapPhotoGalleryDOMElement.setAttribute('data-ride', 'carousel');
  bootstrapPhotoGalleryDOMElement.id = 'bootstrap-photo-gallery';

  const carouselIndicatorsDOMElement = document.createElement('ol');
  carouselIndicatorsDOMElement.className = 'carousel-indicators';
  let counter = 0;
  images.forEach(image => {
    const carouselIndicatorLiDOMElement = document.createElement('li');
    if (counter === 0) {
      carouselIndicatorLiDOMElement.className = 'active';
    }
    carouselIndicatorLiDOMElement.setAttribute('data-target', '#bootstrap-photo-gallery');
    carouselIndicatorLiDOMElement.setAttribute('data-slide-to', counter.toString());
    carouselIndicatorsDOMElement.append(carouselIndicatorLiDOMElement);
    counter++;
  });
  bootstrapPhotoGalleryDOMElement.append(carouselIndicatorsDOMElement);

  const carouselInnerDOMElement = document.createElement('div');
  carouselInnerDOMElement.className = 'carousel-inner';
  let isActiveAdded = false;
  images.forEach(image => {
    const carouselInnerDivDOMElement = document.createElement('div');
    if (!isActiveAdded) {
      carouselInnerDivDOMElement.className = 'carousel-item active';
      isActiveAdded = true;
    } else {
      carouselInnerDivDOMElement.className = 'carousel-item';
    }
    carouselInnerDivDOMElement.innerHTML = `
      <img class="d-block w-100 activity-card-image" src="${image}">
    `;
    carouselInnerDOMElement.append(carouselInnerDivDOMElement);
  });
  bootstrapPhotoGalleryDOMElement.append(carouselInnerDOMElement);

  bootstrapPhotoGalleryDOMElement.innerHTML += `
    <a class="carousel-control-prev" href="#bootstrap-photo-gallery" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#bootstrap-photo-gallery" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  `;

  const adventurePhotoGalleryDOMElement = document.getElementById('photo-gallery');
  adventurePhotoGalleryDOMElement.innerHTML = '';
  adventurePhotoGalleryDOMElement.className = '';
  adventurePhotoGalleryDOMElement.append(bootstrapPhotoGalleryDOMElement);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const reservationPanelSoldOutDOMElement =
    document.getElementById('reservation-panel-sold-out');
  const reservationPanelAvailableDOMElement =
    document.getElementById('reservation-panel-available');
  
  if (adventure.available) {
    reservationPanelSoldOutDOMElement.style.display = 'none';
    reservationPanelAvailableDOMElement.style.display = 'block';
  } else {
    reservationPanelSoldOutDOMElement.style.display = 'block';
    reservationPanelAvailableDOMElement.style.display = 'none';
  }

  const reservationPersonCostDOMElement =
    document.getElementById('reservation-person-cost');
  reservationPersonCostDOMElement.innerHTML = adventure.costPerHead;
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const reservationCost = persons * adventure.costPerHead;
  const reservationCostDOMElement = document.getElementById('reservation-cost');
  reservationCostDOMElement.innerHTML = reservationCost.toString();
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const reservationFormDOMElement = document.getElementById('myForm');
  reservationFormDOMElement.addEventListener('submit', event => {
    event.preventDefault();
    let name = reservationFormDOMElement.elements['name'].value;
    let date = reservationFormDOMElement.elements['date'].value;
    let noOfPerson = reservationFormDOMElement.elements['person'].value;
    let adventureId = adventure.id;
    
    const body = {name: name, date: date, person: noOfPerson, adventure: adventureId};
    
    (async () => {
      const postRequestResponse = await fetch(`${config.backendEndpoint}/reservations/new`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const status = postRequestResponse.status;

      if (status === 200) {
        alert('Success!');
        location.reload();
      } else {
        alert('Failed!');
      }
    })();
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const reservationBannerDOMElement = document.getElementById('reserved-banner');
  if (adventure.reserved) {
    reservationBannerDOMElement.style.display = 'block';
  } else {
    reservationBannerDOMElement.style.display = 'none';
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
