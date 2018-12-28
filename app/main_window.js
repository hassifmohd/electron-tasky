const electron = require("electron");
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
  //init
  constructor($url) {
    //pass default window config
    super({
      height: 500,
      width: 300,
      frame: false,
      resizable: false,
      show: false, //set the window to be hidden by default
      webPreferences: {
        //if we not focus on the app. resource will be limited.
        //so here is to dont limit the app
        backgroundThrottling: false
      }
    });

    //load URL
    this.loadURL($url);

    //setting up event handler
    this.on("blur", this.onBlur.bind(this));
  }

  //when user not focusing on this app. we will hide it
  onBlur() {
    this.hide();
  }
}

module.exports = MainWindow;
