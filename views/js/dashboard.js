const hotelReviews = [
    {
        profileImgUrl: "../images/people/girl1.jpg",
        name: "Priya",
        reviewText: "Just checked out of [Hotel Name] and already planning my next visit! The room was impeccably clean, the staff incredibly friendly, and the central location made exploring the city a breeze. Highly recommend!"
    },
    {
        profileImgUrl: "../images/people/boy1.jpeg",
        name: "Rajesh",
        reviewText: "My stay at [Hotel Name] was nothing short of fantastic. From the refreshing pool to the delicious complimentary breakfast, every aspect of the experience exceeded my expectations. Can't wait to return!"
    },
    {
        profileImgUrl: "../images/people/girl2.jpeg",
        name: "Neha",
        reviewText: "For the price, you can't beat the value of [Hotel Name]. Comfortable rooms, excellent service, and a prime location made my stay unforgettable. Will definitely be back!"
    },
    {
        profileImgUrl: "../images/people/boy2.jpeg",
        name: "Ankit",
        reviewText: "Woke up to breathtaking views from my room at [Hotel Name]. The attention to detail and impeccable service made my stay truly memorable. Highly recommend for anyone visiting the area!"
    },
    {
        profileImgUrl: "../images/people/girl3.jpeg",
        name: "Ayesha",
        reviewText: "Business trip or leisure, [Hotel Name] is the perfect choice. Conveniently located with reliable Wi-Fi and comfortable accommodations, it's become my go-to whenever I'm in town. Highly recommend for fellow travelers!"
    },
    {
        profileImgUrl: "../images/people/boy3.jpeg",
        name: "Sameer",
        reviewText: "Stumbled upon [Hotel Name] and couldn't have been happier. From the warm welcome to the thoughtful amenities, it's clear that they prioritize guest satisfaction. A hidden gem indeed!"
    },
    {
        profileImgUrl: "../images/people/girl4.jpeg",
        name: "Kavya",
        reviewText: "Spent a weekend at [Hotel Name] and it was pure bliss. Every detail, from the cozy room to the delicious dining options, was meticulously curated for a perfect stay. Will definitely be returning!"
    },
    {
        profileImgUrl: "../images/people/boy4.jpeg",
        name: "Ravi",
        reviewText: "Huge shoutout to the housekeeping staff at [Hotel Name] for keeping the rooms spotless. It's the little touches like these that make all the difference. Highly recommend for a stress-free stay!"
    },
    {
        profileImgUrl: "../images/people/girl5.jpeg",
        name: "Preeti",
        reviewText: "The team at [Hotel Name] truly knows how to deliver 5-star service. From the warm welcome to the personalized attention throughout my stay, I felt like a VIP. Can't wait to return for another unforgettable experience!"
    },
    {
        profileImgUrl: "../images/people/boy5.jpeg",
        name: "Vivek",
        reviewText: "Perfect for families, [Hotel Name] offers spacious rooms and a variety of kid-friendly amenities. From the pool to the onsite activities, there's something for everyone to enjoy. Highly recommend for a memorable family getaway!"
    },
    {
        profileImgUrl: "../images/people/girl6.jpeg",
        name: "Sneha",
        reviewText: "Indulged in a day of relaxation at [Hotel Name]'s spa and it was pure bliss. The tranquil atmosphere combined with top-notch treatments left me feeling rejuvenated. Highly recommend treating yourself!"
    },
    {
        profileImgUrl: "../images/people/boy6.jpeg",
        name: "Aman",
        reviewText: "Planning a romantic getaway? Look no further than [Hotel Name]. With its intimate ambiance, luxurious accommodations, and special touches, it's the perfect setting for a couple's retreat. Highly recommend!"
    },
    {
        profileImgUrl: "../images/people/girl7.jpeg",
        name: "Shraddha",
        reviewText: "Impressed by the attention to detail at [Hotel Name]. From the beautifully appointed rooms to the thoughtful amenities, every aspect of my stay was carefully considered. Can't wait to return for another unforgettable experience!"
    },
    {
        profileImgUrl: "../images/people/boy7.jpeg",
        name: "Arjun",
        reviewText: "Dining at [Hotel Name] was a culinary delight. The restaurant's diverse menu, expertly crafted dishes, and impeccable service made for a truly memorable dining experience. Highly recommend for food enthusiasts!"
    },
    {
        profileImgUrl: "../images/people/girl8.jpeg",
        name: "Nisha",
        reviewText: "Felt like royalty during my stay at [Hotel Name]. The exceptional hospitality, luxurious accommodations, and attention to every detail made for an unforgettable experience. Can't wait to return for another regal stay!"
    }
];

//main sidebar
const sidebarButtons = document.querySelectorAll('.menu li'); // sidebar items
const sections = document.querySelectorAll('section'); // different sections mentioned in sidebar

function hideAllSections() {
    for (let i = 0; i < sections.length; i++) {
        sections[i].classList.add('hidden');
        sidebarButtons[i].classList.remove('active');
    }
}

for (let i = 0; i < sidebarButtons.length; i++) {
    sidebarButtons[i].addEventListener('click', function () {
        hideAllSections();
            sections[i].classList.remove('hidden');
            sidebarButtons[i].classList.add('active');      
    });
}

const details = document.querySelector('.btn-details')

details.addEventListener('click', () => {
	hideAllSections();
	sections[2].classList.toggle('hidden');
})
const reviewsGrid = document.querySelector('.grid-reviews'); // review grid

hotelReviews.forEach(review => {
    const reviewEl = document.createElement('div');
    reviewEl.classList.add('review','hover-effect');
    const reviewContent = `
    <div class="profile-header">
    <img src="${review.profileImgUrl}" alt="profile photo" class="profile-image">
    <h3>${review.name}</h3>
    </div>
    <p>${review.reviewText}</p>
    `;
    reviewEl.innerHTML = reviewContent;
    reviewsGrid.appendChild(reviewEl);
});
