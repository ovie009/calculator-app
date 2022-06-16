import SwitchTheme from "./SwitchTheme";

const SetCookie = (cname, cvalue, exdays, root) => {
    console.log(cname);
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

    return SwitchTheme(cvalue, root);
}
 
export default SetCookie;