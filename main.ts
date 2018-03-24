const { app, BrowserWindow } = require("electron")
const path = require("path")
const url = require("url")

function createWindow() {
    let win = new BrowserWindow({
        width: 600,
        height: 600,
        frame: false,
        transparent: true,
        toolbar: false
    })
    win.loadURL(url.format({
        pathname: path.join(__dirname, "main_window/main_window.html"),
        protocol: "file:",
        slashes: true
    }))
    win.show()
}


app.on("ready", createWindow)