export default class Noti {
    constructor(x, y, ctx){
        this.fontSize = 45
        this.x = x
        this.y = y+this.fontSize
        this.ctx = ctx
    }

    showNoti(text, color){
        this.ctx.fillStyle = color;
        this.ctx.font = `bold ${this.fontSize}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(text, this.x,  this.y);
    }
}