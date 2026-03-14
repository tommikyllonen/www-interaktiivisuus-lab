const map = L.map('map').setView([0, 0], 4);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    center: [20, 0],
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
const data_url = "gh4g-9sfh.json"

const toggleFullScreen = () => {
    var fullScreenExit = document.querySelector(".fullscreen-exit-button");
    var fullscreen = document.querySelector(".fullscreen-button");
    let map = document.querySelector(".map");

    if (fullScreenExit.style.display === "none") {
        fullScreenExit.style.display = "block";
        fullscreen.style.display = "none";
        map.style.height = "100vh";
        map('map').setView([0, 0], 4);
        map.maxZoom = 19;



    } else {
        fullScreenExit.style.display = "none";
        fullscreen.style.display = "block";
        map.style.height = "500px";
    }
}
document.querySelector(".fullscreen-button").addEventListener("click", toggleFullScreen);
document.querySelector(".fullscreen-exit-button").addEventListener("click", toggleFullScreen);

const getIconPath = (weight) => {
    let iconPath = "../icons/marker-icon-blue.png"
    if (weight > 0.5 && weight < 10) iconPath = "../icons/marker-icon-green.png";

    if (weight >= 10) iconPath = "../icons/marker-icon-red.png";
    // return blue for all other cases, even if the weight is not defined

    var myIcon = L.icon({
        iconUrl: iconPath,
        iconSize: [25, 41],
        iconAnchor: [12, 41],// This was a guess, but it seems to work pretty much spot on.
        popupAnchor: [1, -34],
        shadowUrl: '',
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
    });
    return myIcon;;
}


const getData = async () => {
    const response = await fetch(data_url);
    const data = await response.json()
    //Place the markers to the map:
    data.forEach((item) => {
        dropDate = new Date(item.year)
        const year = dropDate.getFullYear()
        const massInKG = Number(item.mass) ? `${(item.mass / 1000).toFixed(3)} kg` : "N/A"
        const iconPath = getIconPath(item.mass / 1000 ?? 0)

        if (item.reclat && item.reclong) {
            L.marker([item.reclat, item.reclong], { title: item.name, icon: iconPath }).addTo(map).bindPopup(`<div class="center-all"><div class="bold">${item.name}</div><div>${massInKG}</div><div>${year}</div></div>`);

        }
    })
}
getData()