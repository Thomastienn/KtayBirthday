export default class Lit {
    constructor(h, w, x, y, ctx){
        this.x1 = x
        this.y1 = y

        this.x2 = x+w
        this.y2 = y

        this.x3 = x+w
        this.y3 = y+h

        this.x4 = x
        this.y4 = y+h

        this.ctx = ctx
    }

    move(x1, y1, x2, y2, x3, y3, x4, y4){
        this.x1 += x1
        this.y1 += y1
        this.x2 += x2
        this.y2 += y2
        this.x3 += x3
        this.y3 += y3
        this.x4 += x4
        this.y4 += y4
    }

    draw(){
        this.ctx.fillStyle = "#BC0D35"
    
        this.ctx.beginPath()
        this.ctx.moveTo(this.x1, this.y1)
        this.ctx.lineTo(this.x2, this.y2)
        this.ctx.lineTo(this.x3, this.y3)
        this.ctx.lineTo(this.x4, this.y4)
        this.ctx.closePath()
        this.ctx.fill()
    }
    isInside(m_x, m_y){
        if(m_x >= this.x1 && m_x <= this.x1+this.w
        && m_y >= this.y1 && m_y <= this.y1+this.w){
            return true
        }
        return false
    }
}