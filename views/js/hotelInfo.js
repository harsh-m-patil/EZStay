

const reviewData = [
  {
    name: "Akshay Deshpande",
    image: "images/man.jpg",
    address: "Pune, Maharashtra",
    rating: 4.7,
    review: "Fantastic hotel experience. Stayed for 2 nights, exceptional service, comfortable rooms, and delicious food. Highly recommended!"
  },
  {
    name: "Sneha Patel",
    image: "images/woman.jpg",
    address: "Mumbai, Maharashtra",
    rating: 4.5,
    review: "Wonderful stay! The staff was friendly, rooms were clean, and the location was perfect. Will definitely visit again."
  },
  {
    name: "Rahul Gupta",
    image: "images/man2.jpg",
    address: "Delhi, India",
    rating: 4.8,
    review: "Great hospitality! Enjoyed every moment of our stay. The ambiance was pleasant, and the food was delightful. Highly satisfied!"
  },
  {
    name: "Priya Sharma",
    image: "images/woman2.jpg",
    address: "Bangalore, Karnataka",
    rating: 4.9,
    review: "Amazing experience! The hotel exceeded our expectations. Everything from check-in to check-out was smooth. Will recommend to all!"
  }
];

const addReviews = () => {
  const reviewContainer = document.getElementById('review-container');
  // Clear the contents of the review container before appending new reviews
  reviewContainer.innerHTML = '';

  reviewData.forEach(review => {
    const addReviewCard = document.createElement('div');
    addReviewCard.classList.add('review-card');
    addReviewCard.innerHTML = `
      <div class="img-name-div">
        <div class="name">
          <img src="${review.image}" alt="">
          <div>
            <h3>${review.name}</h3>
            <p>${review.address}</p>
          </div>
        </div>
        <div class="stars">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="gold" d="M12 2l2.56 7.94H22l-6.63 4.82 2.55 7.88L12 17.27l-6.93 5.37 2.55-7.88L2 9.94h7.44L12 2z"/>
          </svg>
          <h3>${review.rating}</h3>
        </div>
      </div>
      <p>${review.review}</p>
    `;
    reviewContainer.appendChild(addReviewCard);
  });
};

// Call the function to add reviews
addReviews();
addReviews();
addReviews();
addReviews();









console.log("Check-in Date:", checkInDate);
console.log("Check-out Date:", checkOutDate);



