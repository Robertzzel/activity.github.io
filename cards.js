let c3 = document.getElementById("card-3") 
let c4 = document.getElementById("card-4")
let c5 = document.getElementById("card-5")
let carteAleasa = document.getElementById("chose-card")
let heightCarte = 307;
let widthCarte = 214;

function generareCarte(tipCarte,nrOrdineCarte){
    let pozaRandom = `Cards/${tipCarte}/${nrOrdineCarte}.jpg`
    let widthRandom = `${widthCarte * Math.floor(Math.random()*6)}px`
    let heightRandom = `${heightCarte * Math.floor(Math.random()*6)}px`
    //salveazaInStorage(pozaRandom,widthRandom,heightRandom)

    carteAleasa.style.backgroundImage = `url(${pozaRandom})`
    carteAleasa.style.display = "inline-block";
    // imgCarte.style.height = "307px";
    // imgCarte.style.width = "214px";
    carteAleasa.style.backgroundPositionX = widthRandom
    carteAleasa.style.backgroundPositionY = heightRandom
}

c3.addEventListener("click", () => {
    tipCarte = 3
    nrOrdineCarte = Math.floor(Math.random()*6+1)
    generareCarte(tipCarte,nrOrdineCarte)
})

c4.addEventListener("click", () => {
    tipCarte = 4
    nrOrdineCarte = Math.floor(Math.random()*6+1)
    generareCarte(tipCarte,nrOrdineCarte)
})

c5.addEventListener("click", () => {
    tipCarte = 5
    nrOrdineCarte = Math.floor(Math.random()*6+1)
    generareCarte(tipCarte,nrOrdineCarte)
})