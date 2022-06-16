import GetThemeColors from "./GetThemeColors";
import SetThemeColors from "./SetThemeColors";

const SwitchTheme = (theme, root) => {


    let colorThemes = [
        'main-background',
        'keypad-background',
        'screen-background',
        'toggle-background',
        'toggle',
        'text-color',
        'key-equall-background',
        'key-equall-hover',
        'key-equall-shadow',
        'key-equall-text',
        'key-del-background',
        'key-del-hover',
        'key-del-shadow',
        'key-del-text',
        'key-background',
        'key-hover',
        'key-shadow',
        'key-text'
    ]

    colorThemes.forEach(colorTheme => {
        let color = GetThemeColors(`theme-${theme}-${colorTheme}`, root);
        // set background color of the page
        SetThemeColors(colorTheme, color, root);
    });

    root = document.querySelector(':root');

    return {theme, root};
}
 
export default SwitchTheme;