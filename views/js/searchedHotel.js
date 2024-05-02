const cards = document.querySelectorAll(".card");
const hotelName = document.querySelectorAll(".hotelName");
const checkInComing = document.querySelector(".checkInComing");
const checkOutComing = document.querySelector(".checkOutComing");



cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    const clickedHotelName = hotelName[index].innerHTML;

    const checkInDate = checkInComing.value;
    const checkOutDate = checkOutComing.value;

    // Construct the URL with parameters
    var url =
      "http://localhost:3000/hotelInfo?clickedHotelName=" +
      encodeURIComponent(clickedHotelName) +
      "&checkIn=" +
      encodeURIComponent(checkInDate) +
      "&checkOut=" +
      encodeURIComponent(checkOutDate);

      console.log(url);

    // Navigate to the hotel info page
    window.location.href = url;
  });
});
