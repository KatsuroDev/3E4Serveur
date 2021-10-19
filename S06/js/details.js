const ELEMENT_IMG_URL = 'https://assets.andromia.science/elements';

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

    $('#btnMiner').click(() => {
        minePlanet();
    });
    $('#btnAddPortal').click(() => {
        addPortal();
    });
});

async function minePlanet() {
    //GET
    const MINING_URL = `${urlParams.planet}/actions?type=mine`;
    const response = await axios.get(MINING_URL);
    if(response.status === 200)
    {
        const elements = response.data;
        displayElements(elements);
    } else {
        console.log(response);
    }
}

function displayElements(elements){
    let elementsHtml = "";
    $('#extraction tbody').empty();
    elements.forEach(e => {
        elementsHtml += '<tr>';
        
        elementsHtml += `<td><img src="${ELEMENT_IMG_URL}/${e.element}.png" class="elementImg">${e.element}</td>`;
        elementsHtml += `<td>${e.quantity}</td>`;

        elementsHtml += '</tr>';
    });

    $('#extraction tbody').append(elementsHtml);
}

async function addPortal() {

    const isPortalValid = document.getElementById('txtPosition').checkValidity();
    if(isPortalValid)
    {
        const position = $('#txtPosition').val();
        const affinity = $('#cboAffinity').val();
    
        const CREATE_PORTAL_URL = `${urlParams.planet}/portals`;
        
        const body = {
            position: position,
            affinity: affinity
        };
    
        const newPortal = {
            position: position,
            affinity:affinity
        };
        const portalHtml = displayPortal(newPortal);
    
        $('#portals tbody').append(portalHtml);
        // const response = await axios.post(CREATE_PORTAL_URL, body);
        // if (response.status === 201)
        // {
        //     const newPortal = response.data;
            
    
        // } else {
        //     console.log(response);
        // }

    } else {
        console.log('Portal a une position invalide');
    }

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
        portalsHtml += displayPortal(p);
    });

    $("#portals tbody").append(portalsHtml);

}

function displayPortal(portal) {
    let portalHtml = '';

    portalHtml += '<tr>';
        
    portalHtml += `<td>${portal.position}</td>`;
    portalHtml += `<td><img src="img/${portal.affinity}.png" alt="${portal.affinity}" title="${portal.affinity}"></td>`;

    portalHtml += '</tr>';

    return portalHtml;
}