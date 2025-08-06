import { Injectable } from "@angular/core";
import { ThemeEnum } from "../model/enums/theme";
import { Preferences } from "@capacitor/preferences";

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

    async applyTheme(theme: ThemeEnum) {
        if (theme == ThemeEnum.DARK) {
            document.body.classList.remove(ThemeEnum.LIGHT);
            document.body.classList.add(ThemeEnum.DARK);
        } else {
            document.body.classList.remove(ThemeEnum.DARK);
            document.body.classList.add(ThemeEnum.LIGHT);
        }

        await Preferences.set({
            key: "theme",
            value: "dark",
        });
    }

    async initTheme() {
        let theme = (await Preferences.get({ key: "theme" })).value as ThemeEnum;

        if (!this.isValidTheme(theme)) {
            theme = ThemeEnum.LIGHT;
        }

        this.applyTheme(theme);
    }

    isValidTheme(theme: ThemeEnum | undefined) {
        return theme == ThemeEnum.LIGHT || theme == ThemeEnum.DARK;
    }
}
