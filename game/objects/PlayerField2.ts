// import { TPoint } from '../../gameLib/Game';
// import Graphics from '../../gameLib/Graphics';
// import Scene from '../../gameLib/Scene';
// import Ship, { TShips } from './Ship';

// type TCellBody = {
//   x0: number;
//   y0: number;
//   x1: number;
//   y1: number;
// }

// type TCellShip = {
//   id: string;
//   isMain: boolean;
// }

// type TCell = {
//   id: string;
//   isFree: boolean;
//   isLive: boolean;
//   ship: TCellShip | null;
//   graphics: Graphics;
//   pos: TCellBody;
// }

// export type TStartCell = {
//   col: string;
//   row: number;
//   typeShip: TShips;
//   angle: number;
// }

export default class PlayerField2{
  
}

// export default class PlayerField2 {
//   scene: Scene;
//   //fieldMatrix: TCell[][] = [];
//   cells: TCell[] = [];
//   readonly arrCols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
//   readonly arrRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//   readonly lineWidth = 2;
//   step: number;
//   shipPos: TPoint = { x: 0, y: 0 };
//   isGreen = false;
//   x: number;
//   y: number;
//   width = 0;
//   height = 0;
//   ships: Ship[] = [];
//   shipCells: TCell[] = [];
//   supCells: TCell[] = [];


//   constructor(scene: Scene, x: number, y: number) {
//     this.scene = scene;
//     this.x = x;
//     this.y = y;
//     const min = Math.min(this.scene.width, this.scene.height);
//     this.step = (min - this.lineWidth) / 11;

//     this.create();
//   }

//   create() {
//     const graphics = this.scene.add.graphics();
//     //const lineWidth = 2;
//     graphics.lineWidth(this.lineWidth);
//     graphics.strokeStyle('#3bb4ff');
//     //graphics.fillStyle('white');
//     const startX = this.x + this.lineWidth / 2;
//     const startY = this.y + this.lineWidth / 2;
//     let posX = startX;
//     let posY = startY;
//     //const arrCols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
//     //const arrRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//     for (let i = 0; i < 11; i++) {
//       //let rows: TCell[] = [];
//       for (let j = 0; j < 11; j++) {
//         if (j > 0 && i > 0) {
//           const cellGraph = this.scene.add.graphics();
//           cellGraph.fillStyle('white');
//           const cell: TCell = {
//             id: this.arrCols[i - 1] + '-' + this.arrRows[j - 1],
//             isFree: true,
//             isLive: true,
//             ship: null,
//             graphics: cellGraph,
//             pos: {
//               x0: posX,
//               y0: posY,
//               x1: posX + this.step,
//               y1: posY + this.step,
//             }
//           }
//           this.cells.push(cell);
//           //rows.push(cell);
//           cellGraph.fillRect(posX, posY, this.step - this.lineWidth, this.step - this.lineWidth);
//         }
//         graphics.strokeRect(posX, posY, this.step, this.step);
//         posX += this.step;

//       }
//       if (i > 0) {
//         //this.fieldMatrix.push(rows);
//       }
//       posX = startX;
//       posY += this.step;
//     }
//     // const dot = this.scene.add.graphics();
//     // dot.fillStyle('black');
//     // dot.fillRect(this.fieldMatrix[0][0].pos.x0-6/2,this.fieldMatrix[0][0].pos.y0-6/2, 6, 6);
//     this.width = this.cells[0].pos.x1;
//     this.height = this.cells[this.cells.length - 1].pos.y1;
//     console.log('fieldMatrix = ', this.cells);
//   }

//   findCellById(id:string){
//     return this.cells.find(cell=>cell.id===id)!;
//   }

//   calcFromStartCell(startCell: string, ship: Ship){
//     const startCellColIdx = this.arrCols.findIndex(el=>el===startCell.split('-')[0]);
//     const startCellRowIdx = this.arrRows.findIndex(el=>el===Number(startCell.split('-')[1]));
//     let colIdx = startCellColIdx;
//     let rowIdx = startCellRowIdx;
//     let cell:TCell|null = null;
//     this.isGreen = true;
//     this.shipCells = [];
//     this.supCells = [];
//     for (let i = 0; i < ship.type; i++) {
//       if ((colIdx >= 0 && colIdx < this.arrCols.length) && (rowIdx >= 0 && rowIdx < this.arrRows.length)) {
//         cell = this.findCellById(this.arrCols[colIdx]+'_'+this.arrRows[rowIdx]);
//         if (ship.angle === 0) {
//           if (rowIdx - 1 >= 0) {
//             const cell2 = this.findCellById(this.arrCols[colIdx]+'_'+this.arrRows[rowIdx-1]);
//             this.supCells.push(cell2);
//           }
//           if (rowIdx + 1 < this.arrRows.length) {
//             const cell2 = this.findCellById(this.arrCols[colIdx]+'_'+this.arrRows[rowIdx+1]);
//             this.supCells.push(cell2);
//             //supCells.push(this.fieldMatrix[y+1][x]);
//           }
//           if (!cell.isFree) {
//             this.isGreen = false;
//           }
//           this.shipCells.push(cell);
//           colIdx++;
//         }else{
//           if (colIdx - 1 >= 0) {
//             const cell2 = this.findCellById(this.arrCols[colIdx-1]+'_'+this.arrRows[rowIdx]);
//             this.supCells.push(cell2);
//           }
//           if (colIdx + 1 < this.arrCols.length) {
//             const cell2 = this.findCellById(this.arrCols[colIdx+1]+'_'+this.arrRows[rowIdx]);
//             this.supCells.push(cell2);
//             //supCells.push(this.fieldMatrix[y+1][x]);
//           }
//           if (!cell.isFree) {
//             this.isGreen = false;
//           }
//           this.shipCells.push(cell);
//           rowIdx++;
//         }
//       }else{
//         this.isGreen = false;
//         break;
//       }
//     }

//     if (startCellColIdx >= 0) {
//       if (ship.angle === 0) {
//         const x1 = startCellColIdx - 1;
//         if (x1 >= 0) {
//           this.supCells.push(this.findCellById(this.arrCols[x1]+'-'+this.arrRows[startCellRowIdx]));
//           if (startCellRowIdx - 1 >= 0) {
//             this.supCells.push(this.findCellById(this.arrCols[x1]+'-'+this.arrRows[startCellRowIdx-1]));
//           }
//           if (startCellRowIdx + 1 < this.arrRows.length) {
//             this.supCells.push(this.findCellById(this.arrCols[x1]+'-'+this.arrRows[startCellRowIdx+1]));
//           }
//         }
//         const x2 = startCellColIdx + ship.type;
//         if(x2 <= this.arrCols.length){
//           this.supCells.push(this.findCellById(this.arrCols[x2]+'-'+this.arrRows[startCellRowIdx]));
//           if (startCellRowIdx - 1 >= 0) {
//             this.supCells.push(this.findCellById(this.arrCols[x2]+'-'+this.arrRows[startCellRowIdx-1]));
//           }
//           if (startCellRowIdx + 1 < this.arrRows.length) {
//             this.supCells.push(this.findCellById(this.arrCols[x2]+'-'+this.arrRows[startCellRowIdx+1]));
//           }
//         }
//       }else{
//         const y1 = startCellRowIdx - 1;
//         if (y1 >= 0) {
//           this.supCells.push(this.findCellById(this.arrCols[startCellColIdx]+'-'+this.arrRows[y1]));
//           if (startCellColIdx - 1 >= 0) {
//             this.supCells.push(this.findCellById(this.arrCols[startCellColIdx-1]+'-'+this.arrRows[y1]));
//           }
//           if (startCellColIdx + 1 < this.arrCols.length) {
//             this.supCells.push(this.findCellById(this.arrCols[startCellColIdx+1]+'-'+this.arrRows[y1]));
//           }
//         }
//         const y2 = startCellRowIdx + ship.type;
//         if (y2 <= 9) {
//           this.supCells.push(this.findCellById(this.arrCols[startCellColIdx]+'-'+this.arrRows[y2]));
//           if (startCellColIdx - 1 >= 0) {
//             this.supCells.push(this.findCellById(this.arrCols[startCellColIdx-1]+'-'+this.arrRows[y2]));
//           }
//           if (startCellColIdx + 1 < this.arrCols.length) {
//             this.supCells.push(this.findCellById(this.arrCols[startCellColIdx+1]+'-'+this.arrRows[y2]));
//           }
//         }
//       }
//     }

//     if(cell){
//       if (ship.angle === 0) {
//         this.shipPos = {
//           x: cell.pos.x0 + ship.bodySprite!.width / 2,
//           y: cell.pos.y0 + this.step / 2
//         }
//       } else {
//         this.shipPos = {
//           x: cell.pos.x0 + this.step / 2,
//           y: cell.pos.y0 + ship.bodySprite!.width / 2,
//         }
//       }
//       //ship.setCellOnField({i:startCell.i,j:startCell.j});
//       ship.setCellsOnField([
//         ...this.shipCells.map(cell=>{
//           return{
//             col: cell.id.split('-')[0],
//             row: Number(cell.id.split('-')[1])
//           }
//         }),
//         ...this.supCells.map(cell=>{
//           return{
//             col: cell.id.split('-')[0],
//             row: Number(cell.id.split('-')[1])
//           }
//         })
//       ]);
//     }
    
//   }

//   colligionShip(ship: Ship) {
//     const shipBody = {
//       x: ship.x,
//       y: ship.y
//     };

//     for (let i = 0; i < this.cells.length; i++) {
//       const cell = this.cells[i];
//       const shipPosStart = {
//         ...shipBody,
//         x: shipBody.x - this.step / 2 * (ship.type - 1)
//       }
//       if (ship.angle === 90) {
//         shipPosStart.x = shipBody.x;
//         shipPosStart.y = shipBody.y - this.step / 2 * (ship.type - 1)
//       }
//       if ((shipPosStart.x >= cell.pos.x0 && shipPosStart.x <= cell.pos.x1)
//         && (shipPosStart.y >= cell.pos.y0 && shipPosStart.y <= cell.pos.y1)) {
//         //console.log('colligion!!!!!!!!!!!!!!!!!');
//         this.calcFromStartCell(cell.id, ship);
        
//         //cell.graphics.fillStyle('green');
//         //return;
//         break;
//       }
//     }

//   }

//   isOnField(ship: Ship) {
//     let shipPosStart = {
//       y: ship.y,
//       x: ship.x - this.step / 2 * (ship.type - 1)
//     }
//     if ((shipPosStart.x >= this.x && shipPosStart.x <= this.width) && (shipPosStart.y >= this.y && shipPosStart.y <= this.height)) {
//       return true;
//     } else {
//       return false;
//     }

//   }

// }