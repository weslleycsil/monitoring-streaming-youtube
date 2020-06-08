const {app, BrowserWindow, ipcMain} = require('electron') // http://electronjs.org/docs/api
const path = require('path') // https://nodejs.org/api/path.html
const url = require('url') // https://nodejs.org/api/url.html

var ping = require('./ping') 

let window = null

// Wait until the app is ready
app.once('ready', () => {
  // Create a new window
  window = new BrowserWindow({
    // Set the initial width to 400px
    width: 400,
    // Set the initial height to 500px
    height: 500,
    // Don't show the window until it ready, this prevents any white flickering
    show: false,
    // Don't allow the window to be resized.
    resizable: false,
    webPreferences: {
        nodeIntegration: true,
    }
  })

  // Load a URL in the window to the local index.html path
  window.loadURL(url.format({
    pathname: path.join(__dirname+'/static/', 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Show window when page is ready
  window.once('ready-to-show', () => {
    window.show()
  })

    ipcMain.on('request-info-hosts', (event, arg) => {
        console.log("Recebido Hosts para solicitar infos",arg);
        var results = ping(arg);
        Promise.all(results)
        .then(resultads =>{
            var resultados = [];
            resultads.forEach(host => {
                resultados.push(host)
            });
            window.webContents.send('newDados',resultados);
            //console.log(resultados)
        })
    });

})
