const canvas  = document.querySelector('canvas');
let input = document.querySelector('input')
const ctx = canvas.getContext('2d')

const resolution = 10;
canvas.width = 500;
canvas.height =500;


const COLS = canvas.width / resolution;
let ROWS =  canvas.height  / resolution;
 
var OnOff = false


function buildGrid() {
    return new Array(COLS).fill(null)
    .map(()=> new Array(ROWS).fill(null)
    .map(()=>Math.floor(Math.random() * 2)))
}

function buildGridEmpty() {
    return new Array(COLS).fill(null)
    .map(()=> new Array(ROWS).fill(null))   
}    

let grid = buildGrid()
let gridEmpty = buildGridEmpty()

window.onload  = render(buildGridEmpty())

function reset() {
  return  document.location.reload(true) 
}
function start() {   
    if(OnOff == false) {
        update()   
        OnOff = true        
    }
}

function update() {
    grid = nextGen(grid)
    render(grid)
    requestAnimationFrame(update)
    OnOff = true   
  
}

//proxima Geração
function nextGen(grid) {
     const nextGen = grid.map( arr => [...arr]);
     for(let col = 0;col < grid.length; col++ ) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row]
            let  numNeighbours = 0
            for(let i = -1;  i < 2;  i++) {
                for(let j = -1; j< 2;  j++) {
                    if(i === 0 && j ===0) {
                        continue
                    }
                    const x_cell = col +i
                    const y_cell = row +j

                    if (x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS ) {
                        const currentNeighbour = grid[col + i][row + j]
                        numNeighbours += currentNeighbour
                    }
                }
            }
            //regras
            //Qualquer célula viva com menos de dois vizinhos vivos morre de solidão.
           // Qualquer célula viva com mais de três vizinhos vivos morre de superpopulação.
           //Qualquer célula morta com exatamente três vizinhos vivos se torna uma célula viva.
           //Qualquer célula viva com dois ou três vizinhos vivos continua no mesmo estado para a próxima geração.
            if(cell == 1 && numNeighbours <2) {
                nextGen[col][row] = 0                
            }else if (cell === 1 && numNeighbours > 3) {
                nextGen[col][row] = 0
            } else if (cell === 0 && numNeighbours === 3){
                nextGen[col][row] = 1
            }
        }
    }
    return nextGen
}
//Desenhando a tabela
function render(grid) {
    for(let col = 0;col < grid.length; col++ ) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row]

            var grd = ctx.createLinearGradient(0, 0,255, 0);
                grd.addColorStop(0, "#006B32");
                grd.addColorStop(1, "black");

            ctx.beginPath();
            ctx.rect(col * resolution, row  *  resolution,  resolution, resolution)
            ctx.fillStyle =  cell ? grd : 'white'
            ctx.fill()
            ctx.stroke()
        }
    }
}


