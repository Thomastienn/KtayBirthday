import Lit from "./lit.js"

export default class Box {
    constructor(h, w, x, y, ctx, s_h, s_w, noti){
        this.h = h
        this.w = w
        this.x = x
        this.y = y
        this.ctx = ctx

        this.s_h = s_h
        this.s_w = s_w

        this.btnX = x+w/2
        this.btnY = y+200

        this.opened = false
        this.questioned = false
        this.noti = noti
        
        this.lit = new Lit(h/7, w+10*2, x-10, y-h/10, ctx)
    }

    init(){
        this.ctx.fillStyle = "#A20D1E"
        this.ctx.fillRect(this.x, this.y, this.w, this.h) 
        const img = new Image()
        img.src = "./dino.png"
        img.onload = () => {
            this.ctx.drawImage(img, this.x+this.w/2-75, this.y+this.h/2-75, 150, 150)
        }
        
        // Shadow
        this.ctx.fillStyle = "rgb(150,10,20)"
        this.ctx.fillRect(this.x, this.y, this.w, this.h/15) 


        this.lit.draw()
    }

    async open(){
        const paper_w = this.w*0.6
        for(var i = 1; i < 100; i++){
            this.ctx.clearRect(0, 0, this.s_w, this.s_h)

            // Paper
            this.ctx.fillStyle = "rgb(242,242,242)"
            this.ctx.fillRect(this.x+this.w*0.2, this.y-i, paper_w, this.h)

            this.ctx.fillStyle = "#A20D1E"
            this.ctx.fillRect(this.x, this.y, this.w, this.h) 

            const img = new Image()
            img.src = "./dino.png"
            img.onload = () => {
                this.ctx.drawImage(img, this.x+this.w/2-75, this.y+this.h/2-75, 150, 150)
            }


            this.lit.move(-0.3, 0.1, -2.2, -2.4, -2, -2.5, 0, 0)
            this.lit.draw()

            await new Promise(r => setTimeout(r, 0.000001));
        }
        this.ctx.fillStyle = "rgb(242,242,242)"
        this.opened = true
    }

    async zoomLetter(){
        this.l_y = this.y-100
        for(var i = 0; i < 100; i++){
            this.ctx.clearRect(0, 0, this.s_w, this.s_h)
            this.showAll()

            this.ctx.fillStyle = "rgb(242,242,242)"
            this.ctx.fillRect(this.x+this.w*0.2-i, this.l_y-i*1.5, this.w*0.6+i*2, this.h+i*2)

            await new Promise(r => setTimeout(r, 20));
        }

        this.l_x = this.x+this.w*0.2-100
        this.l_y = this.l_y-100*1.5
    }

    showMess(){
        const header = "Dear khoai map,"
        const text = "Hehhh tuy là giống lần trc nhma đổi concept cho ktay đỡ chán. Làm riết cho ktay chắc mốt lên trình lun qá. Háp pi bớt đây nhaaa. Tới h t zẫn chưa có qà nên h chúc trc khom m chém đòu t. Nói chung sớm hếc pịnh trc i gòi zề di choi zới kao. 18 tủi gòi đủ zô tù gòi đó loi choi cái là lên zành móng ngựa lìn. Khom dc đón tủi 18 ở ziet nam cũm pùn he. Zề đi gòi đón bù. Hec 3 tháng này là m bỏ kao gòi. Zừa tin zui mà cũm bùn cũm khá la soc. Het chỗ gòi thoi chuc ktay sinh nhat dang nho nhứt cuoc doi"
        const footer = "Kí tên: Khung long xam"

        const font_s = 30
        var s_txt_x = this.l_x + font_s
        var s_txt_y = this.l_y + font_s*1.1
        const line_height = font_s*1.3

        this.ctx.fillStyle = "rgb(1,13,0)";
        this.ctx.font = `bold ${font_s}px Monospace`;
        this.ctx.textAlign = 'left';
        this.ctx.fillText(header, s_txt_x,  s_txt_y);

        s_txt_y += line_height

        this.ctx.font = `${font_s/1.5}px Monospace`;
        
        this.wrapText(this.ctx, text, s_txt_x, s_txt_y, this.w*0.6+88*2, line_height*0.7)

        this.ctx.font = `bold ${font_s}px Monospace`;
        this.ctx.fillText(footer, s_txt_x, s_txt_y+ this.h+52*2);
    }

    isInsidePaper(m_x, m_y){
        if(m_x >= this.x+this.w*0.2 && m_x <= this.x+this.w*0.2+this.w*0.6
        && m_y >= this.y-100 && m_y <= this.y-100+this.h){
            return true
        }
        return false
    }

    isInside(m_x, m_y){
        if(m_x >= this.x && m_x <= this.x+this.w
        && m_y >= this.y && m_y <= this.y+this.w){
            return true
        }
        if(this.lit.isInside(m_x, m_y)){
            return true
        }
        return false
    }

    wrapText(context, text, x, y, maxWidth, lineHeight) {
        var cars = text.split("\n");
        for (var ii = 0; ii < cars.length; ii++) {

            var line = "";
            var words = cars[ii].split(" ");

            for (var n = 0; n < words.length; n++) {
                var testLine = line + words[n] + " ";
                var metrics = context.measureText(testLine);
                var testWidth = metrics.width;

                if (testWidth > maxWidth) {
                    context.fillText(line, x, y);
                    line = words[n] + " ";
                    y += lineHeight;
                }
                else {
                    line = testLine;
                }
            }

            context.fillText(line, x, y);
            y += lineHeight;
        }
    }

    showAll(){
        // Flags
        const f_w = 200
        var imgs = []
        for(let i = 0; i < this.s_w/f_w; i++){
            let img = new Image();
            img.src = "./flag.png";
            imgs.push(img);
            img.onload = ((index) => {
                return () => {
                    this.ctx.drawImage(imgs[index], f_w*index, 0, 200, 100);
                };
            })(i);
        }

        const b1 = new Image()
        b1.src = "./balloon.png"
        b1.onload = () => {
            this.ctx.drawImage(b1, 0, this.s_h-250, 150, 250)
        }

        const b2 = new Image()
        b2.src = "./balloon.png"
        b2.onload = () => {
            this.ctx.drawImage(b2, this.s_w-150, this.s_h-250, 150, 250)
        }
    }
    
    question(){
        this.ctx.fillStyle = "rgb(250,250,250)"
        this.ctx.fillRect(this.x-100, this.y-200, this.w+200, this.h)

        this.ctx.fillStyle = "rgb(50,50,50)";
        this.ctx.font = `bold 30px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText("Zutien co depchai ko?", this.x+150,  this.y-150)

        this.ctx.fillStyle = "rgb(50,50,50)"
        this.ctx.fillRect(this.x-50, this.y-50, this.w-150, this.h/2-50)
        this.ctx.fillRect(this.x+this.w-150, this.y-50, this.w-150, this.h/2-50)

        this.ctx.fillStyle = "rgb(250,250,250)"
        this.ctx.fillText("Chac chan", this.x+50,  this.y)
        this.ctx.fillText("Deo", this.x+this.w-50,  this.y)

        this.questioned = true
    }

    decline(){
        this.ctx.fillStyle = "rgb(250,250,250)"
        this.ctx.fillRect(this.x-100, this.y-200, this.w+200, this.h)

        this.ctx.fillStyle = "rgb(50,50,50)";
        this.ctx.font = `bold 30px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText("Shaiii goiiii!", this.x+150,  this.y-150)

        this.ctx.fillStyle = "rgb(50,50,50)"
        this.ctx.fillRect(this.x-50, this.y-50, this.w-150, this.h/2-50)

        this.ctx.fillStyle = "rgb(250,250,250)"
        this.ctx.fillText("Chac chan", this.x+50,  this.y)
    }

    isAccept(m_x, m_y){
        if(m_x >= this.x-50 && m_x <= this.x-50+this.w-150
            && m_y >= this.y-50 && m_y <= this.y-50+this.h/2-50){
                return true
        }
        return false
    }
    isDecline(m_x, m_y){
        if(m_x >= this.x+this.w-150 && m_x <= this.x+this.w-150+this.w-150
            && m_y >= this.y-50 && m_y <= this.y-50+this.h/2-50){
                return true
        }
        return false
    }
}