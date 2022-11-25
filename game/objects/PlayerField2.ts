import { TPoint } from '../../gameLib/Game';
import Graphics from '../../gameLib/Graphics';
import Scene from '../../gameLib/Scene';
import Ship2, { TShips } from './Ship2';

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
    ship: TCellShip | null;
    graphics: Graphics;
    pos: TCellBody;
}

export type TStartCell = {
    col: string;
    row: number;
    typeShip: TShips;
    angle: number;
}

export default class PlayerField2 {
    scene: Scene;
    //fieldMatrix: TCell[][] = [];
    cells: TCell[] = [];
    readonly arrCols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
    readonly arrRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    readonly lineWidth = 2;
    step: number;
    shipPos: TPoint = { x: 0, y: 0 };
    isGreen = false;
    x: number;
    y: number;
    width = 0;
    height = 0;
    ships: Ship2[] = [];
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
        //const arrCols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
        //const arrRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        for (let i = 0; i < 11; i++) {
            //let rows: TCell[] = [];
            for (let j = 0; j < 11; j++) {
                if (j > 0 && i > 0) {
                    const cellGraph = this.scene.add.graphics();
                    cellGraph.fillStyle('white');
                    const cell: TCell = {
                        id: this.arrCols[i - 1] + '-' + this.arrRows[j - 1],
                        isFree: true,
                        isLive: true,
                        ship: null,
                        graphics: cellGraph,
                        pos: {
                            x0: posX,
                            y0: posY,
                            x1: posX + this.step,
                            y1: posY + this.step,
                        }
                    }
                    this.cells.push(cell);
                    //rows.push(cell);
                    cellGraph.fillRect(posX, posY, this.step - this.lineWidth, this.step - this.lineWidth);
                }
                graphics.strokeRect(posX, posY, this.step, this.step);
                posX += this.step;

            }
            
            posX = startX;
            posY += this.step;
        }
        this.width = Math.max.apply(null, [...this.cells.map(cell=>cell.pos.x1)]);
        this.height = this.cells[this.cells.length - 1].pos.y1;
    }

    findCellById(id: string) {
        //console.log('id = ', id);
        return this.cells.find(cell => cell.id === id)!;
    }

    clearByShip(ship: Ship2) {
        ship.cellsOnField?.main.forEach(cellId => {
            const cell = this.findCellById(cellId.col + '-' + cellId.row);
            if (cell.isFree) {
                cell.graphics.fillStyle('white');
            }else{
                if(cell.ship!.id===ship.id){
                    cell.graphics.fillStyle('white');
                    cell.isFree = true;
                    cell.ship = null;
                }else{
                    if(cell.ship?.isMain){
                        cell.graphics.fillStyle('green');
                    }else{
                        cell.graphics.fillStyle('#a7ffb5');
                    }
                }
            }
        });

        ship.cellsOnField?.sup.forEach(cellId => {
            const cell = this.findCellById(cellId.col + '-' + cellId.row);
            if (cell.isFree) {
                cell.graphics.fillStyle('white');
            }else{
                if(cell.ship!.id===ship.id){
                    cell.graphics.fillStyle('white');
                    cell.isFree = true;
                    cell.ship = null;
                }else{
                    if(cell.ship?.isMain){
                        cell.graphics.fillStyle('green');
                    }else{
                        cell.graphics.fillStyle('#a7ffb5');
                    }
                }
            }
        });
    }

    addShip(ship:Ship2){
        ship.setPosOnField(this.shipPos);
        this.ships.push(ship);
        ship.cellsOnField?.main.forEach(cellId=>{
            const cell = this.findCellById(cellId.col + '-' + cellId.row);
            cell.graphics.fillStyle('green');
            cell.isFree = false;
            cell.ship = {
                id: ship.id,
                isMain: true
            }
        });
        ship.cellsOnField?.sup.forEach(cellId=>{
            const cell = this.findCellById(cellId.col + '-' + cellId.row);
            cell.graphics.fillStyle('#a7ffb5');
            cell.isFree = false;
            cell.ship = {
                id: ship.id,
                isMain: false
            }
        });
    }

    upShip(ship:Ship2){
        this.ships = this.ships.filter(s=>s.id!==ship.id);
        this.clearByShip(ship);
    }

    dropShip(ship:Ship2){
        if(this.isOnField(ship)){
            console.log('this.isGreen = ', this.isGreen);
            if(this.isGreen){
                //this.ships.push(ship);
                //console.log('this.shipPos = ', this.shipPos);
                //ship.setPosOnField(this.shipPos);
                //this.renderShips();
                this.addShip(ship);
            }
            ship.setOnField();
        }else{
            console.log('out of field!!');
            ship.setOnStart();
        }
        //this.clearByShip(ship);
    }

    calcFromStartCell(startCell: string, ship: Ship2) {
        this.clearByShip(ship);
        const startCellColIdx = this.arrCols.findIndex(el => el === startCell.split('-')[0]);
        const startCellRowIdx = this.arrRows.findIndex(el => el === Number(startCell.split('-')[1]));
        let colIdx = startCellColIdx;
        let rowIdx = startCellRowIdx;
        let cell: TCell | null = null;
        this.isGreen = true;
        this.shipCells = [];
        this.supCells = [];
        for (let i = 0; i < ship.type; i++) {
            if ((colIdx >= 0 && colIdx < this.arrCols.length) && (rowIdx >= 0 && rowIdx < this.arrRows.length)) {
                cell = this.findCellById(this.arrCols[colIdx] + '-' + this.arrRows[rowIdx]);
                //console.log('cell = ', this.arrCols[colIdx], '||',this.arrRows[rowIdx]);
                //return;
                if (ship.angle === 90) {
                    if (rowIdx - 1 >= 0) {
                        const cell2 = this.findCellById(this.arrCols[colIdx] + '-' + this.arrRows[rowIdx - 1]);
                        this.supCells.push(cell2);
                    }
                    if (rowIdx + 1 < this.arrRows.length - 1) {
                        const cell2 = this.findCellById(this.arrCols[colIdx] + '-' + this.arrRows[rowIdx + 1]);
                        this.supCells.push(cell2);
                    }
                    if (!cell.isFree) {
                        this.isGreen = false;
                    }
                    this.shipCells.push(cell);
                    colIdx++;
                } else {
                    if (colIdx - 1 >= 0) {
                        const cell2 = this.findCellById(this.arrCols[colIdx - 1] + '-' + this.arrRows[rowIdx]);
                        this.supCells.push(cell2);
                    }
                    if (colIdx + 1 < this.arrCols.length - 1) {
                        const cell2 = this.findCellById(this.arrCols[colIdx + 1] + '-' + this.arrRows[rowIdx]);
                        this.supCells.push(cell2);
                    }
                    if (!cell.isFree) {
                        this.isGreen = false;
                    }
                    this.shipCells.push(cell);
                    rowIdx++;
                }
            } else {
                this.isGreen = false;
                break;
            }
        }

        if (startCellColIdx >= 0) {
            if (ship.angle === 90) {
                const x1 = startCellColIdx - 1;
                if (x1 >= 0) {
                    this.supCells.push(this.findCellById(this.arrCols[x1] + '-' + this.arrRows[startCellRowIdx]));
                    if (startCellRowIdx - 1 >= 0) {
                        this.supCells.push(this.findCellById(this.arrCols[x1] + '-' + this.arrRows[startCellRowIdx - 1]));
                    }
                    if (startCellRowIdx + 1 < this.arrRows.length - 1) {
                        this.supCells.push(this.findCellById(this.arrCols[x1] + '-' + this.arrRows[startCellRowIdx + 1]));
                    }
                }
                const x2 = startCellColIdx + ship.type;
                if (x2 < this.arrCols.length - 1) {
                    this.supCells.push(this.findCellById(this.arrCols[x2] + '-' + this.arrRows[startCellRowIdx]));
                    if (startCellRowIdx - 1 >= 0) {
                        this.supCells.push(this.findCellById(this.arrCols[x2] + '-' + this.arrRows[startCellRowIdx - 1]));
                    }
                    if (startCellRowIdx + 1 < this.arrRows.length - 1) {
                        this.supCells.push(this.findCellById(this.arrCols[x2] + '-' + this.arrRows[startCellRowIdx + 1]));
                    }
                }
            } else {
                const y1 = startCellRowIdx - 1;
                if (y1 >= 0) {
                    this.supCells.push(this.findCellById(this.arrCols[startCellColIdx] + '-' + this.arrRows[y1]));
                    if (startCellColIdx - 1 >= 0) {
                        this.supCells.push(this.findCellById(this.arrCols[startCellColIdx - 1] + '-' + this.arrRows[y1]));
                    }
                    if (startCellColIdx + 1 < this.arrCols.length - 1) {
                        this.supCells.push(this.findCellById(this.arrCols[startCellColIdx + 1] + '-' + this.arrRows[y1]));
                    }
                }
                const y2 = startCellRowIdx + ship.type;
                if (y2 < this.arrCols.length - 1) {
                    this.supCells.push(this.findCellById(this.arrCols[startCellColIdx] + '-' + this.arrRows[y2]));
                    if (startCellColIdx - 1 >= 0) {
                        this.supCells.push(this.findCellById(this.arrCols[startCellColIdx - 1] + '-' + this.arrRows[y2]));
                    }
                    if (startCellColIdx + 1 < this.arrCols.length - 1) {
                        this.supCells.push(this.findCellById(this.arrCols[startCellColIdx + 1] + '-' + this.arrRows[y2]));
                    }
                }
            }
        }

        if (cell) {
            const firsCell =  this.shipCells[0];
            if (ship.angle === 0) {
                this.shipPos = {
                    x: firsCell.pos.x0 + ship.bodySprite!.width / 2,
                    y: firsCell.pos.y0 + this.step / 2
                }
            } else {
                this.shipPos = {
                    x: firsCell.pos.x0 + this.step / 2,
                    y: firsCell.pos.y0 + ship.bodySprite!.width / 2,
                }
            }
            //ship.setCellOnField({i:startCell.i,j:startCell.j});
            ship.setCellsOnField({
                main: this.shipCells.map(cell => {
                    return {
                        col: cell.id.split('-')[0],
                        row: Number(cell.id.split('-')[1])
                    }
                }),
                sup: this.supCells.map(cell => {
                    return {
                        col: cell.id.split('-')[0],
                        row: Number(cell.id.split('-')[1])
                    }
                })
            });
        }

        this.renderUpShip(ship);
    }

    colligionShip(ship: Ship2) {
        const shipBody = {
            x: ship.x,
            y: ship.y
        };

        for (let i = 0; i < this.cells.length; i++) {
            const cell = this.cells[i];
            const shipPosStart = {
                ...shipBody,
                x: shipBody.x - this.step / 2 * (ship.type - 1)
            }
            if (ship.angle === 90) {
                shipPosStart.x = shipBody.x;
                shipPosStart.y = shipBody.y - this.step / 2 * (ship.type - 1)
            }
            if ((shipPosStart.x >= cell.pos.x0 && shipPosStart.x <= cell.pos.x1)
                && (shipPosStart.y >= cell.pos.y0 && shipPosStart.y <= cell.pos.y1)) {
                //console.log('colligion!!!!!!!!!!!!!!!!!');
                this.calcFromStartCell(cell.id, ship);

                //cell.graphics.fillStyle('green');
                //return;
                break;
            }
        }
    }

    renderShip(ship: Ship2) {
        ship.cellsOnField?.main.forEach(cellObjId => {
            const cellId = cellObjId.col + '-' + cellObjId.row;
            const cell = this.findCellById(cellId);
            if (cell.isFree) {
                cell.graphics.fillStyle('green');
            }else{
                cell.graphics.fillStyle('red');
            }
        });
        ship.cellsOnField?.sup.forEach(cellObjId => {
            const cellId = cellObjId.col + '-' + cellObjId.row;
            const cell = this.findCellById(cellId);
            if (cell.isFree) {
                cell.graphics.fillStyle('#a7ffb5');
            }else{
                cell.graphics.fillStyle('#ffa7a8');
            }
        });
    }

    renderUpShip(ship: Ship2) {
        ship.cellsOnField?.main.forEach(cellObjId => {
            const cellId = cellObjId.col + '-' + cellObjId.row;
            const cell = this.findCellById(cellId);
            if (this.isGreen) {
                cell.graphics.fillStyle('green');
            }else{
                cell.graphics.fillStyle('red');
            }
        });
        ship.cellsOnField?.sup.forEach(cellObjId => {
            const cellId = cellObjId.col + '-' + cellObjId.row;
            const cell = this.findCellById(cellId);
            if (this.isGreen) {
                cell.graphics.fillStyle('#a7ffb5');
            }else{
                cell.graphics.fillStyle('#ffa7a8');
            }
        });
    }

    renderShips() {
        this.ships.forEach((ship) => {
            this.renderShip(ship);
        });
    }

    isOnField(ship: Ship2) {
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