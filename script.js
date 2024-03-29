//your JS code here. If required.
function createPromise() {
  return new Promise((resolve, rewject) => {
    let time = Math.floor(Math.random() * (3000 - 1000) + 1000);
    setTimeout(() => {
      resolve(time);
    }, time);
  });
}

let promises = [createPromise(), createPromise(), createPromise()];

let tbody = document.querySelector("#output");

let row = document.createElement("tr");
row.id = "loading";
let newCells = document.createElement('td')
newCells.colSpan = 2;
newCells.innerText = 'Loading...';

row.appendChild(newCells);

tbody.appendChild(row);
Promise.all(promises).then((result) => {
  document.querySelector('#loading').remove();
  let totalTime = result.reduce((a,b)=>a + b,0)
  result.forEach((elem,i)=>{
    let row = document.createElement("tr")
    let cell1 = document.createElement('td');
    cell1.innerText = `Promise ${i + 1}`;
    let cell2 = document.createElement('td');
    cell2.innerText = `${(elem / 1000).toFixed(3)}`;
    row.appendChild(cell1);
    row.appendChild(cell2);
    tbody.appendChild(row);
  })
  let row = document.createElement("tr")
  let cell1 = document.createElement('td');
  cell1.innerHTML = 'Total'
  let cell2 = document.createElement('td');
  cell2.innerText = `${(totalTime/1000).toFixed(3)}`;
  
  row.appendChild(cell1);
  row.appendChild(cell2);
  tbody.appendChild(row);
  console.log(totalTime);
})