// console.log("SCRIPT A IS WORKING!");

const why_us = document.querySelector(".why-us");

const observer1 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
}, {
    threshold: 0.2
});

if (why_us) {
    observer1.observe(why_us);
}

const imageSection = document.querySelector(".flex-image-link");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const images = entry.target.querySelectorAll(".flex-img");

        if (entry.isIntersecting) {
            entry.target.classList.add("show");

            images.forEach(image => {
                image.classList.add("show");
            });
        } else {
            entry.target.classList.remove("show");

            images.forEach(image => {
                image.classList.remove("show");
            });
        }
    });
}, {
    threshold: 0.2
});

if (imageSection) {
observer.observe(imageSection);
}

const heroImage = document.getElementById("heroImage");

if (heroImage) {
    const images = [
    "images/landPageIMG/Land1.jpeg",
    "images/landPageIMG/Land2.jpeg",
    "images/landPageIMG/Land3.jpeg",
    "images/landPageIMG/Land4.jpeg",
    "images/landPageIMG/Land5.jpeg",
    "images/landPageIMG/Land6.jpeg",
    "images/landPageIMG/Land7.jpeg",
    "images/landPageIMG/Land8.jpeg",
    "images/landPageIMG/Land9.jpeg",
    "images/landPageIMG/Land10.jpeg",
    "images/landPageIMG/Land11.jpeg",
    "images/landPageIMG/Land12.jpeg",
    "images/landPageIMG/Land13.jpeg",
    "images/landPageIMG/Land14.jpeg",
    "images/landPageIMG/Land15.jpeg",
    "images/landPageIMG/Land16.jpeg",
    "images/landPageIMG/Land17.jpeg",
    "images/landPageIMG/Land18.jpeg",
    "images/landPageIMG/Land19.jpeg",
    "images/landPageIMG/Land20.jpeg",
    "images/landPageIMG/Land21.jpeg",
    "images/landPageIMG/Land22.jpeg",
    "images/landPageIMG/Land23.jpeg",
    "images/landPageIMG/Land24.jpeg",
    "images/landPageIMG/Land25.jpeg",
    "images/landPageIMG/Land26.jpeg",
    "images/landPageIMG/Land27.jpeg",
    "images/landPageIMG/Land28.jpeg",
    "images/landPageIMG/Land29.jpeg",
    "images/landPageIMG/Land30.jpeg",
    "images/landPageIMG/Land31.jpeg",
    "images/landPageIMG/Land32.jpeg",
    "images/landPageIMG/Land33.jpeg",
    "images/landPageIMG/Land34.jpeg"
    ];

    let currentImage = 0;

    setInterval(() => {
        heroImage.classList.add("fade");

        setTimeout(() => {
            currentImage++;

            if (currentImage >= images.length) {
                currentImage = 0;
            }

            heroImage.src = images[currentImage];
            heroImage.classList.remove("fade");
        }, 600);
    }, 5000);
}