let WIDTH_HEIGHT:number = 600;
let timezones:string[] = ["Europe/Berlin", "America/New_York", /*"Australia/Sydney",*/ "Asia/Kolkata", "Europe/London", "America/Los_Angeles", "Europe/Moscow", "America/Chicago", "America/Argentina/Buenos_Aires", "Pacific/Honolulu", "America/Denver", "Pacific/Auckland", "Asia/Shanghai", "America/Godthab", "Atlantic/Cape_Verde", "Australia/Darwin"]
function drawClock() {
    let canvas = <HTMLCanvasElement> document.getElementById('canvas');
    let c:CanvasRenderingContext2D|null = canvas.getContext("2d")
    if (!c) throw "CanvasRenderingContext2D not found!"
    c.beginPath()
    let lineWidth:number = (5/600)*WIDTH_HEIGHT
    c.lineWidth = lineWidth
    c.arc(WIDTH_HEIGHT/2, WIDTH_HEIGHT/2, (WIDTH_HEIGHT-lineWidth)/2, 0, 2*Math.PI)
    c.fillStyle = "#ffffff"
    c.fill()
    c.strokeStyle = "#000000"
    c.stroke()
    c.fillStyle = "#000000"
    c.textAlign = "center"
    c.textBaseline = "middle"
    c.beginPath()
    c.arc(WIDTH_HEIGHT/2, WIDTH_HEIGHT/2, ((WIDTH_HEIGHT*0.82)-lineWidth)/2, 0, 2*Math.PI)
    c.stroke()
    c.lineWidth = lineWidth*2
    for (let i = 1; i <= 24; i++) {
        let x:number = (WIDTH_HEIGHT*0.5) + ((WIDTH_HEIGHT*0.9)/2) * Math.cos(2 * Math.PI * i / 24 - (6/24)*2*Math.PI)
        let y:number = (WIDTH_HEIGHT*0.5) + ((WIDTH_HEIGHT*0.9)/2) * Math.sin(2 * Math.PI * i / 24 - (6/24)*2*Math.PI)
        c.font = (i<10?(WIDTH_HEIGHT*0.055):(WIDTH_HEIGHT*0.05))+"px Arial"
        c.fillText(i.toString(), x, y)
        c.beginPath()
        c.arc(WIDTH_HEIGHT/2, WIDTH_HEIGHT/2, ((WIDTH_HEIGHT*0.807)-lineWidth)/2, 0-((0.5/360)*2*Math.PI)+(2 * Math.PI * i / 24 + 0.5*Math.PI), (0.5/360)*2*Math.PI+(2 * Math.PI * i / 24 + 0.5*Math.PI))
        c.stroke()
    }
    let now:Date = new Date()
    for (let i:number = 0; i < timezones.length; i++) {
        let decimalTime:number = (parseInt(now.toLocaleString('en-EN', {hour: '2-digit', hour12: false, timeZone: timezones[i]}))*1)
                                + (parseFloat(now.toLocaleString('en-EN', {minute: '2-digit', hour12: false, timeZone: timezones[i]}))/60)
        if (i>0) {
            c.strokeStyle = "#4D4D4D"
            c.fillStyle = "#ffffff"
        } else {
            c.strokeStyle = "#000000"
            c.fillStyle = "#ffffff"
        }
        c.beginPath()
        c.moveTo(WIDTH_HEIGHT/2, WIDTH_HEIGHT/2)
        let x:number = (WIDTH_HEIGHT*0.5) + ((WIDTH_HEIGHT*0.75)/2) * Math.cos(2 * Math.PI * decimalTime / 24 - (6/24)*2*Math.PI)
        let y:number = (WIDTH_HEIGHT*0.5) + ((WIDTH_HEIGHT*0.75)/2) * Math.sin(2 * Math.PI * decimalTime / 24 - (6/24)*2*Math.PI)
        c.lineTo(x, y)
        c.lineWidth = lineWidth*0.75
        c.stroke()
        c.save()
        c.translate(WIDTH_HEIGHT/2, WIDTH_HEIGHT/2)
        c.rotate(((decimalTime/24)*Math.PI*2)-Math.PI*0.5)
        c.lineWidth = lineWidth
        c.font = Math.floor(WIDTH_HEIGHT*0.038)+"px Arial"
        let cityArr:string[] = timezones[i].split("/")
        let city:string = cityArr[cityArr.length-1].replace("_", " ")
        c.strokeText(city, WIDTH_HEIGHT*0.22, 0)
        c.fillText(city, WIDTH_HEIGHT*0.22, 0)
        c.translate(-WIDTH_HEIGHT/2, -WIDTH_HEIGHT/2)
        c.restore()
    }
    c.fillStyle = "#000000"
    c.beginPath()
    c.arc(WIDTH_HEIGHT/2, WIDTH_HEIGHT/2, (WIDTH_HEIGHT*0.15)/2, 0, 2*Math.PI)
    c.fill()
    c.fillStyle = "#ffffff"
    let time:string = now.toLocaleString('en-EN', {hour: '2-digit', minute: '2-digit', hour12: false, timeZone: timezones[0]})
    c.font = "bold "+(WIDTH_HEIGHT*0.05)+"px Arial"
    c.lineWidth = lineWidth*0.8
    c.fillText(time, WIDTH_HEIGHT/2, WIDTH_HEIGHT/2)
}
window.addEventListener("load", function() {
    drawClock()
}, false)
setInterval(function() {
    let now:Date = new Date()
    if (now.getUTCSeconds()==0) {
        drawClock()
    }
}, 1000)