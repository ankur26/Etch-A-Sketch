const container = document.getElementById('container');
const clearButton = document.getElementById('clear');
const range = document.getElementById('myRange');
const gridSize = document.getElementById('gridSize');
const gridToggle = document.getElementById('gridToggle');
const random = document.getElementById('random');
const pencil = document.getElementById('pencil');
const defaultSetting = document.getElementById('default');
const eraser = document.getElementById('eraser');
const header = document.getElementById('header');

let gridValue = 16;
let idcounter = 1;
let totalarea = 262144;
let gridLine = 1;
let effect = "default";


// console.log(container);
// console.log(container.style)
container.style.width = `${32 * 16}px`;
container.style.height = `${32 * 16}px`;

function colorValues(color)
{
    if (color === '')
        return;
    if (color.toLowerCase() === 'transparent')
        return [0, 0, 0, 0];
    if (color[0] === '#')
    {
        if (color.length < 7)
        {
            // convert #RGB and #RGBA to #RRGGBB and #RRGGBBAA
            color = '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3] + (color.length > 4 ? color[4] + color[4] : '');
        }
        return [parseInt(color.substr(1, 2), 16),
            parseInt(color.substr(3, 2), 16),
            parseInt(color.substr(5, 2), 16),
            color.length > 7 ? parseInt(color.substr(7, 2), 16)/255 : 1];
    }
    if (color.indexOf('rgb') === -1)
    {
        // convert named colors
        var temp_elem = document.body.appendChild(document.createElement('fictum')); // intentionally use unknown tag to lower chances of css rule override with !important
        var flag = 'rgb(1, 2, 3)'; // this flag tested on chrome 59, ff 53, ie9, ie10, ie11, edge 14
        temp_elem.style.color = flag;
        if (temp_elem.style.color !== flag)
            return; // color set failed - some monstrous css rule is probably taking over the color of our object
        temp_elem.style.color = color;
        if (temp_elem.style.color === flag || temp_elem.style.color === '')
            return; // color parse failed
        color = getComputedStyle(temp_elem).color;
        document.body.removeChild(temp_elem);
    }
    if (color.indexOf('rgb') === 0)
    {
        if (color.indexOf('rgba') === -1)
            color += ',1'; // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below
        return color.match(/[\.\d]+/g).map(function (a)
        {
            return +a
        });
    }
}

function randomValue(min,max){
    return Math.floor(Math.random()*max + min);
}

function randomColorGenerator(){
    return `rgb(${randomValue(0,255)},${randomValue(0,255)},${randomValue(0,255)})`
}
function updateHeaderLine (){
    switch(effect){
        case "default":
            header.style.color = "black";
            header.style.backgroundColor = "white";
            header.textContent = "Etch-A-Sketch Black and White mode";
            break;
        case "color":
            header.style.color = `linear-gradient(to right, ${randomColorGenerator()} 0%,${randomColorGenerator()} 100%);`;
            header.textContent = "Etch-A-Sketch Random Color mode";
            break;
        case "pencil":
            header.style.background = "linear-gradient(to left, #000000 0%, #FFFFFF 50%, #000000 100%);";
            header.textContent = "Etch-A-Sketch Pencil mode";
            break;
        case "eraser":
            header.style.background = "white";
            header.style.color = "black";
            header.textContent = "Etch-A-Sketch Eraser Mode";
            break;
            
    }
    
}
function resetGrid(size){
    updateHeaderLine();
    container.innerHTML = ''
    let wh = Math.pow(totalarea / Math.pow(size,2),0.5);
    idcounter = 1;
    for (let i = 1; i < size+1; i++) {
        for (let j = 1; j < size+1; j++) {
            // childDiv.style.border = "1px solid black";
            container.appendChild(getDiv(idcounter,wh));
            idcounter += 1;
        }
    }
    gridSize.textContent = `Current grid size is ${size} x ${size}`
    
}

function color() {
	// console.log(this.getAttribute("id"));
	switch(effect){
        case "default":
            this.style.backgroundColor = "black";
            break;
        case "color":
            this.style.backgroundColor = randomColorGenerator();
            break;
        case "pencil":
            switch(this.style.backgroundColor){
                case "white":
                    this.style.backgroundColor = "#F8F8F8";
                    break;
                default:
                    let currentGrayScaleLevel = colorValues(this.style.backgroundColor)[0];
                    currentGrayScaleLevel-= currentGrayScaleLevel === 7 ? 7 : 64;
                    this.style.backgroundColor = `rgb(${currentGrayScaleLevel},${currentGrayScaleLevel},${currentGrayScaleLevel})`;
            }
            break;

        case "eraser":
            this.style.backgroundColor = "white";
            break;
    }
}

function getDiv(id,wh) {
	const childDiv = document.createElement('div');
	childDiv.setAttribute('id', `${id}`);
	childDiv.style.display = 'inline-block';
	childDiv.style.width = `${wh}px`;
	childDiv.style.height = `${wh}px`;
	childDiv.style.border = gridLine ? '1px solid black' : '';
	childDiv.style.boxSizing = 'border-box';
    childDiv.style.backgroundColor = 'white';
    childDiv.addEventListener('mouseover', color);
    return childDiv
    
}

function clear(){
    for(let i = 0; i< container.children.length;i++){
        container.children[i].style.backgroundColor = "white";
    }
}
function toggleGrid(){
    gridLine = !gridLine;
    for(let i = 0; i< container.children.length;i++){
        container.children[i].style.border= gridLine? '1px solid black' : '';
    }
}


range.addEventListener('input',(e)=>{
    gridValue = parseInt(e.target.value);
    resetGrid(gridValue);
});

gridToggle.addEventListener('click',toggleGrid);
clearButton.addEventListener('click',clear);
random.addEventListener('click',()=>{effect = 'color';resetGrid(gridValue)});
defaultSetting.addEventListener('click',()=>{effect = 'default';resetGrid(gridValue)});
pencil.addEventListener('click',()=>{effect = 'pencil',resetGrid(gridValue)});
eraser.addEventListener('click',()=>{effect = 'eraser';updateHeaderLine()});



resetGrid(gridValue);
