const urlParams = {};
(window.onpopstate = function () {
    let match;
    const pl = /\+/g; // Regex for replacing addition symbol with a space
    const search = /([^&=]+)=?([^&]*)/g;
    const decode = function (s) {
        return decodeURIComponent(s.replace(pl, ' '));
    };
    const query = window.location.search.substring(1);

    while ((match = search.exec(query))) urlParams[decode(match[1])] = decode(match[2]);
})();

$(document).ready(() => {
    getPlanet(urlParams.planet);
    $('#btnAddPortal').click(() => {
        addPortal();
    });
});

function addPortal() {
    const position = $('#txtPosition').val();
    const affinity = $('cboAffinity').val();

    console.log(position);
    console.log(affinity);
}

async function getPlanet(url) {
    const response = await axios.get(url); 
    if(response.status === 200) {
        const planet = response.data;
        displayPlanet(planet);
        console.log(planet);
    }
}

function precision3(float)
{
    return parseFloat(float.toFixed(3));
}

function displayPlanet(planet) {
    $("#imgIcon").attr("src", planet.icon);
    $("#lblName").html(planet.name);
    $("#lblDiscoveredBy").html(planet.discoveredBy);
    $("#lblDiscoveryDate").html(planet.discoveryDate);
    $("#lblTemperature").html(planet.temperature);
    $("#lblPosition").html(`(${precision3(planet.position.x)}; ${precision3(planet.position.y)}; ${precision3(planet.position.z)})`);

    // Satellites
    let satellitesHtml = '';
    planet.satellites.forEach(s => {
        satellitesHtml += `<li>${s}</li>`;
    });

    if (satellitesHtml.length === 0) {
        satellitesHtml += '<li>Aucun satellite</li>';
    }
    $("#satellites").html(satellitesHtml);

    displayPortals(planet.portals);
}


function displayPortals(portals) {

    let portalsHtml = '';
    portals.forEach(p => {
        portalsHtml += '<tr>';
        
        portalsHtml += `<td>${p.position}</td>`;
        portalsHtml += `<td><img src="img/${p.affinity}.png" alt="${p.affinity}" title="${p.affinity}"></td>`;

        portalsHtml += '</tr>';
    });

    $("#portals").append(portalsHtml);

}