"use strict";

(function() {

  const CHARACTERS = ["link.gif", "squirtle.gif", "umbreon.gif", "sonic.gif"];
  let intervalsIDs = [];


  window.addEventListener("load", init);

  function init() {

    generateBackgroundLogic();

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      clearAllIntervals();
      generateBackgroundLogic();
    });

    generateNavigation();
    setTimeout(function() { generateCharacters(); }, 3000);
    setInitialTextBoxesSpeed();
    ["touch", "click"].forEach(function (event) {
      let textBoxes = qsa(".text-box-animation");
      for (let textBox of textBoxes) {
        textBox.parentElement.parentElement.addEventListener(event, function() {
          turnOffTextBoxAnimation(textBox);
        });
      }
    });
  }

  function generateBackgroundLogic() {


    qs(".stars").innerHTML = "";
    qs(".snowflakes").innerHTML = "";
    id("clouds").innerHTML = "";

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // dark mode
      let shootingStarsID = setInterval(function() {
        if (Math.random() <= 0.5) generateShootingStars()
      }, 15000);
      intervalsIDs.push(shootingStarsID);

      generateStars();
    } else {
      let cloudsID = setInterval(function () { generateClouds(); }, 9000);
      intervalsIDs.push(cloudsID)
      if (Math.random() <= 0.8) generatePetals();
    }
  }

  function generateNavigation() {
    let navButtons = qsa("#nav li");
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

  function setInitialTextBoxesSpeed() {
    let textBoxes = qsa(".text-box-animation");

    for (let textBox of textBoxes) {
      let innerContentLength = textBox.textContent.length;
      textBox.style.setProperty('--n', innerContentLength);
    }
  }

  function generateShootingStars() {
    if (document.visibilityState === 'hidden') return;

    let randomAmount = getRandomIntBetween(2, 3);
    let shootingStarContainer = qs(".stars");

    for (let i = 0; i < randomAmount; i++) {
      let shootingStar = generateShootingStarElement();
      let randomDelay = getRandomIntBetween(1,5) * 1000;
      setTimeout(function () {
        shootingStarContainer.append(shootingStar);
        particleFactory(shootingStar.firstChild);
      }, randomDelay);
    }

  }


  function generateShootingStarElement() {
    let container = gen("div");
    container.classList.add("shooting-star");

    let head = gen("div");
    head.classList.add("shooting-star-head");
    head.style.top = getRandomIntBetween(0, 60) + "vh";
    head.style.left = "-2vw";
    container.appendChild(head);
    let randomRotation = getRandomIntBetween(0, 50);
    let randomAnimationTiming = getRandomIntBetween(8, 13);
    head.style["animation-duration"] = randomAnimationTiming + "s";
    head.style.transform = `rotate(${randomRotation}deg)`


    head.addEventListener("animationend", function () {
      container.remove();
    });

    return container;
  }

  function generateStars() {
    let randomAmount = getRandomIntBetween(75, 125);
    let starsContainer = qs(".stars");
    for (let i = 0; i < randomAmount; i++) {
      let starImage = gen("img");
      starImage.src="img/star.jpg"
      starImage.alt = "star";
      let randomVerticalPosition = getRandomIntBetween(1, 95);
      let randomHorizontalPosition = getRandomIntBetween(1, 100);
      starImage.style.top = randomVerticalPosition + "vh";
      starImage.style.left = randomHorizontalPosition + "vw";

      let randomRotation = getRandomIntBetween(0, 10) * 10
      starImage.style.transform = `rotate(${randomRotation}deg)`
      starImage.style["animation-delay"] = getRandomInt(3) + "s";
      let size = getRandomIntBetween(4, 6);
      starImage.width = size;
      starImage.height = size;
      starsContainer.append(starImage);
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
      let randomCloudNumber = getRandomIntBetween(2,4);
      let randomDuration = getRandomIntBetween(20, 30);
      let randomPosition = getRandomIntBetween(0, 80);
      let randomSize = getRandomIntBetween(10, 20);

      cloudImg.src = "img/cloud" + randomCloudNumber + ".png";
      cloudImg.alt = "cloud";
      cloudImg.style.width = randomSize + "vw";
      cloudImg.style.top = randomPosition + "%";
      cloudImg.style["animation-duration"] = randomDuration;
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
    textBox.classList.remove("text-box-animation");
    textBox.classList.add("text-box-no-animation");
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

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function clearAllIntervals() {
    for (let id of intervalsIDs) {
      clearInterval(id);
    }

    intervalsIDs = [];
  }


  // code from Jacksonkr: Thanks! :D
  // https://stackoverflow.com/questions/32238800/css-how-can-i-make-a-particle-leave-a-trail-that-fades-away
  class Particle {
    constructor(parent) {
      this.div = document.createElement("div");
      this.div.classList.add("particle");
      this.div.classList.add("twinkle");
      this.div.id = "particle-" + Date.now();
      parent.appendChild(this.div);

      setTimeout(() => { // remove particle
        if(this.driftIntervalId) clearInterval(this.driftIntervalId);
        this.div.remove();
      }, 400);
    }

    drift(speed = 1) {
      var rad = Math.PI * Math.random();
      this.driftIntervalId = setInterval(() => {
        var left = +this.div.style.left.replace("px",'');
        var top = +this.div.style.top.replace("px",'');

        left += Math.sin(rad) * speed;
        top += Math.cos(rad) * speed;

        this.div.style.left = left + "px";
        this.div.style.top = top + "px";
      }, 10);
    }
  }

  var particleFactory = function(meteor) {
    var particle = new Particle(meteor.parentElement);
    let rect = meteor.getBoundingClientRect()
    particle.div.style.left = rect.left + "px";
    particle.div.style.top = rect.top + "px";
    particle.drift(0.4);

    setTimeout(() => {
      particleFactory(meteor);
    }, 100);
  };

})();