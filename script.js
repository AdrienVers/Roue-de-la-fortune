/* GESTION DU BOUTON DROPRIGHT AFFICHANT LE NOMBRE DE CHOIX */

const dropdowns = document.querySelectorAll(".drop-wrapper");

dropdowns.forEach((dropdown) => {
  let btn = dropdown.querySelector(".btn");
  let caret = dropdown.querySelector(".caret");
  let menu = dropdown.querySelector(".dropright");
  let options = dropdown.querySelectorAll(".dropright a");
  const selected = dropdown.querySelector(".selected");

  btn.addEventListener("click", () => {
    btn.classList.toggle("select-clicked");
    caret.classList.toggle("caret-rotate");
    menu.classList.toggle("dropright-open");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      selected.innerText = option.innerText;
      btn.classList.remove("select-clicked");
      caret.classList.remove("caret-rotate");
      menu.classList.remove("dropright-open");

      options.forEach((option) => {
        option.classList.remove("active");
      });
      option.classList.add("active");
    });
  });
});

/* VARIABLES POUR LA DETECTION DE COLLISION ENTRE LE PADDLE ET LA ROUE */

let paddleDetector = document.querySelector(".paddle-detector");
let slateCollider = document.querySelectorAll(".slate-collider");
let slateCollider2 = document.querySelectorAll(".slate-collider2");
let slateAngle = document.querySelectorAll(".slate-angle-left");
let paddle = document.querySelector(".paddle");

/* VARIABLES POUR LE CHOIX DES POSSIBILITES SUR LA ROUE */

let slatInputs = document.querySelectorAll(".slat-input");
let slatIcon = document.querySelectorAll(".slat-img");
let slatValue = document.querySelectorAll(".slat-label");
let choiceNumberName = document.querySelector(".settings-propositions");
let droprights = document.querySelectorAll(".dropright-n");
let container = document.querySelector(".cards");
let btn = document.getElementById("spin-btn");

/* VARIABLES POUR LA GESTION DE LA PUISSANCE VIA UN CLIC OU VIA LA BARRE D'ESPACE */

let progressBar = document.querySelector(".circular-progress");
let valueContainer = document.querySelector(".value-container");
let click = document.querySelectorAll(".click");
let resetBtn = document.getElementsByClassName("btn-space")[0];
let number = 0;
let progressValue = 0;
let stateClicked = 0;
let stockValue = 0;
let scale = 1;
let coeff = 1.2;

/* GESTION DU RESPONSIVE SUR CERTAINS ELEMENTS */
let clientWidthValue = document.body.clientWidth;
let innerWidthValue = window.innerWidth;

/* GESTION DES DONNEES */

const img10 = [
  "url(images/grillad-lax-10.jpg)",
  "url(images/tartelette-10.jpg)",
  "url(images/paella-10.jpg)",
  "url(images/hamburger.png)",
  "url(images/paprika-10.jpg)",
  "url(images/fish-and-chips-10.jpg)",
  "url(images/salade-grecque-10.jpg)",
  "url(images/moules-frites-10.jpg)",
  "url(images/bandeja-10.jpg)",
  "url(images/poulet-coco-10.jpg)",
];
const img6 = [
  "url(images/bandeja-6.jpg)",
  "url(images/poulet-coco-6.jpg)",
  "url(images/paprika.png)",
  "url(images/fish-and-chips-6.jpg)",
  "url(images/salade-grecque-6.jpg)",
  "url(images/moules-frites-6.jpg)",
];
const img4 = [
  "url(images/bandeja-4.jpg)",
  "url(images/poulet-coco-4.jpg)",
  "url(images/salade-grecque-4.jpg)",
  "url(images/moules-frites-4.jpg)",
];
const imgIcon = [
  "url(images/poulet-coco-i.jpg)",
  "url(images/bandeja-paisa-i.jpg)",
  "url(images/moules-frites-i.jpg)",
  "url(images/salade-grecque-i.jpg)",
  "url(images/fish-and-chips-i.jpg)",
  "url(images/poulet-paprika-i.jpg)",
  "url(images/paella-i.jpg)",
  "url(images/hamburger.png)",
  "url(images/tartelette-i.jpg)",
  "url(images/grillad-lax-i.jpg)",
];
const color = [
  "white",
  "rgb(141, 80, 0)",
  "black",
  "green",
  "yellow",
  "red",
  "dodgerblue",
  "gold",
  "rgb(255, 84, 21)",
  "pink",
];
const value = [
  "Poulet Coco",
  "Bandeja Paisa",
  "Moules Frites",
  "Salade Grecque",
  "Fish and Chips",
  "Poulet Paprika",
  "Paëlla",
  "Hamburger",
  "Sklandrausi",
  "Grillad Lax",
];

/* AFFICHAGE DES ICONS */

for (let n = 0; n < imgIcon.length; n++) {
  slatIcon[n].style.backgroundImage = imgIcon[n];
  slatIcon[n].style.backgroundColor = color[n];
  slatValue[n].value = value[n];
}

/* GESTION DE L'ANIMATION EN CAS DE COLLISION */

function restartAnimation() {
  paddle.style.animationName = "none";
  requestAnimationFrame(() => {
    setTimeout(() => {
      paddle.style.animationName = "";
    }, 0);
  });
}

slateCollider.forEach((item) => {
  slateAngle.forEach((angle) => {
    function update() {
      if (isCollide(paddle, angle)) {
        restartAnimation();
      }

      if (isCollide(paddleDetector, item)) {
        // item.style.backgroundColor = 'green';
      }

      if (!isCollide(paddleDetector, item)) {
        // item.style.backgroundColor = 'white';
      }

      requestAnimationFrame(update);
    }

    function isCollide(a, b) {
      let aRect = a.getBoundingClientRect();
      let bRect = b.getBoundingClientRect();

      return !(
        aRect.top + aRect.height < bRect.top ||
        aRect.top > bRect.top + bRect.height ||
        aRect.left + aRect.width < bRect.left ||
        aRect.left > bRect.left + bRect.width
      );
    }
    requestAnimationFrame(update);
  });
});

/* GESTION DE L'AFFICHAGE ET PUISSANCE DE LA JAUGE */

function doserOut() {
  progressValue = 0;
  valueContainer.textContent = `0%`;
  progressBar.style.boxShadow = `inset 0px 0px 0px 40px transparent`;
}

click.forEach((item) => {
  item.addEventListener("focus", function () {
    this.blur();
  });
  item.addEventListener("mouseover", doserOver);
  item.addEventListener("click", doserClicked);

  if (stateClicked == 1) {
    item.addEventListener("mouseout", doserOut);
  }

  function progressBarStyle() {
    progressBar.style.boxShadow = `inset 0px 0px 0px 40px transparent`;
    progressBar.style.background = `conic-gradient(#34911c ${
      progressValue * 3.6
    }deg, rgb(205, 205, 205) ${progressValue * 3.6}deg )`;
  }

  function doserOver() {
    for (let n = 0; n < click.length; n++) {
      if (item === click[n]) {
        progressValue = ((n + 1) * 25) / 2;
        valueContainer.textContent = `${(n + 1) * 25}%`;
        progressBarStyle();
      }
    }
  }

  function doserClicked() {
    stateClicked = 1;
    for (let n = 0; n < click.length; n++) {
      if (item === click[n]) {
        progressValue = ((n + 1) * 25) / 2;
        valueContainer.textContent = `${(n + 1) * 25}%`;
        progressBarStyle();
        container.style.transition = `5s`;

        switch (n + 1) {
          case 1:
            number += 100 + Math.ceil(Math.random() * 300);
            break;
          case 2:
            number += 450 + Math.ceil(Math.random() * 350);
            break;
          case 3:
            number += 900 + Math.ceil(Math.random() * 400);
            break;
          default:
            console.log("probleme");
            break;
        }
        container.style.transform = "rotate(" + number + "deg)";
      }
    }
  }
});

/* GESTION DE LA BARRE D'ESPACE */

window.addEventListener("keypress", handleKeyPress, false);
window.addEventListener("keyup", handleKeyUp, false);

function handleKeyPress(e) {
  if (e.keyCode === 32) {
    if (scale === 1) {
      progressValue = 0;
      valueContainer.textContent = `0%`;
      progressBar.style.boxShadow = `inset 0px 0px 0px 40px transparent`;
    }

    scale -= 0.005;

    if (0 < progressValue * coeff < 100 * coeff) {
      let progressInt = progressValue / coeff;

      if (progressInt == 100) {
        progressValue = 100 * coeff;
      } else {
        progressValue++;
        progressBar.style.boxShadow = `inset 0px 0px 0px 40px transparent`;
        progressBar.style.background = `conic-gradient(#34911c ${
          (progressValue / (coeff * 2)) * 3.6
        }deg, rgb(205, 205, 205) ${(progressValue / (coeff * 2)) * 3.6}deg )`;
        valueContainer.textContent = `${Math.trunc(progressInt + 1)}%`;
      }
      stockValue = Math.trunc(progressInt);
    }

    if (scale < 0.4) return;
    TweenMax.to(resetBtn, 0.3, { ease: Sine.easeOut, scale: scale });
  }
}

function handleKeyUp(e) {
  if (e.keyCode === 32) {
    scale = 1;
    TweenMax.to(resetBtn, 0.25, { scale: scale });

    if (stockValue > 0 && stockValue <= 10) {
      container.style.transition = `5s`;
      number += 50 + Math.ceil(Math.random() * 250);
    } else if (stockValue > 10 && stockValue <= 25) {
      number += 100 + Math.ceil(Math.random() * 300);
      container.style.transition = `5s`;
    } else if (stockValue > 25 && stockValue <= 50) {
      number += 450 + Math.ceil(Math.random() * 350);
      container.style.transition = `6s`;
    } else if (stockValue > 50 && stockValue <= 75) {
      number += 900 + Math.ceil(Math.random() * 400);
      container.style.transition = `7s`;
    } else if (stockValue > 75 && stockValue < 100) {
      number += 1500 + Math.ceil(Math.random() * 450);
      container.style.transition = `8s`;
    } else if (stockValue >= 100) {
      number += 3500 + Math.ceil(Math.random() * 300);
      container.style.transition = `10s`;
      paddle.style.transition = `5s`;
    }
    container.style.transform = "rotate(" + number + "deg)";
  }
}

/* GESTION DU NOMBRE DE CHOIX */

const slatInputImage = document.querySelectorAll(".slat-img");
const slatInputText = document.querySelectorAll(".slat-text");
const slatDiv = document.querySelectorAll(".slat-div");

droprights.forEach((item) => {
  item.addEventListener("click", function () {
    let slatNumber = 0;
    let slatDegree = 0;
    let slatPercent = 0;

    for (let n = 0; n < droprights.length; n++) {
      if (item === droprights[n]) {
        for (let i = 0; i < (n + 1) * 2; i++) {
          slatInputs[i].style.display = "flex";
        }
        for (let i = (n + 1) * 2; i < slatInputs.length; i++) {
          slatInputs[i].style.display = "none";
        }

        if (item !== droprights[5]) {
          slatNumber = (n + 1) * 2;
          slatDegree = 360 / slatNumber;
          slatPercent = (slatDegree * 100) / 360;

          slatDiv.forEach((img) => {
            slateCollider.forEach((collider) => {
              slateAngle.forEach((angle) => {
                function polygone() {
                  container.style.transition = `0s`;
                  img.style.clipPath = "polygon(0 0, 50% 100%, 100% 0)";
                  img.style.borderTopLeftRadius = "0px";
                  img.style.borderTopRIghtRadius = "0px";
                }

                function slates10And8And6() {
                  img.style.height = "277px";
                  img.style.transformOrigin = "center 277px";
                  angle.style.top = "12px";
                  angle.style.left = "36px";
                }

                function slates10And8() {
                  collider.style.left = "10px";
                  collider.style.bottom = "248px";

                  for (let n = 0; n < slatNumber; n++) {
                    slatDiv[n].style.backgroundImage = img10.slice(n, n + 1);
                  }
                }

                if (slatNumber === 10) {
                  polygone();
                  slates10And8();
                  slates10And8And6();
                  img.style.width = "180px";
                  img.style.bottom = "270px";
                  collider.style.width = "160px";
                } else if (slatNumber === 8) {
                  polygone();
                  slates10And8();
                  slates10And8And6();
                  img.style.width = "230px";
                  img.style.bottom = "270px";
                  collider.style.width = "210px";
                } else if (slatNumber === 6) {
                  polygone();
                  slates10And8And6();
                  img.style.width = "320px";
                  img.style.bottom = "270px";
                  collider.style.width = "268px";
                  collider.style.left = "25px";
                  collider.style.bottom = "233px";
                  paddleDetector.style.height = "90px";
                  paddleDetector.style.left = "45px";

                  for (let n = 0; n < slatNumber; n++) {
                    slatDiv[n + 4].style.backgroundImage = img6.slice(n, n + 1);
                  }
                } else if (slatNumber === 4) {
                  polygone();
                  img.style.width = "650px";
                  img.style.height = "325px";
                  img.style.transformOrigin = "center 325px";
                  img.style.bottom = "275px";
                  collider.style.width = "375px";
                  collider.style.left = "135px";
                  collider.style.bottom = "190px";
                  paddleDetector.style.height = "140px";
                  paddleDetector.style.left = "70px";
                  angle.style.top = "100px";
                  angle.style.left = "150px";

                  for (let n = 0; n < slatNumber; n++) {
                    slatDiv[n + 6].style.backgroundImage = img4.slice(n, n + 1);
                  }
                } else if (slatNumber === 2) {
                  container.style.transition = `0s`;
                  img.style.clipPath = "none";
                  img.style.height = "300px";
                  img.style.width = "700px";
                  img.style.borderTopLeftRadius = "760px";
                  img.style.borderTopRIghtRadius = "760px";
                  img.style.bottom = "270px";
                  img.style.transformOrigin = "center 300px";
                  angle.style.top = "250px";
                  angle.style.left = "20px";

                  for (let n = 0; n < slatNumber; n++) {
                    slatDiv[n + 8].style.backgroundImage = img4.slice(n, n + 1);
                  }
                }
              });
            });
          });

          for (let n = 0; n < 10; n++) {
            slatDiv[n].style.transform =
              "rotate(" + slatDegree * (n + 1) + "deg)";
          }
        }
      }
    }
  });
});

/* GESTION RESPONSIVE D'UN TEXT DANS LE PARAMETRES CONTAINER */

function redimensionnement() {
  if ("matchMedia" in window) {
    if (window.matchMedia("(min-width:1050px)").matches) {
      choiceNumberName.innerText = "Nombre de possibilités :";
    } else {
      choiceNumberName.innerText = "Nombre :";
    }
  }
}

window.addEventListener("resize", redimensionnement, false);
