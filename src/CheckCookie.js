import GetCookie from "./GetCookie";
import SetCookie from "./SetCookie";
import SwitchTheme from "./SwitchTheme";

const CheckCookie = (root) => {
    // get cookie value of theme
    let theme = GetCookie("theme");
    // if cookie has not being set before
    if (theme === "") {
        // let default theme be equall to darkMode
        theme = '1';
        // console.log('running');
        // set cookie
        SetCookie('theme', theme, 30);
    }
    
    // if (theme == '1') {
    //     setTheme1(true)
    //     setTheme2(false)
    //     setTheme3(false)
    // } else if (theme == '2') {
    //     setTheme1(false)
    //     setTheme2(true)
    //     setTheme3(false)
    // } else if (theme == '3'){
    //     setTheme1(false)
    //     setTheme2(false)
    //     setTheme3(true)
    // }
    
    return SwitchTheme(theme, root);
}
 
export default CheckCookie;