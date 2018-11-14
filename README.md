# Electron Windows Badge

Electron Windows Badge plugin to access and modify the badge text of the app icon in windows.

<p align="center">
  <img src='demo.gif' alt='demo'/>
</p>

## Installation
  $ npm i electron-windows-badge --save

## Usage

    1) Require electron-windows-badge in your main process:
        const { Badge } = require('electron-windows-badge');

    2) Initialize new object of badge while creating window:
        function createWindow () {
            win = new BrowserWindow({width: 800, height: 600});
            const badgeOptions = {}
            myBadge = new Badge(win, badgeOptions);
        }

    3) To update the badge you just need to call:
        From the renderer process: ipcRenderer.sendSync('update-badge', 1);
        Or from the main process: myBadge.update(1);

    4) To remove badge just call:
        From the renderer process: ipcRenderer.sendSync('update-badge', null);
        Or from the main process: myBadge.update(null);

## API

**Badge options**

| Option Name           | Default Value               | Description |
| --------------------- | ----------------------------| ----------- |
| `fontColor `          | 'white'                     | Font color |
| `font `               | '256px Segoe UI'            | Font style |
| `color `              | 'rgba(255, 75, 60, 0.95)'   | The color of badge |
| `shadowColor `        | 'rgba(128, 128, 128, 0.25)' | The color of badge shadow |
| `border`              | 10                          | The border around the icon content |
| `radius`              | 120                         | The radius of badge |
| `shadowRadius`        | 128                         | The radius of badge shadow |
| `shadowBlur`          | 8                           | The blur length for the badge shadow |
| `textScale`           | 0.6                         | How much to scale the text |
| `textOffset`          | {x: 0, y: -17}              | How much to offset the text |

## License

[MIT](LICENSE)
