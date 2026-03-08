// Empty array for slides.
var slides = [];
var currentSlideIndex = -1;

class slide {
    constructor(title, image, description, author, year) {
        this.title = title;
        this.image = image;
        this.description = description;
        this.author = author;
        this.year = year;
    }

    getTitle() {
        return this.title;
    }

    getImage() {
        return this.image;
    }

    getDescription() {
        return this.description;
    }

    getAuthor() {
        return this.author;
    }

    getYear() {
        return this.year;
    }
}

function initializeSlides() {
    addSlides();
    showRandomSlide();
}

function addSlides() {
    var slide1 = new slide(
        "Civil Rights March",
        "images/civil_rights.jpg",
        "Historic demonstration for civil rights and social justice in Washington D.C. Original artist Warren K. Leffler. This connects to voting rights, african americans, and general equality among people. This is important because the civil rights movements and the fight for equality has led us to where we are now.",
        "Unseen Histories",
        "1963"
    );

    var slide2 = new slide(
        "Pride Display in Reykjavik",
        "images/rod-long-tb9EKCMhi9c-unsplash.jpg",
        "Rainbow pride colors displayed on Hallgrimskirkja church. This was taken during Pride Week in Iceland, 2022. This relates to the LGBTQ+ movement, civil rights, and social justice. It's still an important movement today. ",
        "Rod Long",
        "2018"
    );

    var slide3 = new slide(
        "Women's March 2019",
        "images/serra-utkum-ikiz-o8V9a-z4R5U-unsplash.jpg",
        "Image of people carrying a banner in a stree during the Women's Day Walk in 202 in London. The holiday celebrates equality and women's righs. This is critical because women still face equality and are fighting for social justice, not only for them but for every minority.",
        "Serra Utkum Ikiz",
        "2019"
    );

    var slide4 = new slide(
        "Trans Rights Protest",
        "images/ehimetalor-akhere-unuabona-OwMta0L8jpk-unsplash.jpg",
        "Group protesting for trans rights in London. This relates to gender equality, LGBTQ+ rights, and freedom to protest. Because trans people still face struggles and fight for rights, these protests are still common and important.",
        "Ehimetalor Akhere Unuabona",
        "2021"
    );

    var slide5 = new slide(
        "Pro Choice Graffitti",
        "images/claudio-schwarz-waPgM6pPBsg-unsplash.jpg",
        "Graffitti supporting a women's choice to an abortion. This deals with womens rights, privacy, freedom of choice, and lots of other issues. It is still a highly debated topic, with many people affected, and millions supporting the cause. Abortion is a human right that continues to face struggles in being widely available and accepted.",
        "Claudio Schwarz",
        "2024"
    );

    slides.push(slide1, slide2, slide3, slide4, slide5);

}

function accessInformation() {
    showRandomSlide();
}

function showRandomSlide() {
    if (slides.length === 0) {
        return;
    }

    var randomNumber = Math.floor(Math.random() * slides.length);

    // Prevent showing the same slide twice in a row when possible.
    while (slides.length > 1 && randomNumber === currentSlideIndex) {
        randomNumber = Math.floor(Math.random() * slides.length);
    }

    currentSlideIndex = randomNumber;
    renderSlide(slides[randomNumber]);
}

function renderSlide(selectedSlide) {
    document.getElementById("slideTitle").innerText = selectedSlide.getTitle();
    document.getElementById("slideImage").src = selectedSlide.getImage();
    document.getElementById("slideImage").alt = selectedSlide.getTitle();
    document.getElementById("slideDescription").innerText = selectedSlide.getDescription();
    document.getElementById("slideAuthor").innerText = "Author: " + selectedSlide.getAuthor();
    document.getElementById("slideYear").innerText = "Year: " + selectedSlide.getYear();
}