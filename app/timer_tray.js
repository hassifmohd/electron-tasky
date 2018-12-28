const electron = require("electron");
const { Tray, app, Menu } = electron;

class TimerTray extends Tray {

    //constructor
  constructor(iconPath, mainWindow) {

    super(iconPath); //our Tray parent class require icon path. so we pass it back

    this.mainWindow = mainWindow;

    this.setToolTip('Timer App');

    this.on("click", this.onClick.bind(this)); //binding onclick event into a custom function

    this.on("right-click", this.onRightClick.bind(this));
  }

  onClick(event, bounds) {
    // console.log(bounds.x, bounds.y); //this will show X&Y position of the tray icon

    //init
    const { x, y } = bounds;
    const { height, width } = this.mainWindow.getBounds();

    //toggle to show/hide the mainWindow when we click the tray icon
    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      //when user click and display the mainWindow. we position the mainWindow nearby the tray icon
      if (process.platform == "win32") {
        this.mainWindow.setBounds({
          x: x - width / 2,
          y: y - height,
          height,
          width
        });
      } else {
        this.mainWindow.setBounds({
          x: x - width / 2,
          y: y + 30,
          height,
          width
        });
      }

      this.mainWindow.show();
    }
  }

  onRightClick() {
      const menuConfig = Menu.buildFromTemplate([
          {
              label: 'Quit',
              click: () => app.quit()
          }
      ]);

      this.popUpContextMenu(menuConfig);
  }
}

module.exports = TimerTray;
