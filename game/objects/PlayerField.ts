import { TPoint } from '../../gameLib/Game';
import Graphics from '../../gameLib/Graphics';
import Text from '../../gameLib/Text';
import { TPointer } from '../../gameLib/InputEvent';
import Scene from '../../gameLib/Scene';
import Sprite from '../../gameLib/Sprite';
import { setCursor, setFleatShema, TFieldShemaCell } from '../../store/slices/game';
import store from '../../store/store';
import Ship, { TShips } from './Ship';
import socketInst from '../../utils/socket';
import { shot } from '../../store/actions/game';

export type TType = 'player' | 'enemy';

type TCellBody = {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    center: {
        x: number;
        y: number;
    }
}

type TCellShip = {
    id: string;
    isMain: boolean;
}

interface ICellHead extends ICellBase {
    text: Text;
}

export interface ICell extends ICellBase {
    isFree: boolean;
    isLive: boolean;
    ship: TCellShip | null;
    spriteFree: Sprite;
    spriteShip: Sprite;
}

interface ICellBase {
    id: string;
    graphics: Graphics;
    pos: TCellBody;
}

// type TCell = {
//     id: string;
//     isFree: boolean;
//     isLive: boolean;
//     ship: TCellShip | null;
//     graphics: Graphics;
//     pos: TCellBody;
// }

export type TStartCell = {
    col: string;
    row: number;
    typeShip: TShips;
    angle: number;
}

export default class PlayerField {
    scene: Scene;
    //fieldMatrix: TCell[][] = [];
    cells: ICell[] = [];
    cellsHead: ICellHead[] = [];
    readonly arrRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    readonly arrCols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    readonly lineWidth = 2;
    step: number;
    shipPos: TPoint = { x: 0, y: 0 };
    isGreen = false;
    x: number;
    y: number;
    width = 0;
    height = 0;
    ships: Ship[] = [];
    shipCells: ICell[] = [];
    supCells: ICell[] = [];
    type: TType = 'player';
    cursor: Sprite;


    constructor(scene: Scene, x: number, y: number) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        const min = Math.min(this.scene.width, this.scene.height);
        this.step = (min - this.lineWidth) / 11;
        this.cursor = this.scene.add.sprite('cursor-target', 100, 100, 30, 30);
        this.cursor.alpha = 0;

        this.create();
    }

    create() {
        //const text = this.scene.add.text('A', 0, 50);
        //text.fontSize = 30;
        const fontSize = 26;
        const graphics = this.scene.add.graphics();
        //const lineWidth = 2;
        graphics.lineWidth(this.lineWidth);
        graphics.strokeStyle('#3bb4ff');
        //graphics.fillStyle('white');
        const startX = this.x + this.lineWidth / 2;
        const startY = this.y + this.lineWidth / 2;
        let posX = startX;
        let posY = startY;
        //const arrCols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        //const arrRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        for (let i = 0; i < 11; i++) {
            //let rows: TCell[] = [];
            for (let j = 0; j < 11; j++) {
                if (i > 0 && j === 0) {
                    const cellGraph = this.scene.add.graphics();
                    cellGraph.fillStyle('white');
                    const text = this.scene.add.text(this.arrRows[i - 1], posX + 5, posY + fontSize / 1.1);
                    text.fontSize = fontSize;
                    const cell: ICellHead = {
                        id: this.arrRows[i - 1],
                        graphics: cellGraph,
                        text,
                        pos: {
                            x0: posX,
                            y0: posY,
                            x1: posX + this.step,
                            y1: posY + this.step,
                            center: {
                                x: posX+this.step/2,
                                y: posY+this.step/2
                            }
                        }
                    }
                    this.cellsHead.push(cell);
                    cellGraph.fillRect(posX, posY, this.step - this.lineWidth, this.step - this.lineWidth);
                }
                if (j > 0 && i === 0) {
                    const cellGraph = this.scene.add.graphics();
                    cellGraph.fillStyle('white');
                    const text = this.scene.add.text(String(this.arrCols[j - 1]), posX + 2, posY + fontSize / 1.1);
                    text.fontSize = fontSize;
                    const cell: ICellHead = {
                        id: String(this.arrCols[j - 1]),
                        graphics: cellGraph,
                        text,
                        pos: {
                            x0: posX,
                            y0: posY,
                            x1: posX + this.step,
                            y1: posY + this.step,
                            center: {
                                x: posX+this.step/2,
                                y: posY+this.step/2
                            }
                        }
                    }
                    this.cellsHead.push(cell);
                    cellGraph.fillRect(posX, posY, this.step - this.lineWidth, this.step - this.lineWidth);
                }
                if (j > 0 && i > 0) {
                    const cellGraph = this.scene.add.graphics();
                    const half = this.step/2;
                    const spriteFree = this.scene.add.sprite('shot-cell', posX+half,posY+half,this.step);
                    spriteFree.alpha = 0;
                    const spriteShip = this.scene.add.sprite('shot-cell-ship', posX+half,posY+half,this.step);
                    spriteShip.alpha = 0;
                    spriteShip.setZindex(2);
                    cellGraph.fillStyle('white');
                    const cell: ICell = {
                        id: this.arrRows[i - 1] + '-' + this.arrCols[j - 1],
                        isFree: true,
                        isLive: true,
                        ship: null,
                        graphics: cellGraph,
                        spriteFree,
                        spriteShip,
                        pos: {
                            x0: posX,
                            y0: posY,
                            x1: posX + this.step,
                            y1: posY + this.step,
                            center: {
                                x: posX+this.step/2,
                                y: posY+this.step/2
                            }
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
        this.width = Math.max.apply(null, [...this.cells.map(cell => cell.pos.x1)]);
        this.height = this.cells[this.cells.length - 1].pos.y1;
        console.log('cells = ', this.cells);
        this.cursor.setZindex(2);
    }

    parseServerData(data: TFieldShemaCell[]){
        data.forEach(shemaCell=>{
            if(!shemaCell.isLive){
                this.renderShot(shemaCell);
            }
        });
    }

    renderShot(shemaCell: TFieldShemaCell){
        const cell = this.findCellById(shemaCell.id);
        //console.log('renderShot = ', shemaCell);
        cell.isLive = false;
        if(shemaCell.isFree){
            cell.spriteFree.alpha = 1;
        }else{
            cell.spriteShip.alpha = 1;
            cell.spriteShip.setZindex(2);
        }
    }

    clearField(){
        this.cells.forEach(cell=>cell.graphics.fillStyle('white'));
    }

    setType(type: TType) {
        this.type = type;
    }

    findCellById(id: string) {
        //console.log('id = ', id);
        return this.cells.find(cell => cell.id === id)!;
    }

    findCellHeadById(id: string) {
        return this.cellsHead.find(cell => cell.id === id)!;
    }

    isPointOnCell(cellPoint: TCellBody, point: TPoint){
        if (
            (cellPoint.x0 < point.x && cellPoint.x1 > point.x) &&
            (cellPoint.y0 < point.y && cellPoint.y1 > point.y)
        ) {
            return true;
        }

        return false;
    }

    pointerUp(pointer: TPointer){
        if(this.type === 'enemy' && this.isPointOnFiled(pointer)){
            const targetCell = this.cells.find(cell=>this.isPointOnCell(cell.pos, pointer));
            if(targetCell){
                if(targetCell.isLive){
                    store.dispatch(shot({cellId: targetCell.id}));
                    //socketInst.emit('shot', {cellId: targetCell.id});
                }
            }
        }
    }

    pointerMove(pointer: TPointer) {
        if (this.type === 'enemy' && this.isPointOnFiled(pointer)) {

            this.cursor.x = pointer.x;
            this.cursor.y = pointer.y;
            if (store.getState().game.cursor !== 'none') {
                store.dispatch(setCursor('none'));
                this.cursor.alpha = 1;
            }
            this.cellsHead.forEach(cell=>{
                cell.graphics.fillStyle('white');
            });
            this.cells.forEach(cell => {
                if (this.isPointOnCell(cell.pos, pointer)) {
                    const row = this.findCellHeadById(cell.id.split('-')[0]);
                    const col = this.findCellHeadById(cell.id.split('-')[1]);
                    if(cell.isLive){
                        row.graphics.fillStyle('#a7ffb5');
                        col.graphics.fillStyle('#a7ffb5');
                    }else{
                        row.graphics.fillStyle('red');
                        col.graphics.fillStyle('red');
                    }
                }
            });

            //console.log('pointer = ', pointer);
        } else {
            if (store.getState().game.cursor === 'none') {
                this.cellsHead.forEach(cell=>{
                    cell.graphics.fillStyle('white');
                });
                store.dispatch(setCursor('auto'));
                this.cursor.alpha = 0;
            }
        }
    }

    clearByShip(ship: Ship) {
        ship.cellsOnField?.main.forEach(cellId => {
            const cell = this.findCellById(cellId.row + '-' + cellId.col);
            let findedCell = undefined;
            for (let i = 0; i < this.ships.length; i++) {
                const s = this.ships[i];
                findedCell = s.findCell(cellId);
                if (s.findCell(cellId)) {
                    break;
                }
            }
            if (!findedCell) {
                cell.graphics.fillStyle('white');
                cell.isFree = true;
                cell.ship = null;
            }

            // if (cell.isFree) {
            //     cell.graphics.fillStyle('white');
            // } else {
            //     if (cell.ship!.id === ship.id) {
            //         cell.graphics.fillStyle('white');
            //         cell.isFree = true;
            //         cell.ship = null;
            //     } else {
            //         if (cell.ship?.isMain) {
            //             cell.graphics.fillStyle('green');
            //         } else {
            //             cell.graphics.fillStyle('#a7ffb5');
            //         }
            //     }
            // }
        });

        ship.cellsOnField?.sup.forEach(cellId => {
            //console.log('cellId = ', cellId);
            const cell = this.findCellById(cellId.row + '-' + cellId.col);
            //console.log('cell = ', cell);
            let findedCell = null;
            for (let i = 0; i < this.ships.length; i++) {
                const s = this.ships[i];
                findedCell = s.findCell(cellId);
                if (s.findCell(cellId)) {
                    break;
                }
            }
            if (!findedCell) {
                cell.graphics.fillStyle('white');
                cell.isFree = true;
                cell.ship = null;
            }
            // if (cell.isFree) {
            //     cell.graphics.fillStyle('white');
            // } else {
            //     if (cell.ship!.id === ship.id) {
            //         cell.graphics.fillStyle('white');
            //         cell.isFree = true;
            //         cell.ship = null;
            //     } else {
            //         if (cell.ship?.isMain) {
            //             cell.graphics.fillStyle('green');
            //         } else {
            //             cell.graphics.fillStyle('#a7ffb5');
            //         }
            //     }
            // }
        });
    }

    clearAfterMove() {
        this.shipCells.forEach(cell => {
            if (cell.isFree) {
                cell.graphics.fillStyle('white');
            } else {
                if (cell.ship?.isMain) {
                    cell.graphics.fillStyle('green');
                } else {
                    cell.graphics.fillStyle('#a7ffb5');
                }
            }
        });

        this.supCells.forEach(cell => {
            if (cell.isFree) {
                cell.graphics.fillStyle('white');
            } else {
                if (cell.ship?.isMain) {
                    cell.graphics.fillStyle('green');
                } else {
                    cell.graphics.fillStyle('#a7ffb5');
                }
            }
        });
    }

    addShip(ship: Ship) {
        if (this.isGreen) {
            ship.setPosOnField(this.shipPos);
            ship.setCellsOnField({
                main: this.shipCells.map(cell => {
                    return {
                        row: cell.id.split('-')[0],
                        col: Number(cell.id.split('-')[1])
                    }
                }),
                sup: this.supCells.map(cell => {
                    return {
                        row: cell.id.split('-')[0],
                        col: Number(cell.id.split('-')[1])
                    }
                })
            });
            console.log('addShip');
        }
        this.ships.push(ship);
        store.dispatch(setFleatShema(this.ships.map((ship) => {
            return {
                id: ship.id,
                type: ship.type,
                angle: ship.angle,
                startPos: ship.cellsOnField?.main[0].row + '-' + ship.cellsOnField?.main[0].col
            }
        })));
        ship.cellsOnField?.main.forEach(cellId => {
            const cell = this.findCellById(cellId.row + '-' + cellId.col);

            if (cell.isFree) {
                cell.graphics.fillStyle('green');
                cell.isFree = false;
                cell.ship = {
                    id: ship.id,
                    isMain: true
                }
            }

        });
        ship.cellsOnField?.sup.forEach(cellId => {
            const cell = this.findCellById(cellId.row + '-' + cellId.col);
            if (cell.isFree) {
                cell.graphics.fillStyle('#a7ffb5');
                cell.isFree = false;
                cell.ship = {
                    id: ship.id,
                    isMain: false
                }
            }
        });
    }

    upShip(ship: Ship) {
        //console.log('upShip');
        this.ships = this.ships.filter(s => s.id !== ship.id);
        this.clearByShip(ship);
    }

    dropShip(ship: Ship) {
        //this.clearByShip(ship);
        //console.log('dropShip ', ship.isHasPrevPosField(), '||', this.isGreen, '||', (ship.isHasPrevPosField() || this.isGreen));
        this.clearAfterMove();
        if (this.isOnField(ship) && (ship.isHasPrevPosField() || this.isGreen)) {
            //console.log('this.isGreen = ', this.isGreen);
            //if(this.isGreen){
            //this.ships.push(ship);
            //console.log('this.shipPos = ', this.shipPos);
            //ship.setPosOnField(this.shipPos);
            //this.renderShips();
            this.addShip(ship);

            //}
            ship.setOnField();
        } else {
            //console.log('out of field!!');
            //this.clearByShip(ship);
            ship.setOnStart();
        }
        this.renderShips();
        //this.clearByShip(ship);
    }

    calcFromStartCell(startCell: string, ship: Ship, angle: number) {
        //this.clearByShip(ship);
        this.clearAfterMove();
        const startCellRowIdx = this.arrRows.findIndex(el => el === startCell.split('-')[0]);
        const startCellColIdx = this.arrCols.findIndex(el => el === Number(startCell.split('-')[1]));
        let colIdx = startCellColIdx;
        let rowIdx = startCellRowIdx;
        let cell: ICell | null = null;
        this.isGreen = true;
        this.shipCells = [];
        this.supCells = [];
        for (let i = 0; i < ship.type; i++) {
            if ((colIdx >= 0 && colIdx < this.arrCols.length) && (rowIdx >= 0 && rowIdx < this.arrRows.length)) {
                cell = this.findCellById(this.arrRows[rowIdx] + '-' + this.arrCols[colIdx]);
                //console.log('cell = ', this.arrCols[colIdx], '||',this.arrRows[rowIdx]);
                //console.log(cell);
                //return;
                if (angle === 90) {
                    if (colIdx - 1 >= 0) {
                        const cell2 = this.findCellById(this.arrRows[rowIdx] + '-' + this.arrCols[colIdx - 1]);
                        this.supCells.push(cell2);
                    }
                    if (colIdx + 1 < this.arrCols.length) {
                        const cell2 = this.findCellById(this.arrRows[rowIdx] + '-' + this.arrCols[colIdx + 1]);
                        this.supCells.push(cell2);
                    }
                    if (!cell.isFree) {
                        this.isGreen = false;
                    }
                    this.shipCells.push(cell);
                    rowIdx++;
                } else {
                    if (rowIdx - 1 >= 0) {
                        const cell2 = this.findCellById(this.arrRows[rowIdx - 1] + '-' + this.arrCols[colIdx]);
                        this.supCells.push(cell2);
                    }
                    if (rowIdx + 1 < this.arrRows.length) {
                        const cell2 = this.findCellById(this.arrRows[rowIdx + 1] + '-' + this.arrCols[colIdx]);
                        this.supCells.push(cell2);
                    }
                    if (!cell.isFree) {
                        this.isGreen = false;
                    }
                    this.shipCells.push(cell);
                    colIdx++;
                }
            } else {
                this.isGreen = false;
                break;
            }
        }

        if (startCellColIdx >= 0) {
            if (angle === 90) {
                const x1 = startCellRowIdx - 1;
                if (x1 >= 0) {
                    this.supCells.push(this.findCellById(this.arrRows[x1] + '-' + this.arrCols[startCellColIdx]));
                    if (startCellColIdx - 1 >= 0) {
                        this.supCells.push(this.findCellById(this.arrRows[x1] + '-' + this.arrCols[startCellColIdx - 1]));
                    }
                    if (startCellColIdx + 1 < this.arrCols.length) {
                        this.supCells.push(this.findCellById(this.arrRows[x1] + '-' + this.arrCols[startCellColIdx + 1]));
                    }
                }
                const x2 = startCellRowIdx + ship.type;
                if (x2 < this.arrRows.length) {
                    this.supCells.push(this.findCellById(this.arrRows[x2] + '-' + this.arrCols[startCellColIdx]));
                    if (startCellColIdx - 1 >= 0) {
                        this.supCells.push(this.findCellById(this.arrRows[x2] + '-' + this.arrCols[startCellColIdx - 1]));
                    }
                    if (startCellColIdx + 1 < this.arrCols.length) {
                        this.supCells.push(this.findCellById(this.arrRows[x2] + '-' + this.arrCols[startCellColIdx + 1]));
                    }
                }
            } else {
                const y1 = startCellColIdx - 1;
                if (y1 >= 0) {
                    this.supCells.push(this.findCellById(this.arrRows[startCellRowIdx] + '-' + this.arrCols[y1]));
                    if (startCellRowIdx - 1 >= 0) {
                        this.supCells.push(this.findCellById(this.arrRows[startCellRowIdx - 1] + '-' + this.arrCols[y1]));
                    }
                    if (startCellRowIdx + 1 < this.arrRows.length) {
                        this.supCells.push(this.findCellById(this.arrRows[startCellRowIdx + 1] + '-' + this.arrCols[y1]));
                    }
                }
                const y2 = startCellColIdx + ship.type;
                if (y2 < this.arrCols.length) {
                    this.supCells.push(this.findCellById(this.arrRows[startCellRowIdx] + '-' + this.arrCols[y2]));
                    if (startCellRowIdx - 1 >= 0) {
                        this.supCells.push(this.findCellById(this.arrRows[startCellRowIdx - 1] + '-' + this.arrCols[y2]));
                    }
                    if (startCellRowIdx + 1 < this.arrCols.length) {
                        this.supCells.push(this.findCellById(this.arrRows[startCellRowIdx + 1] + '-' + this.arrCols[y2]));
                    }
                }
            }
        }

        //if (cell) {
        const firsCell = this.shipCells[0];
        if (angle === 0) {
            this.shipPos = {
                x: firsCell.pos.x0 + ship.width/2,
                y: firsCell.pos.y0 + this.step / 2
            }
        } else {
            this.shipPos = {
                x: firsCell.pos.x0 + this.step / 2,
                y: firsCell.pos.y0 + ship.width/2,
            }
        }
        //ship.setCellOnField({i:startCell.i,j:startCell.j});
        // ship.setCellsOnField({
        //     main: this.shipCells.map(cell => {
        //         return {
        //             col: cell.id.split('-')[0],
        //             row: Number(cell.id.split('-')[1])
        //         }
        //     }),
        //     sup: this.supCells.map(cell => {
        //         return {
        //             col: cell.id.split('-')[0],
        //             row: Number(cell.id.split('-')[1])
        //         }
        //     })
        // });
        //}

        this.renderUpShip();
    }

    colligionShip(ship: Ship) {
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
                this.calcFromStartCell(cell.id, ship, ship.angle);

                //cell.graphics.fillStyle('green');
                //return;
                break;
            }
        }
    }

    rotateShip(ship: Ship) {
        let angle = 0;
        if (ship.angle === 0) {
            angle = 90
        }

        const startCell = ship.cellsOnField?.main[0].row + '-' + ship.cellsOnField?.main[0].col;
        this.calcFromStartCell(startCell, ship, angle);

        if (this.isGreen) {
            ship.angle = angle;
            this.dropShip(ship);
            //this.addShip(ship);
            //ship.setOnField();
            //console.log('Может повернуть = ', angle);
        } else {
            //console.log('Не может повернуть = ', angle);
            setTimeout(() => {
                this.addShip(ship);
                this.dropShip(ship);
                //ship.setOnField();

            }, 100);
        }


        // const isCanRotate = this.calcFromStartCell({ ...ship.cellsOnField?.main[0], typeShip: ship.type, angle }, ship);
        // if (isCanRotate) {
        //     ship.angle = angle;
        //     this.renderShip();
        // }
        // this.dropShip(ship);
        //this.calcFromStartCell({...ship.cellOnField,typeShip:ship.type,angle:ship.angle}, ship);
    }

    renderShip(ship: Ship) {
        ship.cellsOnField?.main.forEach(cellObjId => {
            const cellId = cellObjId.row + '-' + cellObjId.col;
            const cell = this.findCellById(cellId);
            //if (cell.isFree) {
            cell.graphics.fillStyle('green');
            //}
            // else{
            //     cell.graphics.fillStyle('red');
            // }
        });
        ship.cellsOnField?.sup.forEach(cellObjId => {
            const cellId = cellObjId.row + '-' + cellObjId.col;
            const cell = this.findCellById(cellId);
            //if (cell.isFree) {
            cell.graphics.fillStyle('#a7ffb5');
            //}
            // else{
            //     cell.graphics.fillStyle('#ffa7a8');
            // }
        });
    }

    renderUpShip() {
        this.shipCells.forEach(cell => {
            //const cellId = cellObjId.col + '-' + cellObjId.row;
            //const cell = this.findCellById(cellId);
            if (this.isGreen) {
                cell.graphics.fillStyle('green');
            } else {
                cell.graphics.fillStyle('red');
            }
        });
        this.supCells.forEach(cell => {
            // const cellId = cellObjId.col + '-' + cellObjId.row;
            // const cell = this.findCellById(cellId);
            if (this.isGreen) {
                cell.graphics.fillStyle('#a7ffb5');
            } else {
                cell.graphics.fillStyle('#ffa7a8');
            }
        });
    }

    renderShips() {
        this.ships.forEach((ship) => {
            this.renderShip(ship);
        });
    }

    isHasShip(ship: Ship) {
        if (this.ships.find(s => s.id === ship.id)) {
            return true;
        }
        //console.log('нету коробля на поле!!!!!!!!');
        return false;
    }

    isPointOnFiled(point: TPoint) {
        if ((point.x >= this.x && point.x <= this.width) && (point.y >= this.y && point.y <= this.height)) {
            return true;
        } else {
            return false;
        }
    }

    isOnField(ship: Ship) {
        let shipPosStart = {
            y: ship.y,
            x: ship.x - this.step / 2 * (ship.type - 1)
        }
        return this.isPointOnFiled(shipPosStart);
        // if ((shipPosStart.x >= this.x && shipPosStart.x <= this.width) && (shipPosStart.y >= this.y && shipPosStart.y <= this.height)) {
        //     return true;
        // } else {
        //     return false;
        // }
    }

}