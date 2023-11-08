
const canvas = document.querySelector(".canvas1")
const controlseBtn = document.querySelector(".controlse button")
const slider_spread = document.querySelector(".spread")
const labal_spread = document.querySelector('[for="spread"]')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let size = canvas.width < canvas.height ? canvas.width * 0.1 : canvas.height * 0.1






const maxLevel = 8
const branches = 2

let setColors = `hsl(${Math.random() * 160}, 100%, 50%)`
let spread = -0.2
let scale = 0.85
let sides = 10
let setLineWidth = 30


slider_spread.addEventListener("change", (e) => {
    spread = e.target.value
    drawFractal()
})



c.lineCap = 'round'
c.shadowColor = 'rgba(0, 0, 0, 0.7)'
c.shadowOffsetX = 10
c.shadowOffsetY = 5
c.shadowBlur = 10


function drawBranch(level) {
    if(level > maxLevel) return
    c.beginPath()
    c.moveTo(0, 0)
    c.lineTo(size, 0)
    c.stroke()

    for(let i = 0; i < branches; i++) {
        c.save()
        c.translate(size - (size / branches) * i, 0)
        c.scale(scale, scale)

        c.save()
        c.rotate(spread)
        drawBranch(level + 1)
        c.restore()

        // c.save()
        // c.rotate(-spread)
        // drawBranch(level + 1)
        // c.restore()

        c.restore()
    }
    c.beginPath()
    c.arc(0, size, size * 0.1, 0, Math.PI * 2)
    c.fill()
    
}


function drawFractal() {
    c.lineWidth = setLineWidth
    c.fillStyle = setColors
    c.strokeStyle = setColors
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.save()
    c.translate(canvas.width / 2, canvas.height / 2)
    for(let i = 1; i <= sides; i++) {
        c.rotate((Math.PI * 2)/ sides)
        drawBranch(0)
    }
    c.restore()
    
}


function randomizeFractal() {
    setColors = `hsl(${Math.random() * 160}, 100%, 50%)`
    spread = Math.random() * 0.6 - 0.3
    // scale = Math.random() * 0.2 + 0.4
    sides = Math.floor(Math.random() * 7 + 2)
    setLineWidth = Math.random() * 30 + 20 
}


controlseBtn.addEventListener("click", function() {
    randomizeFractal()
    drawFractal()
})

window.addEventListener("load", () => {
    drawFractal()
})
