import Box from "./box.js"
import Noti from "./noti.js"

const canvas = document.getElementById("canvas")
const body = document.getElementById("body")

const h = window.innerHeight
const w = window.innerWidth

canvas.height = h
canvas.width = w

var ctx = canvas.getContext("2d")

var noti = new Noti(w/2, 40, ctx) 
var box = new Box(300, 350, w/2-150, h/2, ctx, h, w, noti)

const open_d = 24
const open_m = 4

noti.showNoti(`Đợi tiep toi ${open_d}/${open_m}/2024 di...`, "#A20D1E")

do {
    var today = new Date();
    var dd = (today.getDate())
    var mm = (today.getMonth() + 1)
    var yyyy = today.getFullYear();
    
    today = String(mm) + '/' + String(dd) + '/' + yyyy;

    console.log(today)
    await new Promise(r => setTimeout(r, 1000));
} while(!(mm > open_m || (mm == open_m && dd >= open_d)))

ctx.clearRect(0, 0, w, h)
box.init()
noti.showNoti("Ngày gì zạy?", "#A20D1E")


addEventListener("mousemove", (e) => {
    const m_x = e.clientX
    const m_y = e.clientY

    if((box.isInside(m_x, m_y) && box.opened == false) ||
        (box.opened && (box.isAccept(m_x, m_y) || box.isDecline(m_x, m_y))) ||
        (box.opened && box.isInsidePaper(m_x, m_y) && !read)){
        document.body.style.cursor = "pointer"
    } else {
        document.body.style.cursor = "default"
    }
})

var read = false
var dec = false
var ques = false
addEventListener("mousedown", async (e) => {
    const m_x = e.clientX
    const m_y = e.clientY

    if(box.isInside(m_x, m_y) && box.opened == false){
        await box.open()
        box.showAll()
    } else if(box.opened && box.isInsidePaper(m_x, m_y) && !read){
        read = true
        box.question()
        ques = true
        await new Promise(r => setTimeout(r, 10000));
    }
    if(box.opened && ques){

        if(box.isDecline(m_x, m_y) && !dec){
            box.decline()
            dec = true
        }
        if(box.isAccept(m_x, m_y)){
            await box.zoomLetter()
            box.showMess()
        }
    }
})
