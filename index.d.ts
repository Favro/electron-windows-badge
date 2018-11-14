export interface BadgeOptions {
	fontColor?: string, // "white"
	font?: string, // "256px Segoe UI"
	color?: string, // "rgba(255, 75, 60, 0.95)"
	shadowColor?: string, // "rgba(128, 128, 128, 0.25)"
	border?: number, // 10
	radius?: number, // 120
	shadowRadius?: number, // 128
	shadowBlur?: number, // 8
	textScale?: number, // 0.6
	textOffset?: { x: number, y: number }, // { x: 0, y: -17 }
}

export class Badge {
	constructor(window: any, options: BadgeOptions);
	update(badgeText: string, badgeDescription?: string);
}
