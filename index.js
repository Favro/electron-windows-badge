"use strict";

const { nativeImage, ipcMain } = require("electron");
const BadgeGenerator = require("./badge_generator.js");

class Badge {
	constructor(window, options = {}) {
		this.window = window;
		this.options = options;
		this.generator = new BadgeGenerator(window, options);
		this.initListeners();
	}

	update(badgeText, badgeDescription = "New notification") {
		if (badgeText) {
			this.generator.generate(badgeText).then((base64) => {
				const image = nativeImage.createFromDataURL(base64);
				this.window.setOverlayIcon(image, badgeDescription);
			});
		} else {
			this.window.setOverlayIcon(null, badgeDescription);
		}
	}

	initListeners() {
		ipcMain.on("update-badge", (event, badgeText) => {
			this.update(badgeText);
			event.returnValue = "success";
		});
	}
}

module.exports = { Badge };
