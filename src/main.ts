import "./style.css";


//setting up the multiple canvases
const gridCanvas = document.getElementById("gridCanvas") as HTMLCanvasElement;
const gridCtx = gridCanvas.getContext("2d") as CanvasRenderingContext2D;

const selectCanvas = document.getElementById("selectCanvas") as HTMLCanvasElement;
const selectCtx = selectCanvas.getContext("2d") as CanvasRenderingContext2D;

//defining the textures to use
const imageUrls = [
    "/tile1.png",
    "/tile2.png",
    "/tile3.png",
    "/tile4.png",
    "/tile5.png",
    "/tile6.png",
    "/tile7.png",
    "/tile8.png"
];

//defining the size of the main grid
const numTiles = 32;
const tileSize = gridCanvas.width / numTiles;

//defining the size of the select grid
const numSelectables = imageUrls.length;
const selectHeight = selectCanvas.height / numSelectables;

let tilemap = new Array(numTiles);

for(let i = 0; i < numTiles; i++) {
    let row = new Array(numTiles);
    for (let j = 0; j < numTiles; j++) { row[j] = "/tile1.png"; }
    tilemap[i] = row;
}

//track the selected tile
let currentTile = "/tile1.png";

//draw the initial canvases
redrawTilemap();
drawSelectCanvas();

//Function that draws a texture to a specific canvas ctx
function drawTexture(row: number, col: number, ctx: CanvasRenderingContext2D, imageUrl: string, width: number, height: number, cellSize: number) {
    const image = new Image();
    image.src = imageUrl
    image.onload = () => {ctx.drawImage(image, row * cellSize, col * cellSize, width, height)};
}

// Draw main tile map
function redrawTilemap()
{
  gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
    for (let i = 0; i < numTiles; i++) {
        for (let j = 0; j < numTiles; j++) {
            drawTexture(i, j, gridCtx, tilemap[i][j], gridCanvas.width / numTiles, gridCanvas.height / numTiles, tileSize);
        }
    }
}

function drawSelectCanvas()
{
    for (let i = 0; i < numTiles; i++) {
        drawTexture(0, i, selectCtx, imageUrls[i], selectCanvas.width, selectHeight, 64);
    }
}

// Interact with canvas
gridCanvas.addEventListener("click", (e) => {
    const coordX = Math.trunc(e.offsetX / tileSize);
    const coordY = Math.trunc(e.offsetY / tileSize);

    tilemap[coordX][coordY].src = currentTile;
    redrawTilemap();
})

// Select from tilemap
selectCanvas.addEventListener("click", (e) => {
    const coordY = Math.trunc(e.offsetY / selectHeight);
    currentTile = imageUrls[coordY];
})