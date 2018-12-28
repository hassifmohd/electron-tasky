const electron = require("electron");
const TimerTray = require("./app/timer_tray");
const MainWindow = require("./app/main_window");
const path = require("path");

const { app, ipcMain } = electron;

//its important to assign the class into variable.
//else the TimerTray class will be deleted by the garbage collector
let mainWindow;
let tray;

app.on("ready", () => {
  //hide the dock by default
  app.dock.hide();

  //initialize the browser
  mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);

  //initialize the tray icon and the tray object it self
  const iconName =
    process.platform == "win32" ? "windows-icon.png" : "iconTemplate.png";
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new TimerTray(iconPath, mainWindow);
});

//display time left at the tray, data come from the react app
ipcMain.on("update-timer", (event, timeLeft) => {
  tray.setTitle(timeLeft);
});
