function switchTheme() {
    theme = getCookie('theme');

    if (theme === 'darkMode') { // if its currently on dark mode
        theme = 'lightMode'; // set theme controller variable as 'lightMode'
        themeIcon.src = 'images/icon-moon.svg';
        headerImg.src = 'images/bg-mobile-light.jpg';
    } else {
        theme = 'darkMode'; // set theme controller variable as 'darkMode'
        themeIcon.src = 'images/icon-sun.svg';
        headerImg.src = 'images/bg-mobile-dark.jpg';
    }
    
    setThemeColors(theme);
    setCookie('theme', theme, 30);
    
    console.log(getCookie('theme'));
}

function setThemeColors(theme) {
    // select background color of desired theme
    background = myFunction_get(`${theme}Background`);
    // set background color of the page
    myFunction_set('Background', background);
    
    // select elements color of desired theme
    elements = myFunction_get(`${theme}Elements`);
    // set elements color of the page
    myFunction_set('Elements', elements);
    
    // select outline color of desired theme
    outline = myFunction_get(`${theme}Outline`);
    // set outline color of the page
    myFunction_set('Outline', outline);
    
    // select text1 color of desired theme
    text1 = myFunction_get(`${theme}Text1`);
    // set text1 color of the page
    myFunction_set('Text1', text1);
    
    // select text2 color of desired theme
    text2 = myFunction_get(`${theme}Text2`);
    // set text2 color of the page
    myFunction_set('Text2', text2);
    
    // select text3 color of desired theme
    text3 = myFunction_get(`${theme}Text3`);
    // set text3 color of the page
    myFunction_set('Text3', text3);
    
}

// Create a function for getting a variable value
function myFunction_get(variableName) {
  // Get the styles (properties and values) for the root
  var rs = getComputedStyle(r);
  let variableValue = rs.getPropertyValue(`--${variableName}`);
  return variableValue;
}

// Create a function for setting a variable value
function myFunction_set(variableName, variableValue) {
  // Set the value of variable --blue to another value (in this case "lightblue")
  r.style.setProperty(`--${variableName}`, variableValue);
}

// function to setCookie
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// functionto get cookie
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

// functionto check cookie
function checkCookie() {
    // get cookie value of theme
    let theme = getCookie("theme");
    // if cookie has not being set before
    if (theme == "") {
        // let default theme be equall to darkMode
        theme = '1';
        // console.log('running');
        // set cookie
        setCookie('theme', theme, 30)
    }
    // setTheme colors
    setThemeColors(theme);
    
    if (theme === '2') {

    }

    if (theme === '3') {

    }
}

// check for cookies
checkCookie();