import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  // Place holder for functionality to work in the Stubs
  try {
    const reservationsResponse = await fetch(`${config.backendEndpoint}/reservations`);
    const reservations = await reservationsResponse.json();
    return reservations;
  } catch {
    return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  console.log(reservations);

  const noReservationBannerDOMElement = document.getElementById('no-reservation-banner');
  const reservationTableDOMElement = document.getElementById('reservation-table');
  const reservationTableParentDOMElement = document.getElementById("reservation-table-parent");

  if (reservations.length === 0) {
    noReservationBannerDOMElement.style.display = 'block';
    reservationTableParentDOMElement.style.display = 'none';
    reservationTableDOMElement.innerHTML = ``;
  } else {
    noReservationBannerDOMElement.style.display = 'none';
    reservationTableParentDOMElement.style.display = 'block';
    reservationTableDOMElement.innerHTML = ``;

    const month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    reservations.forEach(reservation => {
      const date = new Date(reservation.date);
      const time = new Date(reservation.time);

      let bookingTime = '';
      bookingTime += time.getDate().toString() + " ";
      bookingTime += month[time.getMonth()] + " ";
      bookingTime += time.getFullYear().toString() + ", ";
      bookingTime += formatAMPM(time);

      reservationTableDOMElement.innerHTML += `
        <tr>
          <td scope="col">${reservation.id}</td>
          <td scope="col">${reservation.name}</td>
          <td scope="col">${reservation.adventureName}</td>
          <td scope="col">${reservation.person}</td>
          <td scope="col">${date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()}</td>
          <td scope="col">${reservation.price}</td>
          <td scope="col">${bookingTime}</td>
          <td scope="col" id=${reservation.id}>
            <a href="../detail/?adventure=${reservation.adventure}">
              <button class="reservation-visit-button">
                Visit Adventure
              </button>
            </a>
          </td>
        </tr>
      `;
    });
  }
  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
}

function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
  return strTime;
}

console.log(formatAMPM(new Date));

export { fetchReservations, addReservationToTable };
