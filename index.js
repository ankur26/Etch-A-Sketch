const container = document.getElementById('container');
const clearButton = document.getElementById('clear');
let idcounter = 1;

// console.log(container);
// console.log(container.style)
container.style.width = `${30 * 16}px`;
container.style.height = `${30 * 16}px`;
clearButton.addEventListener('click',clear);

function color() {
	// console.log(this.getAttribute("id"));
	this.style.backgroundColor = 'black';
}

function getDiv(id) {
	const childDiv = document.createElement('div');
	childDiv.setAttribute('id', `${id}`);
	childDiv.style.display = 'inline-block';
	childDiv.style.width = '30px';
	childDiv.style.height = '30px';
	childDiv.style.border = '1px solid black';
	childDiv.style.boxSizing = 'border-box';
    childDiv.addEventListener('mouseover', color);
    return childDiv
    
}

function clear(){
    for(let i = 0; i< container.children.length;i++){
        container.children[i].style.backgroundColor = "white";
    }
}

// Add the childboxes to the base div
for (let i = 1; i < 17; i++) {
	for (let j = 1; j < 17; j++) {
		// childDiv.style.border = "1px solid black";
        container.appendChild(getDiv(idcounter));
		idcounter += 1;
	}
}
