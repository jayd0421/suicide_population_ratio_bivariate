<<<<<<< HEAD
const southWest = L.latLng(-90, -250);
const northEast = L.latLng(90, 180);
const bounds = L.latLngBounds(southWest, northEast);

var map = L.map('map', {
    center: [30.0, -30.0],
    zoom: 2,
    minZoom: 2,
    maxZoom: 10,
    maxBounds: bounds,
    maxBoundsViscosity: 1.0, 
    zoomControl: false //
});

var basemap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
    }).addTo(map);

var scale = L.control.scale().addTo(map);

function getSRatioBin(sRatio) {
    if (sRatio >= 8) return 2;
    if (sRatio >= 4) return 1;
    if (sRatio >= 1.2) return 0;
    return -1;
}

function getPRatioBin(pRatio) {
    if (pRatio >= 2) return 2;
    if (pRatio >= 1) return 1;
    if (pRatio >= 0.85) return 0;
    return -1;
}


// CONTROL HOVER INFORMATION
const hoverInfo = document.getElementById('hoverInfo');

// var squareHighlight = document.getElementById('square13')

const squareHighlight11 = document.getElementById('square11');
const squareHighlight12 = document.getElementById('square12');
const squareHighlight13 = document.getElementById('square13');

const squareHighlight21 = document.getElementById('square21');
const squareHighlight22 = document.getElementById('square22');
const squareHighlight23 = document.getElementById('square23');

const squareHighlight31 = document.getElementById('square31');
const squareHighlight32 = document.getElementById('square32');
const squareHighlight33 = document.getElementById('square33');

function highlightFeature(e) {
    const layer = e.target;
    layer.setStyle({
        weight: 2,
        color: '#e5ea54',
        fillOpacity: 0.9
    });
    layer.bringToFront();

    let hoverInfoText = '';

    countryData = e.target.feature.properties;

    if (countryData.GeoAreaName === null || countryData.MFSuicideRatio === null || countryData.MFPopulationRatio === null){
        if (countryData.GeoAreaName === null){
           hoverInfoText = `
            <strong
                style="
                        font-size: 13px;
                        color: red;
                        margin-bottom: 2px;
                        "
                    ;>
               Sorry, this country has missing data.
            </strong>
            `; 
        } else{
            hoverInfoText = `
            <strong 
                style="
                    font-size: 18px;
                    color: red;
                    margin-bottom: 2px;
                    "
                ;>
                ${countryData.GeoAreaName}
            </strong>
            <p>
                Sorry, this country has missing data.
            </p>
                `;
        }
        } else{
            hoverInfoText = `
            <strong 
                class="hover-header">
                ${countryData.GeoAreaName}
            </strong>

            <p class="hover-paragraph-text">
                has 

                <strong class="hover-paragraph-highlight-text">
                    ${countryData.MFSuicideRatio} 
                    times
                </strong> 

                higher suicide rate in males with a 
                
                <strong class="hover-paragraph-highlight-text">
                    higher female population
                </strong>

                (${countryData.MFPopulationRatio} males for every female).
            </p>

            <div class="popup-section">
                <span class="popup-section-header"> Male-Female Ratios</span>
                <div class="popup-section-row">
                    <span class="hover-field-name"> Suicide Ratio:</span>
                    <span class="hover-field-value">${countryData.MFSuicideRatio}</span>
                </div>

                <div class="popup-section-row">
                    <span class="hover-field-name"> Population Ratio:</span>
                    <span class="hover-field-value">${countryData.MFPopulationRatio}</span>
                </div>
            </div>

            <div class="popup-section">
                <span class="popup-section-header"> Suicides per 100,000 of population<span>
                <div class="popup-section-row">
                    <span class="hover-field-name">Males:</span>
                    <span class="hover-field-value">${countryData.MaleSuicide}</span>
                </div>

                <div class="popup-section-row">
                    <span class="hover-field-name">Females:</span>
                    <span class="hover-field-value">${countryData.FemaleSuicide}</span>
                </div>
            </div>

            <div class="popup-section">
                <span class="popup-section-header"> Total Population<span>
                <div class="popup-section-row">
                    <span class="hover-field-name">Males:</span>
                    <span class="hover-field-value">${countryData.MalePopulation}</span>
                </div>

                <div class="popup-section-row">
                    <span class="hover-field-name">Females:</span>
                    <span class="hover-field-value">${countryData.FemalePopulation}</span>
                </div>
            </div>
            `;
        }
    document.getElementById('hoverInfo').innerHTML = hoverInfoText;

    if (countryData.MFSuicideRatio >= 8 && countryData.MFPopulationRatio >= 0.85 && countryData.MFPopulationRatio < 1) {
        squareHighlight11.classList.add('legend-square-active');

    } else if (countryData.MFSuicideRatio < 8 && countryData.MFSuicideRatio >= 4 && countryData.MFPopulationRatio >= 0.85 && countryData.MFPopulationRatio < 1) {
        squareHighlight12.classList.add('legend-square-active');

    } else if (countryData.MFSuicideRatio < 4 && countryData.MFSuicideRatio >= 1.2 && countryData.MFPopulationRatio >= 0.85 && countryData.MFPopulationRatio < 1) {
        squareHighlight13.classList.add('legend-square-active');

    } else if (countryData.MFSuicideRatio >= 8 && countryData.MFPopulationRatio >= 1 && countryData.MFPopulationRatio < 2) {
        squareHighlight21.classList.add('legend-square-active');

    } else if (countryData.MFSuicideRatio < 8 && countryData.MFSuicideRatio >= 4 && countryData.MFPopulationRatio >= 1 && countryData.MFPopulationRatio < 2) {
        squareHighlight22.classList.add('legend-square-active');

    } else if (countryData.MFSuicideRatio < 4 && countryData.MFSuicideRatio >= 1.2 && countryData.MFPopulationRatio >= 1 && countryData.MFPopulationRatio < 2) {
        squareHighlight23.classList.add('legend-square-active');

    } else if (countryData.MFSuicideRatio > 8 && countryData.MFPopulationRatio >= 2) {
        squareHighlight31.classList.add('legend-square-active');

    } else if (countryData.MFSuicideRatio < 8 && countryData.MFSuicideRatio >= 4 && countryData.MFPopulationRatio >= 2) {
        squareHighlight32.classList.add('legend-square-active');

    } else if (countryData.MFSuicideRatio < 4 && countryData.MFSuicideRatio >= 1.2 && countryData.MFPopulationRatio >= 2) {
        squareHighlight33.classList.add('legend-square-active');

    }

    hoverInfo.classList.add('show');
}

function resetHighlight(e) {
    suicidePopulationRatios.resetStyle(e.target);
    hoverInfo.classList.remove('show');
    squareHighlight11.classList.remove('legend-square-active');
    squareHighlight12.classList.remove('legend-square-active');
    squareHighlight13.classList.remove('legend-square-active');
    
    squareHighlight21.classList.remove('legend-square-active');
    squareHighlight22.classList.remove('legend-square-active');
    squareHighlight23.classList.remove('legend-square-active');
    
    squareHighlight31.classList.remove('legend-square-active');
    squareHighlight32.classList.remove('legend-square-active');
    squareHighlight33.classList.remove('legend-square-active');
    
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}


// DEFINE MAP LAYERS
suicidePopulationRatios = L.geoJson(countries, {
    style: suicidePopulationRatiosStyle,
    onEachFeature: onEachFeature
}).addTo(map);

// suicideRatios = L.geoJson(countries, {
//     style: suicideRatiosStyle,
//     onEachFeature: onEachFeature
// })

// populationRatios = L.geoJson(countries, {
//     style: populationRatiosStyle,
//     onEachFeature: onEachFeature
// })

// CONTROL LAYER STYLING
function getFillColor(sRatio, pRatio) {
    const sBin = getSRatioBin(sRatio);
    const pBin = getPRatioBin(pRatio);

    switch (`${sBin}-${pBin}`) {
        case "2-0": return "#d72528";
        case "1-0": return "#d797a3";
        case "0-0": return "#d2deee";

        case "2-1": return "#871c25";
        case "1-1": return "#877194";
        case "0-1": return "#84a6d9";

        case "2-2": return "#371321";
        case "1-2": return "#374b85";
        case "0-2": return "#1f78b4";

        default:
            return "white";
    }
}

// function getFillColor(sRatio, pRatio) {
//     if (sRatio >= 8 && pRatio >= 0.85 && pRatio < 1) {
//         return "#d72528";
//     } else if (sRatio < 8 && sRatio >= 4 && pRatio >= 0.85 && pRatio < 1) {
//         return "#d797a3";
//     } else if (sRatio < 4 && sRatio >= 1.2 && pRatio >= 0.85 && pRatio < 1) {
//         return "#d2deee";
//     } else if (sRatio >= 8 && pRatio >= 1 && pRatio < 2) {
//         return "#871c25";
//     } else if (sRatio < 8 && sRatio >= 4 && pRatio >= 1 && pRatio < 2) {
//         return "#877194";
//     } else if (sRatio < 4 && sRatio >= 1.2 && pRatio >= 1 && pRatio < 2) {
//         return "#84a6d9";
//     } else if (sRatio > 8 && pRatio >= 2) {
//         return "#371321";
//     } else if (sRatio < 8 && sRatio >= 4 && pRatio >= 2) {
//         return "#374b85";
//     } else if (sRatio < 4 && sRatio >= 1.2 && pRatio >= 2) {
//         return "#1f78b4";
//     } else {
//         return "white";
//     }
// }

// function getSuicideFillColor(sRatio) {
//     if (sRatio >= 8) {
//         return "#371321";
//     } else if (sRatio < 8 && sRatio >= 6) {
//         return "#871c25";
//     } else if (sRatio < 6 && sRatio >= 4) {
//         return "#d72528";
//     } else if (sRatio < 4 && sRatio >= 2) {
//         return "#d797a3";
//     } else if (sRatio < 2 && sRatio >= 1.2) {
//         return "#d2deee";
//     } else {
//         return "white";
//     }
// }

// function getPopulationFillColor(pRatio) {
//     if (pRatio >= 2) {
//         return "#374b85";
//     } else if (pRatio >= 1.5 && pRatio < 2) {
//         return "#1f78b4";
//     } else if (pRatio >= 1 && pRatio < 1.5) {
//         return "#84a6d9";
//     } else if (pRatio >= 0.85 && pRatio < 1) {
//         return "#d2deee";
//     } else {
//         return "white";
//     }
// }

function getFillOpacity(country, sRatio, pRatio) {
    if (country === null || sRatio === null || pRatio === null){
        return "0"
    } else {
        return "1"
    }
}


function suicidePopulationRatiosStyle(feature){
    return {
        color: "gray",
        weight: 1,
        fillColor: getFillColor(
            feature.properties.MFSuicideRatio,
            feature.properties.MFPopulationRatio
            ),
        fillOpacity: getFillOpacity(
            feature.properties.GeoAreaName,
            feature.properties.MFSuicideRatio,
            feature.properties.MFPopulationRatio
            ),
        
    }
}

// function suicideRatiosStyle(feature){
//     return {
//         color: "black",
//         weight: 1,
//         fillColor: getSuicideFillColor(
//             feature.properties.MFSuicideRatio
//             ),
//         fillOpacity: getFillOpacity(
//             feature.properties.GeoAreaName,
//             feature.properties.MFSuicideRatio,
//             feature.properties.MFPopulationRatio
//             )
//     }
// }

// function populationRatiosStyle(feature){
// 		return {
//             color: "black",
//             weight: 1,
//             fillColor: getPopulationFillColor(
//                 feature.properties.MFPopulationRatio
//                 ),
//             fillOpacity: getFillOpacity(
//                 feature.properties.GeoAreaName,
//                 feature.properties.MFSuicideRatio,
//                 feature.properties.MFPopulationRatio
//                 )
//         }
//     }


// CONTROL MAP OVERLAY LAYERS
// var baseLayers = {
//     "OpenStreetMap": basemap
// };

// var overlays = {
//     "Suicide & Population Ratios": suicidePopulationRatios,
//     "Suicide Ratios": suicideRatios,
//     "Population Ratios": populationRatios
// };

// var layers = L.control.layers(baseLayers, overlays).addTo(map)  
=======
const southWest = L.latLng(-90, -250);
const northEast = L.latLng(90, 180);
const bounds = L.latLngBounds(southWest, northEast);

var map = L.map('map', {
    center: [30.0, -30.0],
    zoom: 2,
    minZoom: 2,
    maxZoom: 10,
    maxBounds: bounds,
    maxBoundsViscosity: 1.0, 
    zoomControl: false //
});

var basemap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
    }).addTo(map);

var scale = L.control.scale().addTo(map);

function getSRatioBin(sRatio) {
    if (sRatio >= 8) return 2;
    if (sRatio >= 4) return 1;
    if (sRatio >= 1.2) return 0;
    return -1;
}

function getPRatioBin(pRatio) {
    if (pRatio >= 2) return 2;
    if (pRatio >= 1) return 1;
    if (pRatio >= 0.85) return 0;
    return -1;
}


// CONTROL HOVER INFORMATION
const hoverInfo = document.getElementById('hoverInfo');

// var squareHighlight = document.getElementById('square13')

const squareHighlight11 = document.getElementById('square11');
const squareHighlight12 = document.getElementById('square12');
const squareHighlight13 = document.getElementById('square13');

const squareHighlight21 = document.getElementById('square21');
const squareHighlight22 = document.getElementById('square22');
const squareHighlight23 = document.getElementById('square23');

const squareHighlight31 = document.getElementById('square31');
const squareHighlight32 = document.getElementById('square32');
const squareHighlight33 = document.getElementById('square33');

function highlightFeature(e) {
    const layer = e.target;
    layer.setStyle({
        weight: 2,
        color: '#e5ea54',
        fillOpacity: 0.9
    });
    layer.bringToFront();

    let hoverInfoText = '';

    countryData = e.target.feature.properties;

    if (countryData.GeoAreaName === null || countryData.MFSuicideRatio === null || countryData.MFPopulationRatio === null){
        if (countryData.GeoAreaName === null){
           hoverInfoText = `
            <strong
                style="
                        font-size: 13px;
                        color: rgb(27, 207, 27);
                        margin-bottom: 2px;
                        "
                    ;>
               Sorry, this country has missing data.
            </strong>
            `; 
        } else{
            hoverInfoText = `
            <strong 
                style="
                    font-size: 18px;
                    color: rgb(27, 207, 27);
                    margin-bottom: 2px;
                    "
                ;>
                ${countryData.GeoAreaName}
            </strong>
            <p>
                Sorry, this country has missing data.
            </p>
                `;
        }
        } else{
            hoverInfoText = `
            <strong 
                class="hover-header">
                ${countryData.GeoAreaName}
            </strong>

            <p class="hover-paragraph-text">
                has 

                <strong class="hover-paragraph-highlight-text">
                    ${countryData.MFSuicideRatio} 
                    times
                </strong> 

                higher suicide rate in males with a 
                
                <strong class="hover-paragraph-highlight-text">
                    higher female population
                </strong>

                (${countryData.MFPopulationRatio} males for every female).
            </p>

            <div class="popup-section">
                <span class="popup-section-header"> Male-Female Ratios</span>
                <div class="popup-section-row">
                    <span class="hover-field-name"> Suicide Ratio:</span>
                    <span class="hover-field-value">${countryData.MFSuicideRatio}</span>
                </div>

                <div class="popup-section-row">
                    <span class="hover-field-name"> Population Ratio:</span>
                    <span class="hover-field-value">${countryData.MFPopulationRatio}</span>
                </div>
            </div>

            <div class="popup-section">
                <span class="popup-section-header"> Suicides per 100,000 of population<span>
                <div class="popup-section-row">
                    <span class="hover-field-name">Males:</span>
                    <span class="hover-field-value">${countryData.MaleSuicide}</span>
                </div>

                <div class="popup-section-row">
                    <span class="hover-field-name">Females:</span>
                    <span class="hover-field-value">${countryData.FemaleSuicide}</span>
                </div>
            </div>

            <div class="popup-section">
                <span class="popup-section-header"> Total Population<span>
                <div class="popup-section-row">
                    <span class="hover-field-name">Males:</span>
                    <span class="hover-field-value">${countryData.MalePopulation}</span>
                </div>

                <div class="popup-section-row">
                    <span class="hover-field-name">Females:</span>
                    <span class="hover-field-value">${countryData.FemalePopulation}</span>
                </div>
            </div>
            `;
        }
    document.getElementById('hoverInfo').innerHTML = hoverInfoText;

    if (countryData.MFSuicideRatio >= 8 && countryData.MFPopulationRatio >= 0.85 && countryData.MFPopulationRatio < 1) {
        squareHighlight11.classList.add('legend-square-active');

    } else if (countryData.MFSuicideRatio < 8 && countryData.MFSuicideRatio >= 4 && countryData.MFPopulationRatio >= 0.85 && countryData.MFPopulationRatio < 1) {
        squareHighlight12.classList.add('legend-square-active');

    } else if (countryData.MFSuicideRatio < 4 && countryData.MFSuicideRatio >= 1.2 && countryData.MFPopulationRatio >= 0.85 && countryData.MFPopulationRatio < 1) {
        squareHighlight13.classList.add('legend-square-active');

    } else if (countryData.MFSuicideRatio >= 8 && countryData.MFPopulationRatio >= 1 && countryData.MFPopulationRatio < 2) {
        squareHighlight21.classList.add('legend-square-active');

    } else if (countryData.MFSuicideRatio < 8 && countryData.MFSuicideRatio >= 4 && countryData.MFPopulationRatio >= 1 && countryData.MFPopulationRatio < 2) {
        squareHighlight22.classList.add('legend-square-active');

    } else if (countryData.MFSuicideRatio < 4 && countryData.MFSuicideRatio >= 1.2 && countryData.MFPopulationRatio >= 1 && countryData.MFPopulationRatio < 2) {
        squareHighlight23.classList.add('legend-square-active');

    } else if (countryData.MFSuicideRatio > 8 && countryData.MFPopulationRatio >= 2) {
        squareHighlight31.classList.add('legend-square-active');

    } else if (countryData.MFSuicideRatio < 8 && countryData.MFSuicideRatio >= 4 && countryData.MFPopulationRatio >= 2) {
        squareHighlight32.classList.add('legend-square-active');

    } else if (countryData.MFSuicideRatio < 4 && countryData.MFSuicideRatio >= 1.2 && countryData.MFPopulationRatio >= 2) {
        squareHighlight33.classList.add('legend-square-active');

    }

    hoverInfo.classList.add('show');
}

function resetHighlight(e) {
    suicidePopulationRatios.resetStyle(e.target);
    hoverInfo.classList.remove('show');
    squareHighlight11.classList.remove('legend-square-active');
    squareHighlight12.classList.remove('legend-square-active');
    squareHighlight13.classList.remove('legend-square-active');
    
    squareHighlight21.classList.remove('legend-square-active');
    squareHighlight22.classList.remove('legend-square-active');
    squareHighlight23.classList.remove('legend-square-active');
    
    squareHighlight31.classList.remove('legend-square-active');
    squareHighlight32.classList.remove('legend-square-active');
    squareHighlight33.classList.remove('legend-square-active');
    
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}


// DEFINE MAP LAYERS
suicidePopulationRatios = L.geoJson(countries, {
    style: suicidePopulationRatiosStyle,
    onEachFeature: onEachFeature
}).addTo(map);

// suicideRatios = L.geoJson(countries, {
//     style: suicideRatiosStyle,
//     onEachFeature: onEachFeature
// })

// populationRatios = L.geoJson(countries, {
//     style: populationRatiosStyle,
//     onEachFeature: onEachFeature
// })

// CONTROL LAYER STYLING
function getFillColor(sRatio, pRatio) {
    const sBin = getSRatioBin(sRatio);
    const pBin = getPRatioBin(pRatio);

    switch (`${sBin}-${pBin}`) {
        case "2-0": return "#d72528";
        case "1-0": return "#d797a3";
        case "0-0": return "#d2deee";

        case "2-1": return "#871c25";
        case "1-1": return "#877194";
        case "0-1": return "#84a6d9";

        case "2-2": return "#371321";
        case "1-2": return "#374b85";
        case "0-2": return "#1f78b4";

        default:
            return "white";
    }
}

// function getFillColor(sRatio, pRatio) {
//     if (sRatio >= 8 && pRatio >= 0.85 && pRatio < 1) {
//         return "#d72528";
//     } else if (sRatio < 8 && sRatio >= 4 && pRatio >= 0.85 && pRatio < 1) {
//         return "#d797a3";
//     } else if (sRatio < 4 && sRatio >= 1.2 && pRatio >= 0.85 && pRatio < 1) {
//         return "#d2deee";
//     } else if (sRatio >= 8 && pRatio >= 1 && pRatio < 2) {
//         return "#871c25";
//     } else if (sRatio < 8 && sRatio >= 4 && pRatio >= 1 && pRatio < 2) {
//         return "#877194";
//     } else if (sRatio < 4 && sRatio >= 1.2 && pRatio >= 1 && pRatio < 2) {
//         return "#84a6d9";
//     } else if (sRatio > 8 && pRatio >= 2) {
//         return "#371321";
//     } else if (sRatio < 8 && sRatio >= 4 && pRatio >= 2) {
//         return "#374b85";
//     } else if (sRatio < 4 && sRatio >= 1.2 && pRatio >= 2) {
//         return "#1f78b4";
//     } else {
//         return "white";
//     }
// }

// function getSuicideFillColor(sRatio) {
//     if (sRatio >= 8) {
//         return "#371321";
//     } else if (sRatio < 8 && sRatio >= 6) {
//         return "#871c25";
//     } else if (sRatio < 6 && sRatio >= 4) {
//         return "#d72528";
//     } else if (sRatio < 4 && sRatio >= 2) {
//         return "#d797a3";
//     } else if (sRatio < 2 && sRatio >= 1.2) {
//         return "#d2deee";
//     } else {
//         return "white";
//     }
// }

// function getPopulationFillColor(pRatio) {
//     if (pRatio >= 2) {
//         return "#374b85";
//     } else if (pRatio >= 1.5 && pRatio < 2) {
//         return "#1f78b4";
//     } else if (pRatio >= 1 && pRatio < 1.5) {
//         return "#84a6d9";
//     } else if (pRatio >= 0.85 && pRatio < 1) {
//         return "#d2deee";
//     } else {
//         return "white";
//     }
// }

function getFillOpacity(country, sRatio, pRatio) {
    if (country === null || sRatio === null || pRatio === null){
        return "0"
    } else {
        return "1"
    }
}


function suicidePopulationRatiosStyle(feature){
    return {
        color: "gray",
        weight: 1,
        fillColor: getFillColor(
            feature.properties.MFSuicideRatio,
            feature.properties.MFPopulationRatio
            ),
        fillOpacity: getFillOpacity(
            feature.properties.GeoAreaName,
            feature.properties.MFSuicideRatio,
            feature.properties.MFPopulationRatio
            ),
        
    }
}

// function suicideRatiosStyle(feature){
//     return {
//         color: "black",
//         weight: 1,
//         fillColor: getSuicideFillColor(
//             feature.properties.MFSuicideRatio
//             ),
//         fillOpacity: getFillOpacity(
//             feature.properties.GeoAreaName,
//             feature.properties.MFSuicideRatio,
//             feature.properties.MFPopulationRatio
//             )
//     }
// }

// function populationRatiosStyle(feature){
// 		return {
//             color: "black",
//             weight: 1,
//             fillColor: getPopulationFillColor(
//                 feature.properties.MFPopulationRatio
//                 ),
//             fillOpacity: getFillOpacity(
//                 feature.properties.GeoAreaName,
//                 feature.properties.MFSuicideRatio,
//                 feature.properties.MFPopulationRatio
//                 )
//         }
//     }


// CONTROL MAP OVERLAY LAYERS
// var baseLayers = {
//     "OpenStreetMap": basemap
// };

// var overlays = {
//     "Suicide & Population Ratios": suicidePopulationRatios,
//     "Suicide Ratios": suicideRatios,
//     "Population Ratios": populationRatios
// };

// var layers = L.control.layers(baseLayers, overlays).addTo(map)  


>>>>>>> 2151a4474da794a367586734ac8cbdce6f98b2f9
