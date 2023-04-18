"use strict";

(function() {

  const CHARACTERS = ["link.gif", "squirtle.gif", "umbreon.gif", "sonic.gif"];

  /**
 * Add a function that will be called when the window is loaded.
 */
  window.addEventListener("load", init);

  /**
 * CHANGE: Describe what your init function does here.
 */
  function init() {

    generateClouds();
    setInterval(function () { generateClouds(); }, 20000);
    setTimeout(function() { generateCharacters() }, 3000);


    ["touch", "click"].forEach(function (event) {
      let textBox = id("text-box-animation");
      textBox.parentElement.parentElement.addEventListener(event, function() {
        turnOffTextBoxAnimation(textBox);
      });
    });
  }

  function generateClouds() {
    let randomInt = getRandomIntBetween(3,6);

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
      let randomDelay = getRandomIntBetween(1, 5) * 1000;
      cloudImg.addEventListener("animationend", function () {
        console.log("removed");
        cloudImg.remove();
      });

      setTimeout(function () {
        id("clouds").append(cloudImg);
      }, randomDelay);
    }
  }


  function generateCharacters() {
    let randomInt = getRandomIntBetween(2, CHARACTERS.length);
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
      let randomSeconds = getRandomIntBetween(2,10) * 1000;
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

  /**
 * Make sure to always add a descriptive comment above
 * every function detailing what it's purpose is
 * @param {variabletype} someVariable This is a description of someVariable, including, perhaps, preconditions.
 * @returns {returntype} A description of what this function is actually returning
 */
  function exampleFunction2(someVariable) {
    /* SOME CODE */
    return something;
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