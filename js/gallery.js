"use strict";

/**
 * Selects a random full image at the start and displays it.
 */
function showRandomImageAtStart() {
    // TODO: Select all 6 links (<a>) in the thumbnail section. They contain the URLs to the full images.
    // TODO: Select a random entry out of these 6.
    // TODO: Implement switchFullImage() below.
    // TODO: Call switchFullImage() with the URL of the random image and the alt attribute of the thumbnail (it contains the description).
    // TODO: Set a background color (classes .bg-dark and .text-white) to the card-body of your random image (hint: it's the sibling element of your link).

// Step 1: Select all 6 links (<a>) in the thumbnail section.
    const thumbnailLinks = document.querySelectorAll("#thumbnails .card-link");

    // Step 2: Select a random entry out of these 6.
    const randomIndex = getRandomInt(0, thumbnailLinks.length)
    const randomLink = thumbnailLinks[randomIndex];

    // Step 3: Call switchFullImage() with the URL of the random image and the alt attribute of the thumbnail.
    const imageUrl = randomLink.href;
    const imageDescription = randomLink.querySelector("img").alt;
    switchFullImage(imageUrl, imageDescription);

    // Step 4: Set a background color to the card-body of your random image.
    const cardBody = randomLink.closest(".card").querySelector(".card-body");
    cardBody.classList.add("bg-dark", "text-white");

}

/**
 * Prepare the links on the full images so that they execute the following tasks:
 * - Switch the full image to the one that has been clicked on.
 * - Set the highlight under the current thumbnail.
 * - Load the notes for the current image.
 */
function prepareLinks() {
    // TODO: Select all the 6 links (<a>) in the thumbnail section.
    // TODO: Set an event listener for the click event on every <a> element.
    //  (or advanced: think of a way to do it with one single handler)

    // TODO: The callback of the listener should do the following things:
    //  - Remove the .bg-dark and .text-white classes from the card where it's currently set.
    //  - Add both classes again to the card where the click happened (hint: "this" contains the very <a> element, where the click happened).
    //  - Call switchFullImage() with the URL clicked link and the alt attribute of the thumbnail.
    //  - Implement and then call loadNotes() with the key for the current image (hint: the full image's URL makes an easy and unique key).
    //  - Prevent the default action for the link (we don't want to follow it).

    // Step 1: Select all the 6 links (<a>) in the thumbnail section.
    const thumbnailLinks = document.querySelectorAll("#thumbnails .card-link");

    // Step 2: Set an event listener for the click event on every <a> element.
    thumbnailLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            // Step 3: Remove the .bg-dark and .text-white classes from the card where it's currently set.
            const currentActiveCard = document.querySelector(".bg-dark.text-white");
            if (currentActiveCard) {
                currentActiveCard.classList.remove("bg-dark", "text-white");
            }

            // Step 4: Add both classes again to the card where the click happened.
            const cardBody = this.closest(".card").querySelector(".card-body");
            cardBody.classList.add("bg-dark", "text-white");

            // Step 5: Call switchFullImage() with the URL clicked link and the alt attribute of the thumbnail.
            const imageUrl = this.href;
            const imageDescription = this.querySelector("img").alt;
            switchFullImage(imageUrl, imageDescription);

            // Step 6: Implement and then call loadNotes() with the key for the current image.
            loadNotes(imageUrl);

            // Step 7: Prevent the default action for the link.
            event.preventDefault();
        });
    });
}

/**
 * Stores or deletes the updated notes of an image after they have been changed.
 */
function storeNotes() {
    // TODO: Select the notes field and add a blur listener.
    // TODO: When the notes field loses focus, store the notes for the current image in the local storage.
    // TODO: If the notes field is empty, remove the local storage entry.
    // TODO: Choose an appropriate key (hint: the full image's URL makes an easy and unique key).

    // Step 1: Select the notes field and add a blur listener.
    const notesField = document.querySelector("#notes");
    notesField.addEventListener("blur", function() {
        // Step 2: When the notes field loses focus, store the notes for the current image in the local storage.
        const currentImageUrl = document.querySelector("#fullImage img").src;
        const notes = this.textContent.trim(); // Remove leading and trailing whitespace
        if (notes) {
            localStorage.setItem(currentImageUrl, notes);
        } else {
            // Step 3: If the notes field is empty, remove the local storage entry.
            localStorage.removeItem(currentImageUrl);
        }
    });
}

/**
 * Switches the full image in the <figure> element to the one specified in the parameter. Also updates the image's alt
 * attribute and the figure's caption.
 * @param {string} imageUrl The URL to the new image (the image's src attribute value).
 * @param {string} imageDescription The image's description (used for the alt attribute and the figure's caption).
 */
function switchFullImage(imageUrl, imageDescription) {
    // TODO: Get the <img> element for the full image. Select it by its class or tag name.
    // TODO: Set its src and alt attributes with the values from the parameters (imageUrl, imageDescription).
    // TODO: Select the <figcaption> element.
    // TODO: Set the description (the one you used for the alt attribute) as its text content.

// Step 1: Get the <img> element for the full image. Select it by its tag name.
    const fullImage = document.querySelector("#fullImage img");

    // Step 2: Set its src and alt attributes with the values from the parameters (imageUrl, imageDescription).
    fullImage.src = imageUrl;
    fullImage.alt = imageDescription;

    // Step 3: Select the <figcaption> element.
    const figCaption = document.querySelector("#fullImage figcaption");

    // Step 4: Set the description as its text content.
    figCaption.textContent = imageDescription;
   }

/**
 * Loads the notes from local storage for a given key and sets the contents in the notes field with the ID notes.
 * @param {string} key The key in local storage where the entry is found.
 */
function loadNotes(key) {
    // TODO: Select the notes field.
    // TODO: Check the local storage at the provided key.
    //  - If there's an entry, set the notes field's HTML content to the local storage's content.
    //  - If there's no entry, set the default text "Enter your notes here!".

    // Step 1: Select the notes field.
    const notesField = document.querySelector("#notes");

    // Step 2: Check the local storage at the provided key.
    const storedNotes = localStorage.getItem(key);

    // Step 3: If there's an entry, set the notes field's HTML content to the local storage's content.
    //         If there's no entry, set the default text "Enter your notes here!".
    if (storedNotes) {
        notesField.textContent = storedNotes;
    } else {
        notesField.textContent = "Enter your notes here!";
    }
}

/**
 * Returns a random integer value between min (included) and max (excluded).
 * @param {number} min The minimum value (included).
 * @param {number} max The maximum value (excluded).
 * @returns {number} A random integer value between min (included) and max (excluded).
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Gets the whole thing started.
 */
showRandomImageAtStart();
prepareLinks();
storeNotes();
