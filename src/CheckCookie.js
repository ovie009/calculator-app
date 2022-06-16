import GetCookie from "./GetCookie";
import SetCookie from "./SetCookie";
import SwitchTheme from "./SwitchTheme";

const CheckCookie = (root) => {
    // get cookie value of theme
    let theme = GetCookie("theme");
    if (theme === "") {
        // let default theme be equall to darkMode
        theme = '1';
        SetCookie('theme', theme, 30);
    }
    return SwitchTheme(theme, root);
}
 
export default CheckCookie;