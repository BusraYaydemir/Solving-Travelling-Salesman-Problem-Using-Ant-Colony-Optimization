// ! TRANSITION OF SETTING VE RESULT BUTTONS

const settingBtn = document.getElementById("settingBtn");
const settingWrapper = document.getElementById("settingWrapper");
const resultBtn = document.getElementById("resultBtn");
const resultWrapper = document.getElementById("resultWrapper");

settingWrapper.classList.add("visible");
resultWrapper.classList.remove("visible");

settingBtn.addEventListener("click", () => {
    settingWrapper.classList.add("visible");
    resultWrapper.classList.remove("visible");
});

resultBtn.addEventListener("click", () => {
    settingWrapper.classList.remove("visible");
    resultWrapper.classList.add("visible");
});


//! SETTINGS SCROLLS IN OPTION

let antRange = document.getElementById("ant-numbers");
let antValue = document.getElementById("ant-value");

let alphaRange = document.getElementById("alpha");
let alphaValue = document.getElementById("alpha-value");

let betaRange = document.getElementById("beta");
let betaValue = document.getElementById("beta-value");

let rhoRange = document.getElementById("rho");
let rhoValue = document.getElementById("rho-value");

let iterationRange = document.getElementById("iteration-numbers");
let iterationValue = document.getElementById("iteration-value");

let speedRange = document.getElementById("speed");
let speedValue = document.getElementById("speed-value");

let createBtn = document.getElementById("create");

antRange.addEventListener("input", () => {
    antValue.innerHTML = antRange.value < 10 ? "0" + antRange.value : antRange.value;
});

alphaRange.addEventListener("input", () => {
    alphaValue.innerHTML = alphaRange.value;
});

betaRange.addEventListener("input", () => {
    betaValue.innerHTML = betaRange.value;
});

rhoRange.addEventListener("input", () => {
    rhoValue.innerHTML = rhoRange.value;
});

iterationRange.addEventListener("input", () => {
    iterationValue.innerHTML = iterationRange.value < 10 ? "0" + iterationRange.value : iterationRange.value;
});

speedRange.addEventListener("input", () => {
    speedValue.innerHTML = speedRange.value < 10 ? "0" + speedRange.value : speedRange.value;
});

//! DEFINITIONS REQUIRED FOR PROGRESS AND BEST ROUTE 

let progressNumber = document.getElementById("progress-number");
let progress = document.getElementById("progress");
var count = 0;
let bestRouteHTML = document.getElementById("best-route");
let bestCostHTML = document.getElementById("best-cost");

//! OPENING AND CLOSING MODELS

let distanceModal = document.getElementById("content-distance-modal");
let distanceModalOpenBtn = document.getElementById("distanceBtn");

distanceModalOpenBtn.addEventListener("click", () => {
    distanceModal.style.display = "flex";
});

distanceModal.addEventListener("click", () => {
    if(event.target === distanceModal) {
        distanceModal.style.display = "none";
    }
});

let phermoneModal = document.getElementById("content-phermone-modal");
let phermoneModalOpenBtn = document.getElementById("phermoneBtn");

phermoneModalOpenBtn.addEventListener("click", () => {
    phermoneModal.style.display = "flex";
});

phermoneModal.addEventListener("click", () => {
    if(event.target === phermoneModal) {
        phermoneModal.style.display = "none";
    }
});

pathModal = document.getElementById("content-path-modal");
let pathModalOpenBtn = document.getElementById("pathBtn");

pathModalOpenBtn.addEventListener("click", () => {
    pathModal.style.display = "flex";
});

pathModal.addEventListener("click", () => {
    if(event.target === pathModal) {
        pathModal.style.display = "none";
    }
});

//! ESTABLISHING THE DISTANCE TABLE STRUCTURE

let distanceTable = document.getElementById("distance-content");

function addDistanceTable() {
    let tbl = document.getElementById("distance");
    let tr;
    for(let row = 0; row <= cities.length; row++) {
        tr = tbl.insertRow();
        for(let col = 0; col <= cities.length; col++) {
            let td = tr.insertCell();

            if(row == 0) {
                if(col != cities.length) {
                    td = tr.insertCell();
                    td.innerHTML = cities[col].name;
                    tr.appendChild(td);
                }
            } else {
                if(col == cities.length) {
                    td = tr.insertCell();
                    td.innerHTML = cities[row-1].name;
                    tr.appendChild(td);
                } else {
                    td = tr.insertCell();
                    td.id = `${cities[col].name}${cities[row-1].name}`;

                    for( let i= 0; i < paths.length; i++) {
                        if(paths[i].id == td.id) {
                            td.innerHTML = (paths[i].distance).toFixed(2);
                            break;
                        } else {
                            td.innerHTML = `${cities[col].name}${cities[row-1].name}`;
                        }
                    }

                    if(cities[col].name == cities[row-1].name) {
                        td.innerHTML = 0;
                    }
                }
            }
        }
    }
    distanceTable.appendChild(tbl);
}

//! ESTABLISHING THE PHERMONE TABLE STRUCTURE

let phermoneTable = document.getElementById("phermone-content");
function addPhermoneTable(iteration, max, min) {
    let tbl = document.createElement("table");
    let tr;
    let caption = document.createElement("caption");
    caption.textContent = `Phermone Number for ${iteration}. Iteration`;
    tbl.appendChild(caption);

    for(let row = 0; row <= cities.length; row++) {
        tr = tbl.insertRow();
        for(let col= 0; col <= cities.length; col++) {
            let td = tr.insertCell();

            if(row==0) {
                if(col != cities.length) {
                    td = tr.insertCell();
                    td.innerHTML = cities[col].name;
                    tr.appendChild(td);
                }
            } else {
                if (col == cities.length) {
                    td = tr.insertCell();
                    td.innerHTML = cities[row-1].name;
                    tr.appendChild(td);
                } else {
                    td = tr.insertCell();
                    td.id = `${cities[col].name}${cities[row-1].name}`;

                    for(let i=0; i < paths.length; i++) {
                        if (paths[i].id == td.id) {
                            td.innerHTML = (paths[i].phermone).toFixed(4);
                            if(max != min) {
                                if(paths[i].phermone == min) {
                                    td.style.backgroundColor = "red";
                                } else if (paths[i].phermone == max) {
                                    td.style.backgroundColor = "green";
                                }
                            }
                            break;
                        } else {
                            td.innerHTML = `${cities[col].name}${cities[row-1].name}`;
                        }
                    }

                    if(cities[col].name == cities[row-1].name) {
                        td.innerHTML = 0;
                    }
                }
            }
        }
    }
    phermoneTable.appendChild(tbl);
}

//! ESTABLISHING THE PATH TABLE STRUCTURE

let antRouteTable = document.getElementById("path-content");
function addAntRouteTable(iteration, ant, currentRoute) {
    let tbl = document.getElementById("ant-route");
    let tr = tbl.insertRow();

    let tdIteration = tr.insertCell();
    tdIteration.innerHTML = iteration;
    tr.appendChild(tdIteration);

    let tdAnt = tr.insertCell();
    tdAnt.innerHTML = ant;
    tr.appendChild(tdAnt);

    let tdRoute = tr.insertCell();
    tdRoute.innerHTML = "";
    for (let i = 0; i < currentRoute.length -1 ; i++) {
        tdRoute.innerHTML += currentRoute[i].startCity.name + " ";
    }
    tr.appendChild(tdRoute);

    let tdCost = tr.insertCell();
    tdCost.innerHTML = currentRoute[currentRoute.length - 1].toFixed(2);
    tr.appendChild(tdCost);
    antRouteTable.appendChild(tbl);
}

//! REQUIRED CODES FOR LINE CHART

let lineCanvas = document.getElementById("line-chart");
let ctx = lineCanvas.getContext("2d");

const lineCanvasWidth = parseInt(lineCanvas.getAttribute("width"),10);
const lineCanvasHeight = parseInt(lineCanvas.getAttribute("height"), 10);

const data = [];

function drawLineChart() {
    ctx.clearRect(0, 0, lineCanvasWidth,lineCanvasHeight);
    const start_value = Math.max(...data);

    let slicedData = [];
    if(data.length > 30) {
        const sliceStartIndex = Math.max(data.length - 30, 0);
        slicedData = data.slice(sliceStartIndex);
    } else {
        slicedData = data.slice();
    }

    const distance = lineCanvasWidth / (slicedData.length -1);
    const start_point = 0;

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgb(0, 0, 199, 0.8)";
    ctx.moveTo(start_point, lineCanvasHeight);

    for(let index = 0; index < slicedData.length ; index++) {
        const element = slicedData[index];
        const new_distance = start_point + (distance * index);
        const normalized_element = lineCanvasHeight - (element / start_value) * lineCanvasHeight;
        ctx.lineTo(new_distance, normalized_element);
    }

    ctx.lineTo(lineCanvasWidth, lineCanvasHeight);
    ctx.lineTo(start_point, lineCanvasHeight);

    ctx.fillStyle = "rgb(192,192,192,0.4)";
    ctx.fill();

    ctx.stroke();
    ctx.closePath();
}

//! REQUIRED CODES FOR ANT COLONY OPTIMIZATION

let canvas = document.getElementById("city-canvas");
let context = canvas.getContext("2d");
let cities = [];

const canvasWidth = parseInt(canvas.getAttribute("width"), 10);
const canvasHeight = parseInt(canvas.getAttribute("height"), 10);

function drawCities() {
    cities.forEach((city) => {
        context.beginPath();
        context.arc(city.x, city.y, 10, 0, Math.PI*2);
        context.fillStyle = "white";
        context.fill();
        context.closePath();

        context.beginPath();
        context.font = "bold 12px Quicksand";
        context.textAlign = "center";
        context.textBaseLine = "middle";
        context.fillStyle = "red";
        context.fillText(city.name, city.x, city.y +2);
        context.closePath();
    });
}

let cityNameIndex = 65;

function assignCityName() {
    const nextCityName = String.fromCharCode(cityNameIndex);
    cityNameIndex++;
    return nextCityName;
}

function handleClick(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const cityName = assignCityName();

    cities.push({
        x: mouseX,
        y: mouseY,
        name: cityName,
        visited: false
    });

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    drawCities();
}

canvas.addEventListener("click", handleClick);

paths = [];

function addPathInfo() {
    for(let i = 0; i < cities.length; i++) {
        for (let j = 0; j < cities.length; j++){
            if(i != j) {
                paths.push({
                    id: cities[i].name + cities[j].name,
                    startCity: cities[i],
                    endCity: cities[j],
                    phermone: 1,
                    distance: Math.sqrt(
                        (cities[i].x - cities[j].x) * (cities[i].x - cities[j].x) + (cities[i].y - cities[j].y) * (cities[i].y - cities[j].y)),
                    probability: 1
                });
            }
        }
    }
}

function drawBestPath(paths) {
    for(let i = 0; i < paths.length - 1 ; i++) {
        context.beginPath();
        context.strokeStyle = "white";
        context.lineWidth = 2;
        context.moveTo(paths[i].startCity.x , paths[i].startCity.y);
        context.lineTo(paths[i].endCity.x, paths[i].endCity.y);
        context.stroke();
        context.closePath();
    }
}

function drawPath() {
    let phermoneValues = paths.map(function (path) {
        return path.phermone;
    });

    let maxPhermone = Math.max(...phermoneValues);
    let minPhermone = Math.min(...phermoneValues);

    for(let i = 0; i < paths.length; i++) {
        let phermoneRate = 1;
        if(minPhermone != maxPhermone) {
            phermoneRate = (paths[i].phermone - minPhermone) / (maxPhermone - minPhermone);
        }

        context.beginPath();
        context.strokeStyle = `rgba(139, 0, 0, ${phermoneRate})`;
        context.lineWidth = 10;
        context.moveTo(paths[i].startCity.x, paths[i].startCity.y);
        context.lineTo(paths[i].endCity.x, paths[i].endCity.y);
        context.stroke();
        context.closePath();
    }
}

function calculateProbability(cityI, cityJ) {
    let probabilityIJ;
    let total = 0;
    let pathIndex;

    for(let i = 0; i < paths.length; i++) {
        if(paths[i].id.startsWith(cityI.name) && paths[i].endCity.visited == false && cityI != cityJ) {
            if(paths[i].id == cityI.name + cityJ.name) {
                pathIndex = i;
                probabilityIJ = Math.pow(paths[i].phermone, alphaRange.value) * Math.pow(1 / paths[i].distance, betaRange.value);
            }

            total += Math.pow(paths[i].phermone, alphaRange.value) * Math.pow(1 / paths[i].distance, betaRange.value);
        }
    }

    if(typeof pathIndex != "undefined") {
        paths[pathIndex].probability = probabilityIJ / total;
    }
}

let updatePhermoneAmount = [];

function addUpdatePhermoneAmountInfo() {
    for(let i = 0; i < paths.length; i++) {
        updatePhermoneAmount.push({
            id: paths[i].id,
            updateAmount: 1
        });
    }
}

function willUpdatePhermoneAmount(way, cost) {
    for(let i = 0; i <paths.length; i++) {
        for(let j = 0; j < way.length; j++) {
            if(paths[i].id == way[j] ||paths[i].id == way[j].charAt(1) + way[j].charAt(0)) {
                updatePhermoneAmount[i].updateAmount += (10 / cost);
            }
        }
    }
}

function updatePhermone() {
    for(let i = 0; i< paths.length; i++) {
        for(let j = 0; j < updatePhermoneAmount.length; j++) {
            if(paths[i].id == updatePhermoneAmount[j].id) {
                let oldPhermone = paths[i].phermone;
                paths[i].phermone = ((1- rhoRange.value) * oldPhermone) + updatePhermoneAmount[j].updateAmount;
            }
        }
    }
}

let bestRoute = [];

function chooseWay(iteration, ant) {
    let cityAmount = cities.length;
    let randomStartCity = Math.floor(Math.random() * cityAmount);

    let startCity = cities[randomStartCity];
    startCity.visited = true;

    let currentCity = startCity;

    let roadOrder = [];
    let cost = 0;
    let currentRoute = [];

    for (let k = 0; k < cities.length; k++) {
        let startIndex = 0;
        let endIndex = 0;
        let rateIndex = [];

        for(let i = 0; i < paths.length; i++) {
            if (paths[i].id.startsWith(currentCity.name) && paths[i].endCity.visited == false) {
                calculateProbability(paths[i].startCity, paths[i].endCity);

                endIndex += paths[i].probability;

                rateIndex.push({
                    id: paths[i].id,
                    startIndex: startIndex,
                    endIndex:endIndex,
                    probability: paths[i].probability
                });

                startIndex = endIndex;
            }
        }

        let randomNextCity = Math.random();

        for(let i = 0; i < rateIndex.length; i++) {
            if(rateIndex[i].startIndex <= randomNextCity && rateIndex[i].endIndex > randomNextCity) {
                for (let j = 0; j < paths.length; j++) {
                    if(paths[j].id == rateIndex[i].id) {
                        currentCity = paths[j].endCity;
                        currentCity.visited = true;
                        roadOrder.push(paths[j].id);
                        currentRoute.push(paths[j]);
                        cost += paths[j].distance;
                        break;
                    }
                }
            }
        }
    }

    for (let j = 0; j < paths.length; j++) {
        if(paths[j].id == currentCity.name + startCity.name) {
            currentCity = paths[j].endCity;
            currentCity.visited = true;
            roadOrder.push(paths[j].id);
            currentRoute.push(paths[j]);

            cost += paths[j].distance;
            break;
        }
    }

    currentRoute.push(cost);
    data.push(cost);
    drawLineChart();
    addAntRouteTable(iteration, ant, currentRoute);

    for(let i = 0; i < cities.length; i++) {
        cities[i].visited = false;
    }

    if(bestRoute.length == 0) {
        for(let i = 0; i < currentRoute.length; i++) {
            bestRoute.push(currentRoute[i]);
        }
    } else if ( currentRoute[currentRoute.length -1] < bestRoute[bestRoute.length -1] ) {
        bestRoute = [];
        for (let i = 0; i < currentRoute.length; i++) {
            bestRoute.push(currentRoute[i]);
        }
    }

    let text = "";
    for(let i = 0; i < bestRoute.length - 1; i++) {
        text += bestRoute[i].startCity.name + " ";
    }

    bestRouteHTML.innerHTML = text;
    bestCostHTML.innerHTML = bestRoute[bestRoute.length -1].toFixed(2);

    drawBestPath(bestRoute);
    drawCities();

    willUpdatePhermoneAmount(roadOrder, cost);
}

createBtn.addEventListener("click", () => {
    context.clearRect(0,0, canvasWidth, canvasHeight);
    drawCities();
    addPathInfo();
    addUpdatePhermoneAmountInfo();
    addDistanceTable();

    settingWrapper.classList.remove("visible");
    resultWrapper.classList.add("visible");

    let iteration = 1;
    let ant = 1;

    const iterateAnts = () => {
        if (ant <= antRange.value) {
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            drawPath();
            chooseWay(iteration, ant);

            count = Math.floor((100 * ((iteration - 1) * antRange.value + ant)) / (iterationRange.value * antRange.value));
            progressNumber.innerHTML = `${count}%`;
            progress.style.width = `${count}%`;

            ant++;

            setTimeout(iterateAnts, (200-speedRange.value)/5);
        } else {
            ant = 1;
            iteration++;
            updatePhermone();

            if(iteration <= iterationRange.value) {
                iterateIteration();
            }
        }
    };

    const iterateIteration = () => {
        if(iteration <= iterationRange.value) {
            let phermoneValues = paths.map((path) => {
                return path.phermone;
            });

            let maxPhermone = Math.max(...phermoneValues);

            let minPhermone = Math.min(...phermoneValues);

            addPhermoneTable(iteration, maxPhermone, minPhermone);
            iterateAnts();
        }
    };
    iterateIteration();
});