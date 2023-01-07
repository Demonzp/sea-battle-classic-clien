import GameObject from './GameObject';
import Scene from './Scene';

export type TFontStyle = 'normal'|'italic'|'cursive'|'bold';

export default class Text extends GameObject{
    private _text = '';
    private _fontSize = 12;
    private _fontFamely = 'Arial';
    private _fontStyle:TFontStyle = 'normal';
    private _isStrokeText = false;
    private _color = 'black';
    //private _fontStretch = '';
    constructor(scene: Scene, text='', x=0, y=0, width?:number){
        super(scene, 'text', 'Text', x, y);
        if(width){
            this.width = width;
        }
        this.text = text;
    }

    set text(val: string){
        this._text = val;
    }

    get text(){
        return this._text;
    }

    set color(val:string){
        this._color = val;
    }

    set fontSize(val: number){
        this._fontSize = val;
    }

    get fontSize(){
        return this._fontSize;
    }

    set fontFamely(val: string){
        this._fontFamely = val;
    }

    get fontFamely(){
        return this._fontFamely;
    }

    set fontStyle(val:TFontStyle){
        this._fontStyle = val;
    }

    get fontStyle(){
        return this._fontStyle;
    }

    render(){
        this.scene.ctx?.save();

        this.scene.ctx?.translate(this.x, this.y);
        this.scene.ctx?.rotate(this.pi*this.angle);
        this.scene.ctx?.translate(-(this.x), -(this.y));
        this.scene.ctx!.globalAlpha = this.alpha;
        //this.scene.ctx!.font = "expanded 66px 'Press Start 2P', cursive";
        this.scene.ctx!.font = `${this._fontSize}px '${this._fontFamely}', ${this._fontStyle}`;
        if(this._isStrokeText){
            this.scene.ctx!.strokeStyle = this._color;
            this.scene.ctx?.strokeText(this._text, this.x, this.y);
        }else{
            this.scene.ctx!.fillStyle = this._color;
            this.scene.ctx?.fillText(this._text, this.x, this.y);
        }
        //this.scene.ctx?.drawImage(this.image, this.center.x, this.center.y, this.width, this.height);
        
        this.scene.ctx?.restore();
    }
}