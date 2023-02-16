import Scene from "../../gameLib/Scene";
import Sprite from "../../gameLib/Sprite";
import Battle from "../scenes/BattleScene";
import { ICell } from "./PlayerField";

export default class Bullet{
    scene: Battle;
    x: number;
    y: number;
    angle: number;
    targetX: number;
    targetY: number;
    cell: ICell;
    _sprite: Sprite|null = null;
    sX = 0;
    sY = 0;
    speed = 10;
    isLive = false;

    constructor(
        scene: Scene, 
        cell: ICell,
        x: number,
        y: number,
        angle: number,
        targetX: number,
        targetY: number 
    ){
        this.scene = scene as Battle;
        this.cell = cell;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.targetX = targetX;
        this.targetY = targetY;

        this.create();
    }

    create(){
        this.isLive = true;
        this._sprite = this.scene.add.sprite('bullet', this.x, this.y, 4, 4);
        const rad = this.angle*Math.PI/180;
        const kY = Math.sin(rad);
        const kX = Math.cos(rad);
        this.sX = this.speed * kX;
        this.sY = this.speed * kY;
        this.sprite.angle = this.angle+180;
    }

    get sprite(){
        return this._sprite!;
    }

    goTo(){
        
        if((this.x>=this.targetX-this.speed&&this.x<=this.targetX+this.speed)
            &&(this.y>=this.targetY-this.speed&&this.y<=this.targetY+this.speed)
        ){
            this.isLive = false;
            this.x = this.targetX;
            this.y = this.targetY;
            this.scene.bulletOnTarget(this);
            this.scene.add.remove(this.sprite);
        }

        this.x-=this.sX;
        this.y-=this.sY;
    }

    update(){
        if(!this.isLive){
            return;
        }
        this.goTo();
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }
}