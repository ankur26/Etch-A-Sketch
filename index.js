const container = document.getElementById('container');
const clearButton = document.getElementById('clear');
const range = document.getElementById('myRange');
const gridSize = document.getElementById('gridSize');
const gridToggle = document.getElementById('gridToggle');
let gridValue = 16;
let idcounter = 1;
let totalarea = 262144;
let gridLine = 1;


// console.log(container);
// console.log(container.style)
container.style.width = `${32 * 16}px`;
container.style.height = `${32 * 16}px`;

function resetGrid(size){
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
	this.style.backgroundColor = 'black';
}

function getDiv(id,wh) {
	const childDiv = document.createElement('div');
	childDiv.setAttribute('id', `${id}`);
	childDiv.style.display = 'inline-block';
	childDiv.style.width = `${wh}px`;
	childDiv.style.height = `${wh}px`;
	childDiv.style.border = gridLine ? '1px solid black' : '';
	childDiv.style.boxSizing = 'border-box';
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
    resetGrid(parseInt(e.target.value));
});

gridToggle.addEventListener('click',toggleGrid);
clearButton.addEventListener('click',clear);


resetGrid(gridValue);
