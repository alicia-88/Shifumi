"use strict"
/* 
    Créer une liste avec trois éléments (Pierre, Feuille, Ciseaux).
    Ajouter un bouton « Shifumi ! ».
    Lorsque l'on clique sur « Shifumi ! », choisir un élément au hasard (Pierre, Feuille ou Ciseaux). 
    Le comparer à l'élément choisi par le joueur pour voir qui a gagné entre l'humain et la machine.
    Pour ce TP, laissez libre cours à votre imagination en proposant une version originale du célèbre jeu!
    Bonus : Ajouter un compteur de victoires et de défaites et afficher le pourcentage de victoire contre l'ordinateur.
*/

import 'popper.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import "@fortawesome/fontawesome-free/css/all.css"

const playerVictoireEl = document.getElementById("player-victoire")
const playerDefeatEl = document.getElementById("player-defeat")
const computerVictoireEl = document.getElementById("computer-victoire")
const computerDefeatEl = document.getElementById("computer-defeat")

const computerChoiceEl = document.getElementById("computer-choice")
const playerChoiceEl = document.getElementById("player-choice")

const playerIconEls = document.querySelectorAll(".player-icon")

const resultRightEl = document.getElementById("result-right")

const btnShifumiEl = document.getElementById("btn-shifumi")
const btnResetEl = document.getElementById("btn-reset")
const btnHistory = document.getElementById("btn-history")
const containerEl = document.getElementById("container")

const imgAnimateEl = document.querySelector(".img-animate")

let screenXMax = containerEl.clientWidth - 200
let screenXMin = 100
let screenYMax = containerEl.clientHeight - 200
let screenYMin = 100

let playerVictoireValue = 0
let computerVictoireValue = 0
let playerDefeatValue = 0
let computerDefeatValue = 0
let match = 0
const percentageComputerEl = document.getElementById("percentageComputer")
const percentageUserEl = document.getElementById("percentageUser")

const choices = {
  rock: { name: "Rock", defeats: ["scissors", "lizard"] },
  paper: { name: "Paper", defeats: ["rock", "spock"] },
  scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
  lizard: { name: "Lizard", defeats: ["paper", "spock"] },
  spock: { names: "Spock", defeats: ["scissors", "rock"] },
}

function myMove(playerChoiceValue) {
  imgAnimateEl.classList.add("d-none")
  switch (playerChoiceValue) {
    case "lizard":
      imgAnimateEl.src = new URL("../img/lizard.png", import.meta.url)
      break
    case "spock":
      imgAnimateEl.src = new URL("../img/spock.png", import.meta.url)
      break
    case "scissors":
      imgAnimateEl.src = new URL("../img/scissors.png", import.meta.url)
      break
    case "paper":
      imgAnimateEl.src = new URL("../img/paper.png", import.meta.url)
      break
    case "rock":
      imgAnimateEl.src = new URL("../img/rock.png", import.meta.url)
      break
  }

  let { ...posA } = position()
  let { ...posB } = position()
  // while (
  //   (Math.abs(posA.posX - posB.posX) < 200) ||
  //   (Math.abs(posA.posY - posB.posY) < 200) ||
  //   (posA.posX > posB.posX) ||
  //   (posB.posY > posB.posY)
  // ) {
  //   posA = position()
  // }
  imgAnimateEl.style.top = posA.posY + "px"
  imgAnimateEl.style.left = posA.posX + "px"
  imgAnimateEl.classList.remove("d-none")

  let id = null
  clearInterval(id)
  id = setInterval(frame, 10)

  function frame() {
    if (posA.posX >= posB.posX || posA.posY >= posB.posY) {
      clearInterval(id)
    } else {
      posA.posX += 5
      posA.posY += 5
      imgAnimateEl.style.top = posA.posY + "px"
      imgAnimateEl.style.left = posA.posX + "px"
    }
  }
}

/* Function Return Computer Choice */
const getComputerChoice = () => {
  let randomValue = Math.floor(Math.random() * 5)
  let computerChoice = ""

  switch (randomValue) {
    case 0:
      computerChoice = "rock"
      break
    case 1:
      computerChoice = "paper"
      break
    case 2:
      computerChoice = "scissors"
      break
    case 3:
      computerChoice = "lizard"
      break
    case 4:
      computerChoice = "spock"
      break
    default:
      break
  }
  return computerChoice
}
const position = () => {

  let posX = Math.floor(
    Math.random() * (screenXMax - screenXMin + 1) + screenXMin
  )
  let posY = Math.floor(
    Math.random() * (screenYMax - screenYMin + 1) + screenYMin
  )
  return { posX, posY }
}
/* Function Test Score */
const testScore = (playerChoiceValue, computerChoiceValue) => {
  if (playerChoiceValue === computerChoiceValue) {
    resultRightEl.textContent = "Match Nul"
  } else {
    const choice = choices[playerChoiceValue]
    if (choice.defeats.indexOf(computerChoiceValue) != -1) {
      resultRightEl.textContent = "🎉🎈Tu as gagné 🎈🎉"
      myMove(playerChoiceValue)
      playerVictoireValue++
      computerDefeatValue++
    } else {
      resultRightEl.textContent = "Tu as perdu"
      playerDefeatValue++
      computerVictoireValue++
    }
  }
}

/* Function Return Player Choice */
const getPlayerChoice = () => {
  let playerChoice = ""
  playerIconEls.forEach((playerIconEl) => {
    if (playerIconEl.classList.contains("select")) {
      playerChoice = playerIconEl.id
    }
  })
  return playerChoice
}

/* Function Select */
const select = (event) => {
  imgAnimateEl.classList.add("d-none")

  let playerIconId = event.target.id
  computerChoiceEl.textContent = "--- . . . ---"
  playerChoiceEl.textContent = "--- . . . ---"
  playerIconEls.forEach((playerIconEl) => {
    if (playerIconEl.id == playerIconId) {
      playerIconEl.classList.add("select")
    } else {
      playerIconEl.classList.remove("select")
    }
  })
}
/* Function Update Score */
const updateScore = () => {
  playerVictoireEl.textContent = playerVictoireValue
  playerDefeatEl.textContent = playerDefeatValue

  computerVictoireEl.textContent = computerVictoireValue
  computerDefeatEl.textContent = computerDefeatValue
}
const updatePercentage = (divEl, victoire) => {
  let percentage =
    (victoire / (computerVictoireValue + playerVictoireValue)) * 100
  divEl.textContent = `${percentage.toFixed(2)}%`
}
/* Play Game */
const shifumi = () => {
  match++
  imgAnimateEl.classList.add("d-none")
  let computerChoiceValue = getComputerChoice()
  let playerChoiceValue = getPlayerChoice()
  computerChoiceEl.textContent = `--- ${computerChoiceValue} ---`
  playerChoiceEl.textContent = `--- ${playerChoiceValue} ---`
  testScore(playerChoiceValue, computerChoiceValue)
  updateScore()
  updatePercentage(percentageUserEl, playerVictoireValue)
  updatePercentage(percentageComputerEl, computerVictoireValue)
  historySave()
}
/* Function History */
const historySave = () => {
  let history = {
    computerVictoireValue,
    computerDefeatValue,
    playerVictoireValue,
    playerDefeatValue,
  }
  localStorage.setItem("shifumi", JSON.stringify(history))
}
const history = () => {
  if (localStorage.getItem("shifumi")) {
    const value = JSON.parse(localStorage.getItem("shifumi"))
    playerVictoireEl.textContent = value.playerVictoireValue
    playerDefeatEl.textContent = value.playerDefeatValue
    computerVictoireValue = value.computerVictoireValue
    playerVictoireValue = value.playerVictoireValue
    computerDefeatValue = value.computerDefeatValue
    playerDefeatValue = value.playerDefeatValue
    computerVictoireEl.textContent = value.computerVictoireValue
    computerDefeatEl.textContent = value.computerDefeatValue
    updatePercentage(percentageUserEl, playerVictoireValue)
    updatePercentage(percentageComputerEl,computerVictoireValue)
  } else {
    return
  }
}
/* Function Reset */
const reset = (e) => {
  if (e.target.id == "btn-reset") {
    localStorage.clear()
  }
  imgAnimateEl.classList.add("d-none")
  percentageComputerEl.textContent = ""
  percentageUserEl.textContent = ""
  resultRightEl.textContent = ""
  computerChoiceEl.textContent = "--- . . . ---"
  computerVictoireEl.textContent = 0
  computerDefeatEl.textContent = 0

  playerChoiceEl.textContent = "--- . . . ---"
  playerVictoireEl.textContent = 0
  playerDefeatEl.textContent = 0

  playerVictoireValue = parseInt(playerVictoireEl.textContent)
  computerVictoireValue = parseInt(computerVictoireEl.textContent)
  playerDefeatValue = parseInt(playerDefeatEl.textContent)
  computerDefeatValue = parseInt(computerDefeatEl.textContent)
}

/* Event Listener */
btnShifumiEl.addEventListener("click", shifumi)
btnResetEl.addEventListener("click", reset)
btnHistory.addEventListener("click", history)

playerIconEls.forEach((playerIconEl) => {
  playerIconEl.addEventListener("click", select)
})

window.addEventListener("load", reset)
