const { app, BrowserWindow } = require('electron');

app.on('ready', function () {

    let win = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('index.html').then((r) => {
        var impressoras = win.webContents.getPrinters();

        win.webContents.isDevToolsOpened();

        console.log(impressoras);

        var impDefault = impressoras.filter(x => x.isDefault === true);
    
        const options = { 
            silent: true,  
            deviceName: impDefault[0].name 
        };
        
        win.webContents.print(options, (success, errorType) => {
            if (!success) 
                console.log(errorType);

            win.close();
          });
    });
});