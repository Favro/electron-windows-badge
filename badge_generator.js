"use strict";
module.exports = class BadgeGenerator {
	constructor(window, options = {}) {
		const defaultOptions = {
			fontColor: "white",
			font: "256px Segoe UI",
			shadowColor: "rgba(128, 128, 128, 0.25)",
			color: "rgba(255, 75, 60, 0.95)",
			border: 10,
			radius: 120,
			shadowRadius: 128,
			shadowBlur: 8,
			textScale: 0.6,
			textOffset: { x: 0, y: -17 },
		};

		this.window = window;
		this.options = Object.assign(defaultOptions, options);
		this.window.webContents.executeJavaScript(`window.eletronWindowBagdeDraw = function ${BadgeGenerator.drawBadge}`);
	}

	generate(badgeText) {
		const options = JSON.stringify(this.options);
		return this.window.webContents.executeJavaScript(`window.eletronWindowBagdeDraw("${badgeText}", ${options});`);
	}

	static drawBadge(badgeText, options) {
		let shadowRadius = options.shadowRadius;
		let radius = options.radius;
		let canvas = document.createElement("canvas");
		let width = Math.ceil((shadowRadius + options.border) * 2);
		let height = Math.ceil((shadowRadius + options.border) * 2);
		let center = width / 2;
		let context = canvas.getContext("2d");

		canvas.width = width;
		canvas.height = height;

		context.clearRect(0, 0, width, height);

		context.fillStyle = options.shadowColor;
		context.filter = `blur(${options.shadowBlur}px)`;
		context.beginPath();
		context.arc(center, center, shadowRadius, 0, Math.PI * 2);
		context.fill();
		context.filter = "none";

		context.beginPath();
		context.globalCompositeOperation = "destination-out";
		context.fillStyle = "rgba(0,0,0,1)";
		context.arc(center, center, radius, 0, Math.PI * 2);
		context.fill();

		context.globalCompositeOperation = "source-over";

		context.fillStyle = options.color;
		context.beginPath();
		context.arc(center, center, radius, 0, Math.PI * 2);
		context.fill();

		context.font = options.font;
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.fillStyle = options.fontColor;

		let fontSize = Number(/[0-9\.]+/.exec(context.font)[0]);

		let measure = context.measureText(badgeText);
		let fontScale = Math.min((radius * 2 / measure.width) * options.textScale, (radius * 2 / fontSize) * options.textScale);

		context.setTransform(fontScale, 0, 0, fontScale, center, center);
		context.fillText(badgeText, options.textOffset.x, options.textOffset.y);
		context.setTransform(1, 0, 0, 1, 0, 0);

		return canvas.toDataURL();
	}
}
