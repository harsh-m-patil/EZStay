// Script
const menu = document.querySelector(".menu");
const side = document.querySelector(".sidebar");
const main = document.querySelector(".mainpage");
const cardContainer = document.querySelector(".card-container");
const iconinfo = document.querySelectorAll(".icon-info");
const iconbtn = document.querySelectorAll(".iconbtn-1");
const items = document.querySelectorAll(".items-1");

// signIn button
const signInBtn = document.querySelector(".sign-in-btn");
signInBtn.addEventListener("click", () => {
  window.location.href = "./login.html";
});

var count = 0;
menu.addEventListener("click", function () {
  if (count == 0) {
    guestBox.style.display = "none";


    main.style.width = "95%";
    side.style.width = "5%";
    main.style.marginLeft = "6%";
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
    main.style.marginLeft = "18%";
    cardContainer.style.gridTemplateColumns =
      "repeat(auto-fit,minmax(110px, 272px))";
    cardContainer.style.gridGap = "2rem";
    // iconinfo.classList.remove('hidden');
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
const hotelData = [
  {
    hotelId: 1,
    hotelName: "ITC Chola",
    hotelAddress: "Chennai",
    hotelPrice: 10000,
    imageLinks: [
      "./images/HA2.jpg",
      "./images/HA1.webp",
      "./images/HA3.jpg",
      "./images/HA4.jpg",
    ],
    rating: 4.5,
    flag: 0,
  },
  {
    hotelId: 2,
    hotelName: "Taj Mahal Palace",
    hotelAddress: "Mumbai",
    hotelPrice: 15000,
    imageLinks: [
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/31204963.jpg?k=7371ed0dcd00100a87ab031dd23f598627619af10b07906ecde0f966e17bef6d&o=",
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/18178090.jpg?k=a9d7521282dde0200adbcb69b9fe641d41f954835856abd332b3525d9510d1ae&o=",
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/101718202.jpg?k=eccbccb0643607c0544246249e94d2757ec644eef3fe5f395da5b47ef8f39166&o=",
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/15408143.jpg?k=3240797b759496df6555411b4974c77d4584372f9e59ad949a89d24ad9fa23cc&o=",
    ],
    rating: 4.8,
    flag: 0,
  },
  {
    hotelId: 3,
    hotelName: "The Leela Palace",
    hotelAddress: "Delhi",
    hotelPrice: 12000,
    imageLinks: [
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/268437803.jpg?k=78f43e59cc6b299543587478c7bf16614fe4cfd869bee38bee6cb5e4381d30f4&o=",
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/232257370.jpg?k=2a0200c2fcdecf95580c58019da5b311e0f9bb89e207eb9b95e5b88b1ea8c69b&o=",
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/34169921.jpg?k=e46e15d819f61fe3a7968d81434f26df7faa55c4f6b2e43749f5224159cbbece&o=",
      "https://pix8.agoda.net/hotelImages/187088/0/3e073961e5ab23af8b9e21d6f0d38983.jpg?ca=7&ce=1&s=1024x768",
    ],
    rating: 4.6,
    flag: 0,
  },
  {
    hotelId: 4,
    hotelName: "JW Marriott",
    hotelAddress: "Bangalore",
    hotelPrice: 11000,
    imageLinks: [
      "https://pix8.agoda.net/hotelImages/529438/0/00cbfcab82f036055231f51397e25d37.jpg?ca=7&ce=1&s=1024x768",
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/503528887.jpg?k=68a8f00b4407400c0f50d4404e9d58d8936916a4e58c2ecd624914c055dfe484&o=",
      "https://pix8.agoda.net/hotelImages/5444226/0/3ca0d52680600785a20a23d209d4e47a.jpg?ca=23&ce=0&s=1024x768",
      "https://pix8.agoda.net/hotelImages/5444226/0/1e77167e4ce9c858d229e01d12cee59f.jpg?ce=0&s=1024x768",
    ],
    rating: 4.7,
    flag: 0,
  },
  {
    hotelId: 5,
    hotelName: "Oberoi Grand",
    hotelAddress: "Kolkata",
    hotelPrice: 9000,
    imageLinks: [
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/32092064.jpg?k=1b0fcbc10d011a9b37daaed1f35ca1a95bcf74dac30749d0ada0662a763e2f37&o=",
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/292026871.jpg?k=1261117709a6c3418c57c703ddf78cb8aba6b14d5cbbfec56105954be69ab0f9&o=",
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/32092072.jpg?k=501556f151daa3d6f0149febd4972e9c3603f4f327334140900c39115e3211b4&o=",
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/46433042.jpg?k=f4f1853df7f1c7ee6017d4e5aca6074a357bbd954fa522e2ff7869ef35bc985f&o=",
    ],
    rating: 4.3,
    flag: 0,
  },
  {
    hotelId: 6,
    hotelName: "Ritz-Carlton",
    hotelAddress: "Goa",
    hotelPrice: 18000,
    imageLinks: [
      "https://pix8.agoda.net/hotelImages/1157815/-1/4a39537aa1938b284fc7791ea2b358f9.jpg?ca=0&ce=1&s=1024x768",
      "https://pix8.agoda.net/hotelImages/2309120/0/44301c634584cbb70d127adf14fb695a.jpg?ca=26&ce=0&s=1024x768",
      "https://pix8.agoda.net/hotelImages/1157815/0/24bde72793475064e227e7615dea72e5.jpg?ca=7&ce=1&s=1024x768",
      "https://pix8.agoda.net/hotelImages/1157815/6957496/5072a1dc2abecc22e729a1b4c57abfb1.jpg?ca=13&ce=1&s=1024x768",
    ],
    rating: 4.9,
    flag: 0,
  },
  {
    hotelId: 7,
    hotelName: "Hyatt Regency",
    hotelAddress: "Pune",
    hotelPrice: 9500,
    imageLinks: [
      "https://pix8.agoda.net/hotelImages/48106978/0/e29c3b089c98717403f6968e8f27767f.jpg?ce=0&s=1024x768",
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/416160438.jpg?k=aee98c2ce89de1d63c614c3c2c144febf9718c740e18d6bf2f309c28bd107055&o=",
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/521780565.jpg?k=9fdee4da19fd9059a227d70c3f42db9c247cad624bc2c5b547ce6a837be09403&o=",
      "https://pix8.agoda.net/hotelImages/48106978/-1/912e4247a83c6bed06dee210224d6d13.jpg?ce=0&s=1024x768",
    ],
    rating: 4.4,
    flag: 0,
  },
  {
    hotelId: 8,
    hotelName: "Sheraton Grand",
    hotelAddress: "Hyderabad",
    hotelPrice: 10500,
    imageLinks: [
      "https://pix8.agoda.net/hotelImages/4974056/-1/16d4bb2d6fad0bd45b954dcee27253d7.jpg?ca=7&ce=1&s=1024x768",
      "https://pix8.agoda.net/hotelImages/4974056/-1/ebe6115486d373bd6b1500482564f41c.jpg?ce=0&s=1024x768",
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/465562702.jpg?k=0922469db660744808aa3efe5bad347381780833e2095554e01540077aa2c79f&o=",
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/489879153.jpg?k=f049952c535f6f4d18f0633e634d4f382acb5780f214230fd24434ddfb06e7ae&o=",
    ],
    rating: 4.5,
    flag: 0,
  },
  {
    hotelId: 9,
    hotelName: "Four Seasons",
    hotelAddress: "Mumbai",
    hotelPrice: 16000,
    imageLinks: [
      "https://pix8.agoda.net/hotelImages/4862409/0/92076d188c78878721e0d065e7f00d5a.jpg?ce=0&s=1024x768",
      "https://pix8.agoda.net/hotelImages/4862409/0/12e5291e2246c124088d569bd8013934.jpeg?ce=0&s=1024x768",
      "https://pix8.agoda.net/property/37022649/805323346/ef743e2583f122e194019593c343f316.jpeg?ce=0&s=1024x768",
      "https://pix8.agoda.net/hotelImages/4862409/0/3a45a0dfc682a5cd4877d3dcb393f3dd.jpeg?ce=0&s=1024x768",
    ],
    rating: 4.7,
    flag: 0,
  },
  {
    hotelId: 10,
    hotelName: "Radisson Blu",
    hotelAddress: "Jaipur",
    hotelPrice: 8500,
    imageLinks: [
      "https://pix8.agoda.net/hotelImages/9455691/0/39614b7002183d97ae700a34541eab29.jpg?ca=9&ce=1&s=1024x768",
      "https://pix8.agoda.net/hotelImages/9455691/461201883/5b0a37f632fa1637ca335afc791a0ddd.jpg?ca=24&ce=0&s=1024x768",
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/232844772.jpg?k=e498c90a3d3b96dde774aba1a4c630c4c1be2ffd8c06e4f7ee06210a853ca15a&o=",
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/108122488.jpg?k=b55ec8e3d5faceb8c7b1c3c3c48f44adaa6413657cd6cf52fe807602f5260c67&o=",
    ],
    rating: 4.2,
    flag: 0,
  },
  {
    hotelId: 11,
    hotelName: "Marriott Marquis",
    hotelAddress: "Ahmedabad",
    hotelPrice: 10000,
    imageLinks: [
      "https://pix8.agoda.net/hotelImages/21035118/-1/5c421c320e993e6e0a3e001ef50f5805.jpg?ca=26&ce=0&s=1024x768",
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/317354439.jpg?k=b9a0f2df083691b93c55ad1fb6597c1b43428ed55ad03100afebf9a4afc3e1c9&o=",
      "https://pix8.agoda.net/hotelImages/12548973/0/d2f0b1c8d6cd798e7743c2241cce6ff2.jpg?ca=21&ce=0&s=1024x768",
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/312506486.jpg?k=21aa41e9ec1b09e08e9fb66dd7347ff67f0e1ced20e7712e72c312c07a5a7e3c&o=",
    ],
    rating: 4.4,
    flag: 0,
  },
  {
    hotelId: 12,
    hotelName: "Hilton Garden Inn",
    hotelAddress: "Chandigarh",
    hotelPrice: 9500,
    imageLinks: [
      "https://pix8.agoda.net/hotelImages/43879/0/604250d16d9ebba5902f136c3075603b.jpg?ca=7&ce=1&s=1024x768",
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/18068181.jpg?k=d0b3ce5167e682eb959457c10f3524dceff5839472c33e4f759e594b16ec4de0&o=",
      "https://pix8.agoda.net/property/24110169/613771968/aba2fcfb22c1f3cff2735edde0b890c0.jpg?ce=0&s=1024x768",
      "https://pix8.agoda.net/hotelImages/43879/0/6d4806fbe8acd32f86beb62b14b893be.jpg?ca=7&ce=1&s=1024x768",
    ],
    rating: 4.3,
    flag: 0,
  },
];

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
                      <h4>ITC Grand Chola</h4>

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

const sliders = document.querySelectorAll('.card-img-scroll');

sliders.forEach((slider, index) => {
const slides = slider.querySelectorAll('.card-img');

let curslide = 0;
const maxslide = 4;

const btnRight = document.querySelectorAll(".card-img-scroll-right");
 const btnLeft = document.querySelectorAll(".card-img-scroll-left");

const goToSlide = function(slide){
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i-slide) }%)`));
}

goToSlide(0);

const nextslide = function(){
  if(curslide === maxslide - 1){
    curslide = 0;
  } else{
    curslide++;
  }
  goToSlide(curslide);
}


const prevslide = function(){
  if(curslide === 0){
    curslide = maxslide-1;
  } else{
    curslide--;
  }
  goToSlide(curslide);
}

btnRight[index].addEventListener('click', nextslide);
btnLeft[index].addEventListener('click', prevslide);

});

// 

const bookmarked=[];

const updateCardsWithData = () => {
  const cards = document.querySelectorAll(".card");
  const cardComment = document.querySelectorAll(".card-comment");
  const cardImg = document.querySelectorAll('.card-img');
  // console.log(cardImg);

  cards.forEach((item, index) => {
    const Address = item.querySelectorAll("p");
    item.querySelector("h4").innerText = hotelData[index].hotelName;
    item.querySelector("p").innerText = hotelData[index].rating;
    Address[1].innerText = hotelData[index].hotelAddress;
    item.querySelector("span").innerText = "₹ " + hotelData[index].hotelPrice;
  // console.log(cardImg);


  for (let i = 0; i < 4; i++) {
    console.log(hotelData[index].imageLinks[i]);
    cardImg[(index * 4) + i].src = hotelData[index].imageLinks[i];
  }

    if (item.querySelector("p").innerText < 4.7) {
      cardComment[index].style.display = "none";
    }

  //  Bookmark js

    const cardHeart = document.querySelectorAll(".card-heart");
    cardHeart[index].addEventListener("click", () => {
    
const foundElement = hotelData.find(element => element.hotelId === index+1);
if (foundElement !== undefined && foundElement.flag === 0) {
  bookmarked.push(foundElement);
    console.log(bookmarked);
    foundElement.flag = 1;
    cardHeart[index].querySelector('i').style.color = "black";
} else {
   if(foundElement.flag === 1){
    foundElement.flag =0;
    const indexToRemove = bookmarked.findIndex(element => element.hotelId === foundElement.hotelId);
    if (indexToRemove !== -1) {
        bookmarked.splice(indexToRemove, 1);
      console.log(bookmarked);
      cardHeart[index].querySelector('i').style.color = "rgba(0, 0, 0, 0.3)";
      
      
    }
  }
}

    });
  });
};

updateCardsWithData();


const modal = document.querySelector('.modal');
const bookmark = document.querySelector('.bookmark');
const close = document.querySelector('.close-modal')

bookmark.addEventListener('click', function(){
  
  modal.classList.toggle('hidden');
  close.classList.toggle('hidden');
  
  modal.innerHTML = '';

  // Iterate over bookmarked array and create HTML elements
  bookmarked.forEach(item => {
    const bookmarkedItem = document.createElement('div');
    bookmarkedItem.classList.add('bookmarked-item');
    bookmarkedItem.innerHTML = `
    
      <p>${item.hotelName}</p>
      <p><i class="ri-map-pin-fill"></i> ${item.hotelAddress}</p>
      <p>₹ ${item.hotelPrice}</p>
      <p>&#11088;${item.rating}</p>
      
      <!-- Add more details as needed -->
    `;
    modal.appendChild(bookmarkedItem);
  });

})

const closemodal = function(){
  close.classList.add('hidden');
  modal.classList.add('hidden');
}

close.addEventListener('click', closemodal);
main.addEventListener('click', closemodal);



//************************************************* */
// Drop down for guest in search bar

const guestBox = document.querySelector(".guest-box");
const addGuestBtn = document.querySelectorAll(".addGuest");
const subGuestBtn = document.querySelectorAll(".subGuest");
const noOfGuests = document.querySelectorAll(".noOfGuest");
const Who = document.querySelector(".Who");
const crossCutGuestBox = document.querySelector(".crossCut-guest-box");

addGuestBtn.forEach((button, index) => {
  button.addEventListener("click", () => {
    noOfGuests[index].innerHTML++;
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
  if (flag === 0) {
    guestBox.style.display = "block";
    flag = 1;
  } else if (flag === 1) {
    guestBox.style.display = "none";
    flag = 0;
  }
});

crossCutGuestBox.addEventListener('click',()=>{
  guestBox.style.display = "none";
})


