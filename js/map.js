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

function getSuicideRatioBin(sRatio) {
    if (sRatio >= 6) return 2;
    if (sRatio >= 3) return 1;
    if (sRatio >= 1.2) return 0;
    return -1;
}

function getPopulationRatioBin(pRatio) {
    if (pRatio >= 1) return 2;
    if (pRatio >= 0.97) return 1;
    if (pRatio >= 0.85) return 0;
    return -1;
}


// CONTROL HOVER INFORMATION
const hoverInfo = document.getElementById('hoverInfo');
const legendHoverInfo = document.getElementById('hoverInfo');

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
        color: '#ff0000',
        fillOpacity: 0.9
    });
    layer.bringToFront();

    let hoverInfoText = '';

    countryData = e.target.feature.properties;

    countryName = countryData.GeoAreaName
    sRatio = countryData.MFSuicideRatio
    pRatio = countryData.MFPopulationRatio
    mSuicide = countryData.MaleSuicide
    fSuicide = countryData.FemaleSuicide
    mPopulation = (Number(countryData.MalePopulation.replaceAll(",", ""))/1000000).toFixed(1)
    fPopulation = (Number(countryData.FemalePopulation.replaceAll(",", ""))/1000000).toFixed(1)


    if (countryName === null || sRatio === null || pRatio === null || sRatio === 0 || pRatio === 0 ){
        if (countryName === null){
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
                ${countryName}
            </strong>
            <p>
                Sorry, this country has missing data.
            </p>
                `;
        }
        } else{
            if (fPopulation > mPopulation) {
                popText = 'higher female population'
            } else{
                popText = 'higher male population'
            }

            hoverInfoText = `
            <strong 
                class="hover-header">
                ${countryName}
            </strong>

            <p class="hover-paragraph-text">
                has 

                <strong class="hover-paragraph-highlight-text">
                    ${sRatio} 
                    times
                </strong> 

                higher suicide rate in males with a 
                
                <strong class="hover-paragraph-highlight-text">
                    ${popText}
                </strong>

                (${pRatio} males for every female).
            </p>

            <div class="popup-section">
                <span class="popup-section-header"> Male-Female Ratios</span>
                <div class="popup-section-row">
                    <span class="hover-field-name"> Suicide Ratio:</span>
                    <span class="hover-field-value">${sRatio}</span>
                </div>

                <div class="popup-section-row">
                    <span class="hover-field-name"> Population Ratio:</span>
                    <span class="hover-field-value">${pRatio}</span>
                </div>
            </div>

            <div class="popup-section">
                <span class="popup-section-header"> Suicides per 100,000 of population<span>
                <div class="popup-section-row">
                    <span class="hover-field-name">Males:</span>
                    <span class="hover-field-value">${mSuicide}</span>
                </div>

                <div class="popup-section-row">
                    <span class="hover-field-name">Females:</span>
                    <span class="hover-field-value">${fSuicide}</span>
                </div>
            </div>

            <div class="popup-section">
                <span class="popup-section-header"> Total Population<span>
                <div class="popup-section-row">
                    <span class="hover-field-name">Males:</span>
                    <span class="hover-field-value">${mPopulation}M</span>
                </div>

                <div class="popup-section-row">
                    <span class="hover-field-name">Females:</span>
                    <span class="hover-field-value">${fPopulation}M</span>
                </div>
            </div>
            `;
        }
    document.getElementById('hoverInfo').innerHTML = hoverInfoText;

    const sBin = getSuicideRatioBin(sRatio);
    const pBin = getPopulationRatioBin(pRatio);

    switch (`${sBin}-${pBin}`) {
        case "2-0": squareHighlight11.classList.add('legend-square-active'); break;
        case "1-0": squareHighlight12.classList.add('legend-square-active'); break;
        case "0-0": squareHighlight13.classList.add('legend-square-active'); break;

        case "2-1": squareHighlight21.classList.add('legend-square-active'); break;
        case "1-1": squareHighlight22.classList.add('legend-square-active'); break;
        case "0-1": squareHighlight23.classList.add('legend-square-active'); break;

        case "2-2": squareHighlight31.classList.add('legend-square-active'); break;
        case "1-2": squareHighlight32.classList.add('legend-square-active'); break;
        case "0-2": squareHighlight33.classList.add('legend-square-active'); break;
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


// CONTROL LAYER STYLING
function getFillColor(sRatio, pRatio) {
    const sBin = getSuicideRatioBin(sRatio);
    const pBin = getPopulationRatioBin(pRatio);

    switch (`${sBin}-${pBin}`) {
        case "2-0": return "#9e3547";
        case "1-0": return "#ba8890";
        case "0-0": return "#d3d3d3";

        case "2-1": return "#682a41";
        case "1-1": return "#7a6b84";
        case "0-1": return "#8aa6c2";

        case "2-2": return "#311e3b";
        case "1-2": return "#3a4e78";
        case "0-2": return "#4279b0";

        default:
            return "white";
    }
}


function getFillOpacity(country, sRatio, pRatio) {
    if (country === null || sRatio === null || pRatio === null|| sRatio === 0 || pRatio === 0){
        return "0.1"
    } else {
        return "1"
    }
}


function suicidePopulationRatiosStyle(feature){
    return {
        color: 'white',
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


function getHighlightStyle(squareId, sRatio, pRatio) {
    const sBin = getSuicideRatioBin(sRatio);
    const pBin = getPopulationRatioBin(pRatio);
    const spBin = ''

    switch (`${squareId}`) {
        case "square11": spBin = "2-0"; break;
        case "square12": spBin = "1-0"; break;
        case "square13": spBin = "0-0"; break;

        case "square21": spBin = "2-1"; break;
        case "square22": spBin = "1-1"; break;
        case "square23": spBin = "0-1"; break;

        case "square31": spBin = "2-2"; break;
        case "square32": spBin = "1-2"; break;
        case "square33": spBin = "0-2"; break;
    }

    if (spBin == (`${sBin}-${pBin}`)) {
        return 1
    } else{
        return 0
    }
}

function highlightCountryStyle(feature, squareId){
    const statuss = getHighlightStyle(
        squareId,
        feature.properties.MFSuicideRatio,
        feature.properties.MFPopulationRatio
        )
    if (statuss == 1){
        return {
            weight: 2,
            color: '#a80202',
            fillOpacity: 0.9
        }
    }
}

function squareHoverOn(element){
    suicidePopulationRatios.setStyle(function (feature) {
        return highlightCountryStyle(feature, element.id);
        }
    )

    legendHoverInfoText = `
            <p class="hover-paragraph-text"> The highlighted countries have</p>

            <p class="hover-paragraph-text">
                has 

                <strong class="hover-paragraph-highlight-text">
                    X
                    times
                </strong> 

                higher suicide rate in males with a 
                
                <strong class="hover-paragraph-highlight-text">
                    higher female population
                </strong>

                X males for every female.
            </p>
            `;
    document.getElementById('legendHoverInfo').innerHTML = legendHoverInfoText;
    
    // legendHoverInfo.classList.add('show')
}

function squareHoverOff() {
    suicidePopulationRatios.resetStyle()
    // legendHoverInfo.classList.remove('show');
}
