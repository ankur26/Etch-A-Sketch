const container = document.getElementById("container");

// console.log(container);
// console.log(container.style)
container.style.width = `${30*16}px`;
container.style.height = `${30*16}px`;


for (let i = 1;i<17;i++){
    for(let j=1;j<17;j++){
        const childDiv = document.createElement('div');
        childDiv.style.display = "inline-block";
        childDiv.style.width = "30px";
        childDiv.style.height = "30px";
        childDiv.style.border = "1px solid black";
        childDiv.style.boxSizing = "border-box";
        // childDiv.style.border = "1px solid black";
        container.appendChild(childDiv);
    }
}