const cards = document.querySelectorAll(".card");
const hotelName = document.querySelectorAll(".hotelName");

// console.log(cards);

cards.forEach((card, index) => {
  card.addEventListener("click", () => {

    
    // console.log(hotelName[index].innerHTML);

    const clickedHotelName = hotelName[index].innerHTML
    

    window.location.href = `/hotelInfo?clickedHotelName=${clickedHotelName}`;
  });
});
