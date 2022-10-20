import { TPoint } from '../../gameLib/Game';
import Graphics from '../../gameLib/Graphics';
import Scene from '../../gameLib/Scene';
import Ship, { TShips } from './Ship';

type TCellBody = {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

type TCellShip = {
  id: string;
  isMain: boolean;
}

type TCell = {
  id: string;
  isFree: boolean;
  isLive: boolean;
  ship: TCellShip|null;
  graphics: Graphics;
  pos: TCellBody;
}

export type TStartCell = {
  i: number;
  j: number;
  typeShip: TShips;
  angle: number;
}

export default class PlayerField {
  scene: Scene;
  fieldMatrix: TCell[][] = [];
  readonly lineWidth = 2;
  step: number;
  shipPos: TPoint = { x: 0, y: 0 };
  isGreen = false;
  x: number;
  y: number;
  width = 0;
  height = 0;
  ships: Ship[] = [];
  shipCells: TCell[] = [];
  supCells: TCell[] = [];
  

  constructor(scene: Scene, x: number, y: number) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    const min = Math.min(this.scene.width, this.scene.height);
    this.step = (min - this.lineWidth) / 11;

    this.create();
  }

  create() {
    const graphics = this.scene.add.graphics();
    //const lineWidth = 2;
    graphics.lineWidth(this.lineWidth);
    graphics.strokeStyle('#3bb4ff');
    //graphics.fillStyle('white');
    const startX = this.x + this.lineWidth / 2;
    const startY = this.y + this.lineWidth / 2;
    let posX = startX;
    let posY = startY;
    const arrCols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
    const arrRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    for (let i = 0; i < 11; i++) {
      let rows: TCell[] = [];
      for (let j = 0; j < 11; j++) {
        if (j > 0 && i > 0) {
          const cellGraph = this.scene.add.graphics();
          cellGraph.fillStyle('white');
          const cell: TCell = {
            id: arrCols[i - 1] + '-' + arrRows[j - 1],
            isFree: true,
            isLive: true,
            ship:null,
            graphics: cellGraph,
            pos: {
              x0: posX,
              y0: posY,
              x1: posX + this.step,
              y1: posY + this.step,
            }
          }
          rows.push(cell);
          cellGraph.fillRect(posX, posY, this.step - this.lineWidth, this.step - this.lineWidth);
        }
        graphics.strokeRect(posX, posY, this.step, this.step);
        posX += this.step;

      }
      if (i > 0) {
        this.fieldMatrix.push(rows);
      }
      posX = startX;
      posY += this.step;
    }
    // const dot = this.scene.add.graphics();
    // dot.fillStyle('black');
    // dot.fillRect(this.fieldMatrix[0][0].pos.x0-6/2,this.fieldMatrix[0][0].pos.y0-6/2, 6, 6);
    this.width = this.fieldMatrix[0][this.fieldMatrix[0].length - 1].pos.x1;
    this.height = this.fieldMatrix[this.fieldMatrix.length - 1][0].pos.y1;
    console.log('fieldMatrix = ', this.fieldMatrix);
  }

  clearField(){
    for (let i = 0; i < this.fieldMatrix.length; i++) {

      const rows = this.fieldMatrix[i];
      for (let j = 0; j < rows.length; j++) {
        const cell = rows[j];
        if(cell.isFree){
          cell.graphics.fillStyle('white');
        }
      }
    }
  }

  clearFieldByShip(shipId:string){
    for (let i = 0; i < this.fieldMatrix.length; i++) {

      const rows = this.fieldMatrix[i];
      for (let j = 0; j < rows.length; j++) {
        const cell = rows[j];
        if(cell.isFree){
          cell.graphics.fillStyle('white');
        }else{
          if(cell.ship!.id===shipId){
            cell.graphics.fillStyle('white');
            cell.isFree = true;
            cell.ship = null;
          }
        }
      }
    }
  }

  renderMatrix(){
    this.fieldMatrix.forEach(rows=>{
      rows.forEach(cell=>{
        if(!cell.isFree){
          if(cell.ship?.isMain){
            cell.graphics.fillStyle('green');
          }else{
            cell.graphics.fillStyle('#ffa7a8');
          }
        }
      });
    })
  }

  renderShip(){
    this.renderMatrix();

    this.shipCells.forEach(cell => {
      if (this.isGreen) {
        cell.graphics.fillStyle('green');
      } else {
        cell.graphics.fillStyle('red');
      }
    });

    this.supCells.forEach(cell => {
      if (this.isGreen) {
        cell.graphics.fillStyle('#a7ffb5');
        //cell.graphics.fillStyle('green');
      } else {
        cell.graphics.fillStyle('#ffa7a8');
      }
    });

  }

  calcFromStartCell(startCell: TStartCell, ship: Ship) {

    let x = startCell.j;
    let y = startCell.i;
    this.isGreen = true;
    this.shipCells = [];
    this.supCells = [];
    //const shipCells = [];
    //const supCells = [];

    for (let i = 0; i < startCell.typeShip; i++) {
      if ((x >= 0 && x <= 9) && (y >= 0 && y <= 9)) {
        if (startCell.angle === 0) {
          const cell = this.fieldMatrix[y][x];
          if (y - 1 >= 0) {
            const cell2 = this.fieldMatrix[y - 1][x];
            this.supCells.push(cell2);
          }
          if (y + 1 <= 9) {
            const cell2 = this.fieldMatrix[y + 1][x];
            this.supCells.push(cell2);
            //supCells.push(this.fieldMatrix[y+1][x]);
          }
          if (!cell.isFree) {
            this.isGreen = false;
          }
          this.shipCells.push(cell);
          x++;
        } else {
          const cell = this.fieldMatrix[y][x];
          if (x - 1 >= 0) {
            const cell2 = this.fieldMatrix[y][x - 1];
            this.supCells.push(cell2);
          }
          if (x + 1 <= 9) {
            const cell2 = this.fieldMatrix[y][x + 1];
            this.supCells.push(cell2);
            //supCells.push(this.fieldMatrix[y+1][x]);
          }
          if (!cell.isFree) {
            this.isGreen = false;
          }
          this.shipCells.push(cell);
          y++;
        }
      } else {
        this.isGreen = false;
        break;
      }

    }

    if (startCell.j >= 0) {
      if (startCell.angle === 0) {
        const x1 = startCell.j - 1;
        if (x1 >= 0) {
          this.supCells.push(this.fieldMatrix[y][x1]);
          if (y - 1 >= 0) {
            this.supCells.push(this.fieldMatrix[y - 1][x1]);
          }
          if (y + 1 <= 9) {
            this.supCells.push(this.fieldMatrix[y + 1][x1]);
          }
        }
        const x2 = startCell.j + ship.type;
        if (x2 <= 9) {
          this.supCells.push(this.fieldMatrix[y][x2]);
          if (y - 1 >= 0) {
            this.supCells.push(this.fieldMatrix[y - 1][x2]);
          }
          if (y + 1 <= 9) {
            this.supCells.push(this.fieldMatrix[y + 1][x2]);
          }
        }
      } else {
        const y1 = startCell.i - 1;
        if (y1 >= 0) {
          this.supCells.push(this.fieldMatrix[y1][x]);
          if (x - 1 >= 0) {
            this.supCells.push(this.fieldMatrix[y1][x - 1]);
          }
          if (x + 1 <= 9) {
            this.supCells.push(this.fieldMatrix[y1][x + 1]);
          }
        }
        const y2 = startCell.i + ship.type;
        if (y2 <= 9) {
          this.supCells.push(this.fieldMatrix[y2][x]);
          if (x - 1 >= 0) {
            this.supCells.push(this.fieldMatrix[y2][x - 1]);
          }
          if (x + 1 <= 9) {
            this.supCells.push(this.fieldMatrix[y2][x + 1]);
          }
        }
      }
    }

    // this.shipCells.forEach(cell => {
    //   if (this.isGreen) {
    //     cell.graphics.fillStyle('green');
    //   } else {
    //     cell.graphics.fillStyle('red');
    //   }
    // });

    // this.supCells.forEach(cell => {
    //   if (this.isGreen) {
    //     cell.graphics.fillStyle('#a7ffb5');
    //     //cell.graphics.fillStyle('green');
    //   } else {
    //     cell.graphics.fillStyle('#ffa7a8');
    //   }
    // });

    if (startCell.i === -1) {
      this.isGreen = false;
    }

    if (this.isGreen) {
      console.log('isGreen!!!!');
      const cell = this.fieldMatrix[startCell.i][startCell.j];
      if (ship.angle === 0) {
        this.shipPos = {
          x: cell.pos.x0 + ship.bodySprite!.width / 2,
          y: cell.pos.y0 + this.step / 2
        }
      } else {
        this.shipPos = {
          x: cell.pos.x0 + this.step / 2,
          y: cell.pos.y0 + ship.bodySprite!.width / 2,
        }
      }
      ship.setCellOnField({i:startCell.i,j:startCell.j});
    }
    return this.isGreen;
  }

  getShip(ship:Ship){
    this.clearFieldByShip(ship.id);
  }

  colligionShip(ship: Ship) {
    //console.log(ship.mainContainer.interactiveRect);
    const shipBody = {
      x: ship.x,
      y: ship.y
    };

    let startCell = {
      i: -1,
      j: -1,
      typeShip: ship.type,
      angle: ship.angle
    };

    this.clearField();

    for (let i = 0; i < this.fieldMatrix.length; i++) {

      const rows = this.fieldMatrix[i];
      for (let j = 0; j < rows.length; j++) {
        const cell = rows[j];
        const shipPosStart = {
          ...shipBody,
          x: shipBody.x - this.step / 2 * (ship.type - 1)
        }
        if (startCell.angle === 90) {
          shipPosStart.x = shipBody.x;
          shipPosStart.y = shipBody.y - this.step / 2 * (ship.type - 1)
        }
        if ((shipPosStart.x >= cell.pos.x0 && shipPosStart.x <= cell.pos.x1)
          && (shipPosStart.y >= cell.pos.y0 && shipPosStart.y <= cell.pos.y1)) {
          //console.log('colligion!!!!!!!!!!!!!!!!!');
          startCell = {
            ...startCell,
            i,
            j
          }
          //cell.graphics.fillStyle('green');
          //return;
          break;
        }
      }
      if (startCell.i >= 0) {
        break;
      }
    }
    //this.dropShip(ship);
    this.calcFromStartCell(startCell, ship);
    this.renderShip();
  }

  rotateShip(ship: Ship){
    let angle = 0;
    if(ship.angle===0){
      angle = 90
    }
    const isCanRotate = this.calcFromStartCell({...ship.cellOnField,typeShip:ship.type,angle}, ship);
    if(isCanRotate){
      ship.angle = angle;
      this.renderShip();
    }
    this.dropShip(ship);
    //this.calcFromStartCell({...ship.cellOnField,typeShip:ship.type,angle:ship.angle}, ship);
  }

  dropShip(ship: Ship) {
    if(!this.isOnField(ship)){
      ship.dropShip();
      return;
    }
    this.calcFromStartCell({...ship.cellOnField,typeShip:ship.type,angle:ship.angle},ship);
    if (this.isGreen) {
      ship.setOnPlayerField(this.shipPos);
      const isShip = this.ships.find(s => s.id === ship.id);
      if (!isShip) {
        this.ships.push(ship);
      }

      this.shipCells.forEach(cell=>{
        cell.isFree = false;
        cell.ship = {
          id: ship.id,
          isMain: true
        }
      });

      this.supCells.forEach(cell=>{
        cell.isFree = false;
        cell.ship = {
          id: ship.id,
          isMain: false
        }
      });
      this.renderMatrix();
    } else {
      ship.dropShip();
    }
  }

  isHasShip(ship: Ship) {
    if (this.ships.find(s => s.id === ship.id)) {
      return true;
    }
    return false;
  }

  removeShip(ship: Ship) {
    this.ships = this.ships.filter(s => s.id !== ship.id);
    this.fieldMatrix.forEach(rows=>{
      rows.forEach(cell=>{
        if(!cell.isFree){
          if(cell.ship?.id===ship.id){
            cell.isFree = true;
            cell.ship = null;
            cell.graphics.fillStyle('white');
          }
        }
      });
    });
    this.clearField();
  }

  renderShipCells(ship: Ship) {
    this.ships.forEach(ship => this.colligionShip(ship));
    //this.colligionShip(ship);
  }

  isOnField(ship: Ship) {
    let shipPosStart = {
      y: ship.y,
      x: ship.x - this.step / 2 * (ship.type - 1)
    }
    if ((shipPosStart.x >= this.x && shipPosStart.x <= this.width) && (shipPosStart.y >= this.y && shipPosStart.y <= this.height)) {
      return true;
    } else {
      return false;
    }

  }
}