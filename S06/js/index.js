const SERVICE_URL = "https://api.andromia.science/planets/";

$(document).ready(() => {
    getPlanets();
});


async function getPlanets() {
    try {
        const response = await axios.get(SERVICE_URL);
        if(response.status === 200) {
            const planets = response.data;
            planets.forEach(p => {
                $('#planets').append(displayPlanet(p));
            });
        } else {
            console.log(response);
        }
    } catch(err) {
        console.log(err);
    }
}

function displayPlanet(planet) {
    let planetHtml = '<div class="card col-2 mx-2 my-2">';

    planetHtml += `<a href="details.html?planet=${planet.href}"><img class="card-img-top" src="${planet.icon}"}></a>`
    planetHtml += `<a href="details.html?planet=${planet.href}"><h5 class="card-title">${planet.name}</h5></a>`

    planetHtml += '</div>';

    return planetHtml;
}