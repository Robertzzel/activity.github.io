let colors = ["blue", "red", "green", "pink", "yellow"]
let boardWidth = window.screen.availWidth
let boardHeight = window.screen.availHeight - (2/10 * window.screen.availHeight)
let app = angular.module("app", [])
let xStep = 8.5
let yStep = 14
let cols = 12
let rows = 4
let interPawnDistance = 10


const pawnWidth = 0.026041666666666668 * boardWidth //  0.026041666666666668 // 40
const pawnHeight = 0.13652912621359223 * boardHeight // 0.13652912621359223 // 90
const INTER_PAWN_DISTANCE = 0.015169902912621358 * boardHeight // 0.015169902912621358 // 10
const START_COORDINATES = [0.07161458333333333 * boardWidth, 0.12135922330097086 * boardHeight] // [0.07161458333333333, 0.12135922330097086] // [110, 80]
const END_COORDINTES = [0, 0]
const PAWN_STEP_X =  0.07486979166666667 * boardWidth // 0.07486979166666667 // 115
const PAWN_STEP_Y =  0.15169902912621358 * boardHeight // 0.15169902912621358 // 100
const BOARD_ROWS = 4
const OFFSET_ON_EVEN_ROWS = 0.06067961165048543 * boardHeight ;

let getCoordsByPosition = (positionNumber, offset) => {
    if(positionNumber < 0) { // prima pozitie
        return START_COORDINATES
    }
    if(positionNumber === 48){
        let [x,y] = getCoordsByPosition(47)
        y -= PAWN_STEP_Y
        return [x, y]
    }
    if(positionNumber >= 49) { // ultima pozitie
        return END_COORDINTES
    }

    let xPos = parseInt(positionNumber / 4) 
    let yPos = positionNumber % BOARD_ROWS + 1
    let addOffset = xPos % 2 === 0

    if(xPos % 2 === 1){
        yPos = 5 - yPos
    }

    xPos = PAWN_STEP_X * xPos + START_COORDINATES[0];
    yPos = PAWN_STEP_Y * yPos + START_COORDINATES[1];

    if(addOffset) {
        yPos += offset
    } else {
        yPos -= offset
        yPos += OFFSET_ON_EVEN_ROWS
    }

    return [xPos, yPos]
}

let getNumberOfTeams = () => {
    while(true) {
        let numberOfTeams = prompt("Number of teams:")
        if(["1", "2", "3", "4", "5"].includes(numberOfTeams)) {
            return numberOfTeams
        }
    }
}

let saveStateInLocalStorage = (pawns) => { // pawns: nr de pioni, pawn-{i} pionul cu nr i
    localStorage.setItem("pawns", pawns.length)
    for(let i = 0; i < pawns.length; ++i){
        localStorage.setItem(`pawn-${i}`, pawns[i].position)
    }
} 

let initFromLocalStorage = () => { // pawns: nr de pioni, pawn-{i} pionul cu nr i
    let avalabilePawns = localStorage.getItem("pawns")
    if(avalabilePawns !== null){
        avalabilePawns = parseInt(avalabilePawns)
        let pawns = []

        for(let i = 0; i < avalabilePawns; ++i) {
            let pawnDetails = localStorage.getItem(`pawn-${i}`)
            let pawnPosition = parseInt(pawnDetails)

            let pawnOffset =  i * interPawnDistance
            let [pawnX, pawnY] = getCoordsByPosition(pawnPosition, pawnOffset)
            pawns.push({color: colors[i], x: pawnX , y: pawnY, position: pawnPosition, offset: pawnOffset})
        }

        return pawns
    }
    return false
}

let initPawns = (numberOfTeams) => {
    let intialCoordsX = START_COORDINATES[0]
    let intialCoordsY = START_COORDINATES[1]
    let pawns = []
    for(let i = 0; i < numberOfTeams; i++) {
        pawns.push({color: colors[i], x: intialCoordsX , y: intialCoordsY + interPawnDistance * i, position: -1, offset: i * interPawnDistance})
    }
    return pawns
}

let createButtons = (scope) => {
    for(let i = 0; i < scope.pawns.length; ++i) {
        let button = document.createElement("button")
        button.innerHTML = "+3"
        button.style.backgroundColor = colors[i]
        button.classList.add("btn")
        button.addEventListener("click", () => {
            scope.pawns[i].position += 3
            let [x, y] = getCoordsByPosition(scope.pawns[i].position, scope.pawns[i].offset)
            scope.pawns[i].x = x
            scope.pawns[i].y = y
            scope.$apply()

            saveStateInLocalStorage(scope.pawns)
        })
        document.body.appendChild(button)

        button = document.createElement("button")
        button.innerHTML = "+4"
        button.style.backgroundColor = colors[i]
        button.classList.add("btn")
        button.addEventListener("click", () => {
            scope.pawns[i].position += 4
            let [x, y] = getCoordsByPosition(scope.pawns[i].position, scope.pawns[i].offset)
            scope.pawns[i].x = x
            scope.pawns[i].y = y
            scope.$apply()

            saveStateInLocalStorage(scope.pawns)
        })
        document.body.appendChild(button)

        button = document.createElement("button")
        button.innerHTML = "+5"
        button.style.backgroundColor = colors[i]
        button.classList.add("btn")
        button.addEventListener("click", () => {
            scope.pawns[i].position += 5
            let [x, y] = getCoordsByPosition(scope.pawns[i].position, scope.pawns[i].offset)
            scope.pawns[i].x = x
            scope.pawns[i].y = y
            scope.$apply()

            saveStateInLocalStorage(scope.pawns)
        })
        document.body.appendChild(button)

        button = document.createElement("button")
        button.innerHTML = "-1"
        button.style.backgroundColor = colors[i]
        button.classList.add("btn")
        button.addEventListener("click", () => {
            scope.pawns[i].position -= 1
            let [x, y] = getCoordsByPosition(scope.pawns[i].position, scope.pawns[i].offset)
            scope.pawns[i].x = x
            scope.pawns[i].y = y
            scope.$apply()

            saveStateInLocalStorage(scope.pawns)
        })
        document.body.appendChild(button)

        button = document.createElement("button")
        button.innerHTML = "+1"
        button.style.backgroundColor = colors[i]
        button.classList.add("btn")
        button.addEventListener("click", () => {
            scope.pawns[i].position += 1
            let [x, y] = getCoordsByPosition(scope.pawns[i].position, scope.pawns[i].offset)
            scope.pawns[i].x = x
            scope.pawns[i].y = y
            scope.$apply()

            saveStateInLocalStorage(scope.pawns)
        })
        document.body.appendChild(button)
    }
}

app.component("pawn", {
    template: `<img ng-src={{$ctrl.image}} style="position: absolute; left: {{$ctrl.x}}px; top: {{$ctrl.y}}px; width: ${pawnWidth}px; height: ${pawnHeight}px">`,
    bindings: {
        color: "=",
        x: "=",
        y: "=",
    },
    controller: function PawnController() {
        this.$onInit = () => {
            this.image = "Pawns/" + this.color + ".png"
        }
    }
})

app.controller("main", ($scope) => {
    let pawns = initFromLocalStorage() 
    if(pawns === false) {
        $scope.numberOfTeams = getNumberOfTeams()
        $scope.pawns = initPawns($scope.numberOfTeams)
    } else {
        $scope.pawns = pawns
    }
    console.log($scope.pawns)
    createButtons($scope)

    let board = document.getElementById("board")
    board.src = "HorizontalBoard.png"
    board.style.width = boardWidth + "px"
    board.style.height = boardHeight + "px"

    document.getElementById("reset-btn").addEventListener("click", () => {
        if(prompt("segur?") !== "yes"){
            return
        }

        if(prompt("segur segur?") !== "yes"){
            return
        }

        localStorage.clear()
        location.reload()
    })
})