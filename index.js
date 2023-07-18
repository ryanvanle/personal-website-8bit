"use strict";

(function() {

  const CHARACTERS = ["link.gif", "squirtle.gif", "umbreon.gif", "sonic.gif"];

  window.addEventListener("load", init);

  function init() {
    generateNavigation();
    generateClouds();
    setInterval(function () { generateClouds(); }, 15000);
    setTimeout(function() { generateCharacters(); }, 3000);
    // generatePetals();

    if (getRandomIntBetween(1, 11) <= 8) { // should be a 40% chance of showing up
      generatePetals();
    }

    ["touch", "click"].forEach(function (event) {
      let textBox = id("text-box-animation");
      textBox.parentElement.parentElement.addEventListener(event, function() {
        turnOffTextBoxAnimation(textBox);
      });
    });
  }

  function generateNavigation() {
    let navButtons = qsa("#nav li span");
    for (let i = 0; i < navButtons.length; i++) {
      navButtons[i].addEventListener("click", function() {
        showScreen(navButtons[i]);
      })
    }

  }

  function showScreen(navButton) {
    let selectedText = navButton.textContent.toLowerCase();
    let screens = qsa("#test > div");

    for (let i = 0; i < screens.length; i++) {
      let currentScreenID = screens[i].id;
      if (currentScreenID === selectedText) {
        id(currentScreenID).classList.remove("hidden");
      } else {
        id(currentScreenID).classList.add("hidden");
      }
    }



  }

  function generateClouds() {
    if (document.visibilityState === 'hidden') return;
    let randomInt = getRandomIntBetween(3,7);
    let randomTimes = [];

    for (let i = 0; i < randomInt; i++) {
      let randomDelay = getRandomIntBetween(1, 7) * 1000;
      randomTimes.push(randomDelay)
    }

    for (let i = 0; i < randomInt; i++) {
      let cloudImg = gen("img");
      let randomCloudNumber = getRandomIntBetween(3,5);
      let randomDuration = getRandomIntBetween(20, 30);
      let randomPosition = getRandomIntBetween(0, 80);
      let randomSize = getRandomIntBetween(10, 20);

      cloudImg.src = "img/cloud" + randomCloudNumber + ".png";
      cloudImg.alt = "cloud";
      cloudImg.style.width = randomSize + "vw";
      cloudImg.style.top = randomPosition + "%";
      cloudImg.style["animation-duration"] = randomDuration +  "%";
      cloudImg.addEventListener("animationend", function () {
        console.log("removed");
        cloudImg.remove();
      });

      let randomDelay = randomTimes[i];
      setTimeout(function () {
        id("clouds").append(cloudImg);
      }, randomDelay);
    }
  }


  function generateCharacters() {
    let randomInt = getRandomIntBetween(1, CHARACTERS.length);
    let characterSet = new Set();
    let charactersArray = [];

    for (let i = 0; i < randomInt; i++) {
      let character = generateCharacterElement();
      if (characterSet.has(character.alt)) continue;
      characterSet.add(character.alt);
      charactersArray.push(character);
    }

    let runningDiv = gen("div");
    runningDiv.id = "running";

    charactersArray.forEach(function(characterElement) {
      runningDiv.append(characterElement);
    });

    runningDiv.addEventListener("animationend", function() {
      runningDiv.remove();
      let randomSeconds = getRandomIntBetween(6,20) * 1000;
      setTimeout(function() {
        generateCharacters();
      }, randomSeconds);
    })

    id("running-container").append(runningDiv);

  }

  function generateCharacterElement() {
    let character = CHARACTERS[getRandomIndex(CHARACTERS)];
    let element = gen("img");
    element.src = "img/" + character;
    element.alt = character.split(".")[0];
    return element;
  }

  function turnOffTextBoxAnimation(textBox) {
    textBox.id = "text-box-no-animation";
    // need to convert this to class instead of id.
  }

  function generatePetals() {
    let petalAmount = 20;
    let petals = [];

    let randomPositions = new Set();

    while (randomPositions.size < petalAmount / 2) {
      let randomPosition = getRandomIntBetween(0, 40);
      randomPositions.add(randomPosition);
    }

    while (randomPositions.size < petalAmount) {
      let randomPosition = getRandomIntBetween(60, 100);
      randomPositions.add(randomPosition);
    }

    let setToArray = Array.from(randomPositions);

    for (let i = 0; i < petalAmount; i++) {
      let randomInt = getRandomIntBetween(1, 4);
      let petalElement = gen("div");
      let petalImage = gen("img");

      petalElement.classList.add("snowflake");
      petalImage.src = "img/petal" + randomInt + ".gif";
      petalImage.alt = "cherry blossom petal";
      petalImage.style.width = "30px";
      petalElement.style.left = setToArray[i] + "%";
      petalElement.append(petalImage);
      petals.push(petalElement);
    }

    petals.forEach(function (element) {
      let randomTime = getRandomIntBetween(1,2) * 1000;
      let randomXDelay = getRandomIntBetween(0, 9);
      let randomYDelay = getRandomIntBetween(0, 2500);
      setTimeout(() => {
        element.style["-webkit-animation-delay"] = randomXDelay + "s," + randomYDelay + "ms";
        element.style["animation-delay"] = randomXDelay + "s," + randomYDelay + "ms";
        qs(".snowflakes").append(element);
      }, randomTime);
    });
  }


  /** ------------------------------ Helper Functions  ------------------------------ */
  /**
 * Note: You may use these in your code, but remember that your code should not have
 * unused functions. Remove this comment in your own code.
 */

  /**
 * Returns the element that has the ID attribute with the specified value.
 * @param {string} idName - element ID
 * @returns {object} DOM object associated with id.
 */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
 * Returns the first element that matches the given CSS selector.
 * @param {string} selector - CSS query selector.
 * @returns {object} The first DOM object matching the query.
 */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
 * Returns the array of elements that match the given CSS selector.
 * @param {string} selector - CSS query selector
 * @returns {object[]} array of DOM objects matching the query.
 */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  /**
 * Returns a new element with the given tag name.
 * @param {string} tagName - HTML tag name for new DOM element.
 * @returns {object} New DOM object for given HTML tag.
 */
  function gen(tagName) {
    return document.createElement(tagName);
  }

  /**
   * Generates a random number from given min to max number.
   * @param {Number} min - Minimum number
   * @param {Number} max - Maximum number
   * @returns random number in the range min to max - 1
   */
  function getRandomIntBetween(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  /**
   * Generates a random number from 0 to maximum available index of the array.
   * @param {Object[]} array - any array.
   * @returns {Number} Random index in the array.
   */
  function getRandomIndex(array) {
    return Math.floor(Math.random()*array.length);
  }
})();