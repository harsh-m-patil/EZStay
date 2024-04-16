// Script
const menu = document.querySelector(".menu");
const side = document.querySelector(".sidebar");
const main = document.querySelector(".mainpage");
const cardContainer = document.querySelector(".card-container");
const iconinfo = document.querySelectorAll(".icon-info");
const iconbtn = document.querySelectorAll(".iconbtn-1");
const items = document.querySelectorAll(".items-1");

let cardClickedIndex;

// signIn button
// const signInBtn = document.querySelector(".sign-in-btn");
// signInBtn.addEventListener("click", () => {
//   window.location.href = "./login.html";
// });

var count = 0;
menu.addEventListener("click", function () {
  if (count == 0) {
    guestBox.style.display = "none";

    main.style.width = "95%";
    side.style.width = "5%";
    main.style.marginLeft = "0";
    cardContainer.style.gridTemplateColumns =
      "repeat(auto-fit,minmax(110px, 299px))";
    cardContainer.style.gridGap = "3.5rem";
    iconinfo.forEach(function (icon) {
      icon.classList.add("hidden");
    });
    items.forEach(function (icon) {
      icon.classList.add("items-2");
    });
    iconbtn.forEach(function (icon) {
      icon.classList.add("iconbtn-2");
    });
    items.forEach(function (icon) {
      icon.classList.remove("items-1");
    });
    iconbtn.forEach(function (icon) {
      icon.classList.remove("iconbtn-1");
    });

    count++;
  } else {
    // guestBox.style.display = "block";

    main.style.width = "83%";
    side.style.width = "15%";
    main.style.marginLeft = "0";
    cardContainer.style.gridTemplateColumns =
      "repeat(auto-fit,minmax(110px, 272px))";
    cardContainer.style.gridGap = "2rem";
    iconinfo.forEach(function (icon) {
      icon.classList.remove("hidden");
    });
    items.forEach(function (icon) {
      icon.classList.remove("items-2");
    });
    iconbtn.forEach(function (icon) {
      icon.classList.remove("iconbtn-2");
    });
    items.forEach(function (icon) {
      icon.classList.add("items-1");
    });
    iconbtn.forEach(function (icon) {
      icon.classList.add("iconbtn-1");
    });
    count = 0;
  }
});

//******************************************************* */

// json file data

// Function to fetch hotel data from JSON file
// const fetchHotelData = async () => {
//   try {
//     const response = await fetch('../../HotelData/hotelData.json');
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching hotel data:', error);
//   }
// };

// // Call the function to fetch data
// fetchHotelData().then(hotelData => {

//   updateCardsWithData(hotelData);
// });

//******************************************************* */
// Fetch hotel data from server
fetch("/hoteldata")
  .then((response) => response.json())
  .then((hotelData) => {
    // Call the function to update UI cards with the fetched data
    updateCardsWithData(hotelData);
  })
  .catch((error) => {
    console.error("Error fetching hotel data:", error);
  });
// ***********************************************************

// creating card
const createCard = () => {
  const card = document.createElement("div");

  card.innerHTML = `<div class="card">
                      <div class="card-img-scroll">
                          <img class="card-img" src="../images/HA2.jpg" alt="" />
                          <img class="card-img" src="../images/HA1.webp" alt="" />
                          <img class="card-img" src="../images/HA3.jpg" alt="" />
                          <img class="card-img" src="../images/HA4.jpg" alt="" />
                      </div>

                      <button class="card-img-scroll-right">></button>
                      <button class="card-img-scroll-left"><</button>

                    
                      <button class="card-heart">
                      <i class="ri-heart-fill"></i>
                      </button>

                    <div class="card-name">
                      <h4 class='cardHotelName'>ITC Grand Chola</h4>

                      <div class="card-rating">
                        <i class="ri-star-line"></i>
                        <p>4.9</p>
                      </div>
                    </div>

                    <p>Chennai</p>
                    <p><span>₹ 10,000</span> per night</p>

                    <span class="card-comment">fabulous</span>
                    </div>`;

  cardContainer.appendChild(card);
};

for (let i = 0; i < 12; i++) {
  createCard();
}

//***************************************************** */

// slider ******************************************

const sliders = document.querySelectorAll(".card-img-scroll");

sliders.forEach((slider, index) => {
  const slides = slider.querySelectorAll(".card-img");

  let curslide = 0;
  const maxslide = 4;

  const btnRight = document.querySelectorAll(".card-img-scroll-right");
  const btnLeft = document.querySelectorAll(".card-img-scroll-left");

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  goToSlide(0);

  const nextslide = function () {
    if (curslide === maxslide - 1) {
      curslide = 0;
    } else {
      curslide++;
    }
    goToSlide(curslide);
  };

  const prevslide = function () {
    if (curslide === 0) {
      curslide = maxslide - 1;
    } else {
      curslide--;
    }
    goToSlide(curslide);
  };

  btnRight[index].addEventListener("click", nextslide);
  btnLeft[index].addEventListener("click", prevslide);
});

//

const bookmarked = [];

const updateCardsWithData = (hotelData) => {
  const cards = document.querySelectorAll(".card");
  const cardComment = document.querySelectorAll(".card-comment");
  const cardImg = document.querySelectorAll(".card-img");
  const cardText = document.querySelectorAll(".card-name");
  const cardHotelName = document.querySelectorAll(".cardHotelName");

  

  // console.log(cardImg);

  cards.forEach((item, index) => {
    const Address = item.querySelectorAll("p");
    item.querySelector("h4").innerText = hotelData[index].hotelName;
    item.querySelector("p").innerText = hotelData[index].rating;
    Address[1].innerText = hotelData[index].hotelAddress;
    item.querySelector("span").innerText = "₹ " + hotelData[index].hotelPrice;

    // cardImg[index * 4].addEventListener("click", () => {
    //   // console.log(item);
    //   // console.log(cardHotelName);
    //   // console.log(cardHotelName[index].innerHTML);

    //   const clickedHotelName =  cardHotelName[index].innerHTML
    //   console.log(clickedHotelName);

    //   window.open("hotelInfo.html", "_blank");
    // });
    // cardText[index].addEventListener("click", () => {
    //   window.open("hotelInfo.html", "_blank");
    // });


    cardImg[index * 4].addEventListener("click", () => {
      const clickedHotelName = cardHotelName[index].innerHTML;
      console.log(clickedHotelName);
    
      // Making an HTTP GET request to send clickedHotelName to the backend
      fetch(`/search?clickedHotelName=${clickedHotelName}`, {
        method: 'GET',
      }).then(response => {
        if (response.ok) {
          console.log('Clicked hotel name sent to the backend successfully');
          // Redirect to hotelInfo route after sending the hotel name
          window.location.href = `/hotelInfo?clickedHotelName=${clickedHotelName}`;
        } else {
          console.error('Failed to send clicked hotel name to the backend');
        }
      }).catch(error => {
        console.error('Error sending clicked hotel name to the backend:', error);
      });
    });
    
    

    for (let i = 0; i < 4; i++) {
      cardImg[index * 4 + i].src = hotelData[index].imageLinks[i];
    }

    if (item.querySelector("p").innerText < 4.7) {
      cardComment[index].style.display = "none";
    }

    //  Bookmark js

    const cardHeart = document.querySelectorAll(".card-heart");
    cardHeart[index].addEventListener("click", () => {
      const foundElement = hotelData.find(
        (element) => element.hotelId === index + 1
      );
      if (foundElement !== undefined && foundElement.flag === 0) {
        bookmarked.push(foundElement);
        console.log(bookmarked);
        foundElement.flag = 1;
        cardHeart[index].querySelector("i").style.color = "black";
      } else {
        if (foundElement.flag === 1) {
          foundElement.flag = 0;
          const indexToRemove = bookmarked.findIndex(
            (element) => element.hotelId === foundElement.hotelId
          );
          if (indexToRemove !== -1) {
            bookmarked.splice(indexToRemove, 1);
            console.log(bookmarked);
            cardHeart[index].querySelector("i").style.color =
              "rgba(0, 0, 0, 0.3)";
          }
        }
      }
    });
  });
};

const modal = document.querySelector(".modal");
const bookmark = document.querySelector(".bookmark");
const close = document.querySelector(".close-modal");

bookmark.addEventListener("click", function () {
  modal.classList.toggle("hidden");
  close.classList.toggle("hidden");

  modal.innerHTML = "";

  // Iterate over bookmarked array and create HTML elements
  bookmarked.forEach((item) => {
    const bookmarkedItem = document.createElement("div");
    bookmarkedItem.classList.add("bookmarked-item");
    bookmarkedItem.innerHTML = `
    
      <p>${item.hotelName}</p>
      <p><i class="ri-map-pin-fill"></i> ${item.hotelAddress}</p>
      <p>₹ ${item.hotelPrice}</p>
      <p>&#11088;${item.rating}</p>
      
     
    `;
    modal.appendChild(bookmarkedItem);
  });
});

const closemodal = function () {
  close.classList.add("hidden");
  modal.classList.add("hidden");
};

close.addEventListener("click", closemodal);
main.addEventListener("click", closemodal);

//************************************************* */
// Drop down for guest in search bar

const guestBox = document.querySelector(".guest-box");
const addGuestBtn = document.querySelectorAll(".addGuest");
const subGuestBtn = document.querySelectorAll(".subGuest");
const noOfGuests = document.querySelectorAll(".noOfGuest");
const Who = document.querySelector(".Who");
const crossCutGuestBox = document.querySelector(".crossCut-guest-box");

const who = document.querySelector(".Who");
const adult = document.querySelector(".adult");
const children = document.querySelector(".children");

addGuestBtn.forEach((button, index) => {
  button.addEventListener("click", () => {
    noOfGuests[index].innerHTML++;

    const guestInput = document.querySelector(
      '.search-bar-divs.Who input[type="text"]'
    );
    guestInput.value = 1;
    guestInput.value = adult.innerHTML;
  });
});

subGuestBtn.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (noOfGuests[index].innerHTML > 0) {
      noOfGuests[index].innerHTML--;
    }
  });
});

let flag = 0;
guestBox.style.display = "none";

Who.addEventListener("click", () => {
  const guestInput = document.querySelector(
    '.search-bar-divs.Who input[type="text"]'
  );
  guestInput.value = 1;
  if (flag === 0) {
    guestBox.style.display = "block";
    flag = 1;
  } else if (flag === 1) {
    guestBox.style.display = "none";
    flag = 0;
  }
});

crossCutGuestBox.addEventListener("click", () => {
  guestBox.style.display = "none";
});
