import { Injectable } from "@angular/core";
import { ThemeEnum } from "../model/enums/theme";

@Injectable({
	providedIn: "root",
})
export class ThemeService {
	constructor() {}

	toggleTheme() {
		if (document.body.classList.contains(ThemeEnum.LIGHT)) {
			this.applyTheme(ThemeEnum.DARK);
		} else {
			this.applyTheme(ThemeEnum.LIGHT);
		}
	}

	applyTheme(theme: ThemeEnum) {
		if (theme == ThemeEnum.DARK) {
			document.body.classList.remove(ThemeEnum.LIGHT);
			document.body.classList.add(ThemeEnum.DARK);
		} else {
			document.body.classList.remove(ThemeEnum.DARK);
			document.body.classList.add(ThemeEnum.LIGHT);
		}
		// TODO save theme on user mobile
	}

	initTheme() {
        //TODO retrieve theme from mobile save
		let theme = undefined
		if (!this.isValidTheme(theme)) {
			theme = ThemeEnum.LIGHT;
		}

		this.applyTheme(theme);
	}

	isValidTheme(theme: ThemeEnum | undefined) {
		return theme == ThemeEnum.LIGHT || theme == ThemeEnum.DARK;
	}
}
