import { TPoint } from '../../gameLib/Game';
import Graphics from '../../gameLib/Graphics';
import Scene from '../../gameLib/Scene';
import Ship from './Ship';

type TCellBody = {
  x0: number;
  y0:number;
  x1:number;
  y1:number;
}

type TCell = {
  id: string;
  isFree: true;
  isLive: true;
  graphics: Graphics;
  pos: TCellBody;
}

export default class PlayerField{
  scene: Scene;
  fieldMatrix: TCell[][] = [];
  readonly lineWidth = 2;
  step: number;

  constructor(scene: Scene){
    this.scene = scene;
    const min = Math.min(this.scene.width, this.scene.height);
    this.step = (min-this.lineWidth)/11;

    this.create();
  }

  create(){
    const graphics = this.scene.add.graphics();
    //const lineWidth = 2;
    graphics.lineWidth(this.lineWidth);
    graphics.strokeStyle('#3bb4ff');
    //graphics.fillStyle('white');
    
    let posX = this.lineWidth/2;
    let posY = this.lineWidth/2;
    const arrCols = ['A','B','C','D','E','F','G','H','I','J','K'];
    const arrRows = [1,2,3,4,5,6,7,8,9,10];
    
    for (let i = 0; i < 11; i++) {
      let rows: TCell[] = [];
      for (let j = 0; j < 11; j++) { 
        if(j>0&& i>0){
          const cellGraph = this.scene.add.graphics();
          cellGraph.fillStyle('white');
          const cell:TCell = {
            id: arrCols[i-1]+'-'+arrRows[j-1],
            isFree: true,
            isLive: true,
            graphics: cellGraph,
            pos: {
              x0: posX-this.step,
              y0: posY-this.step,
              x1: posX+this.step,
              y1: posY+this.step,
            }
          }
          rows.push(cell);
          cellGraph.fillRect(posX, posY, this.step-this.lineWidth, this.step-this.lineWidth);
        }
        graphics.strokeRect(posX, posY, this.step, this.step);
        posX+=this.step;
        
      }
      if(i>0){
        this.fieldMatrix.push(rows);
      }
      posX = this.lineWidth/2;
      posY+= this.step;
    }
    console.log('fieldMatrix = ', this.fieldMatrix);
  }



  colligionShip(ship: Ship){
    console.log(ship.mainContainer.interactiveRect);
    const shipBody = ship.mainContainer.interactiveRect;
    for (let i = 0; i < this.fieldMatrix.length; i++) {

      const rows = this.fieldMatrix[i];
      for (let j = 0; j < rows.length; j++) {
        const cell = rows[j];
        cell.graphics.fillStyle('white');

      }
    }
    let startCell = {
      i:-1,
      j:-1,
      typeShip: ship.type,
      angle: ship.angle
    };
    for (let i = 0; i < this.fieldMatrix.length; i++) {

      const rows = this.fieldMatrix[i];
      for (let j = 0; j < rows.length; j++) {
        const cell = rows[j];
        const shipPosStart = {
          ...shipBody,
          x: shipBody.x-this.step*(ship.type-2)
        }
        if((shipPosStart.x>=cell.pos.x0&&shipPosStart.x<=cell.pos.x1)
          &&(shipPosStart.y>=cell.pos.y0&&shipPosStart.y<=cell.pos.y1)){
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
      if(startCell.i>=0){
        break;
      }
    }

    let x = startCell.j;
    let y = startCell.i;
    let isGreen = true;
    const shipCells = [];
    const supCells = [];
    
    for (let i = 0; i < startCell.typeShip; i++) {
      if((x>=0&&x<=9)&&(y>=0&&y<=9)){
        if(startCell.angle===0){
          const cell = this.fieldMatrix[y][x];
          if(y-1>=0){
            const cell2 = this.fieldMatrix[y-1][x];
            supCells.push(cell2);
          }
          if(y+1<=9){
            const cell2 = this.fieldMatrix[y+1][x];
            supCells.push(cell2);
            //supCells.push(this.fieldMatrix[y+1][x]);
          }
          if(!cell.isFree){
            isGreen = false;
          }
          shipCells.push(cell);
          x++;
        }
      }else{
        isGreen = false;
        break;
      }
      
    }

    if(startCell.j>=0){
      if(startCell.angle===0){
        const x1 = startCell.j-1;
        if(x1>=0){
          supCells.push(this.fieldMatrix[y][x1]);
          if(y-1>=0){
            supCells.push(this.fieldMatrix[y-1][x1]);
          }
          if(y+1<=9){
            supCells.push(this.fieldMatrix[y+1][x1]);
          }
        }
        const x2 = startCell.j+ship.type;
        if(x2<=9){
          supCells.push(this.fieldMatrix[y][x2]);
          if(y-1>=0){
            supCells.push(this.fieldMatrix[y-1][x2]);
          }
          if(y+1<=9){
            supCells.push(this.fieldMatrix[y+1][x2]);
          }
        }
      }
    }
    

    shipCells.forEach(cell=>{
      if(isGreen){
        cell.graphics.fillStyle('green');
      }else{
        cell.graphics.fillStyle('red');
      }
    });

    supCells.forEach(cell=>{
      if(isGreen){
        cell.graphics.fillStyle('#a7ffb5');
      }else{
        cell.graphics.fillStyle('#ffa7a8');
      }
    });

  }
}