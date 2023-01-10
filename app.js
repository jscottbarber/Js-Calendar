// const { writeDb } = require("./dbFunctions")
// const { readDb } = require("./dbFunctions")
import { readDb } from "./dbFunctions"

let nav = 0
let clicked = null
let events = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : []

const calendar = document.getElementById("calendar")
const newEventModal = document.getElementById("newEventModal")
const deleteEventModal = document.getElementById("deleteEventModal")
const backDrop = document.getElementById("modalBackDrop")
const eventTitleInput = document.getElementById("eventTitleInput")
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

function openModal(date) {
  clicked = date

  const eventForDay = events.find((e) => e.date === clicked)

  if (eventForDay) {
    document.getElementById("eventText").innerText = eventForDay.title
    deleteEventModal.style.display = "block"
  } else {
    newEventModal.style.display = "block"
  }

  backDrop.style.display = "block"
}

function load() {
  const dt = new Date()

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav)
  }

  const day = dt.getDate()
  const month = dt.getMonth()
  const year = dt.getFullYear()

  const firstDayOfMonth = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  })
  const paddingDays = weekdays.indexOf(dateString.split(", ")[0])

  document.getElementById("monthDisplay").innerText = `${dt.toLocaleDateString(
    "en-us",
    { month: "long" }
  )} ${year}`

  calendar.innerHTML = ""

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement("div")
    daySquare.classList.add("day")

    const dayString = `${month + 1}/${i - paddingDays}/${year}`

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays
      const eventForDay = events.find((e) => e.date === dayString)

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = "currentDay"
      }

      if (eventForDay) {
        const eventDiv = document.createElement("div")
        eventDiv.classList.add("event")
        eventDiv.innerText = eventForDay.title
        daySquare.appendChild(eventDiv)
      }

      daySquare.addEventListener("click", () => openModal(dayString))
    } else {
      daySquare.classList.add("padding")
    }

    calendar.appendChild(daySquare)
  }
}

function closeModal() {
  eventTitleInput.classList.remove("error")
  newEventModal.style.display = "none"
  deleteEventModal.style.display = "none"
  backDrop.style.display = "none"
  eventTitleInput.value = ""
  clicked = null
  load()
}

function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove("error")

    events.push({
      date: clicked,
      title: eventTitleInput.value,
    })

    localStorage.setItem("events", JSON.stringify(events))
    closeModal()
  } else {
    eventTitleInput.classList.add("error")
  }
}

function deleteEvent() {
  events = events.filter((e) => e.date !== clicked)
  localStorage.setItem("events", JSON.stringify(events))
  closeModal()
}

// function loadEvents() {
//   // Need to deal with: File doesn't exist, File is empty, File contains invalid data, File has no appointments, File has 1 or more appointments
//   var xhttp = new XMLHttpRequest()

//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       // Typical action to be performed when the document is ready:
//       //document.getElementById("demo").innerHTML = xhttp.responseText
//       if (xhttp.responseText.trim().length > 0) {
//         var response = JSON.parse(xhttp.responseText)
//         var appointments = response.appointments
//         if (appointments.length > 0) {
//           console.log(appointments)
//         } else {
//           console.log("No Appointments found in the database.")
//         }
//       } else {
//         console.log("The database file is currently empty.")
//       }

//     } else {
//       console.log("The database file does not exist.")
//     }
//   }
//   xhttp.open("GET", "db.json", true)
//   try {
//     xhttp.send()
//   } catch (err) {
//     console.log("The database file does not exist.")
//   }

// }

// function loadEvents() {
//   console.log(readDb("db.json"))
// }

// function readDb(dbName = "db.json") {
//   // read JSON object from file
//   const data = readFileSync(dbName, "utf8")
//   return JSON.parse(data)
// }

// function writeDb(obj, dbName = "db.json") {
//   if (!obj) return console.log("Please provide data to save")
//   try {
//     // TODO Could create a backup before overwriting
//     writeFileSync(dbName, JSON.stringify(obj)) //overwrites current data
//     return console.log("SAVE SUCESS")
//   } catch (err) {
//     return console.log("FAILED TO WRITE")
//   }
// }

function initButtons() {
  document.getElementById("nextButton").addEventListener("click", () => {
    nav++
    load()
  })

  document.getElementById("backButton").addEventListener("click", () => {
    nav--
    load()
  })

  document.getElementById("saveButton").addEventListener("click", saveEvent)
  document.getElementById("cancelButton").addEventListener("click", closeModal)
  document.getElementById("deleteButton").addEventListener("click", deleteEvent)
  document.getElementById("closeButton").addEventListener("click", closeModal)
}

// loadEvents()
readDb()
initButtons()
load()
