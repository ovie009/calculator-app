const GetThemeColors = (variableName, root) => {
    var rs = getComputedStyle(root);
    let variableValue = rs.getPropertyValue(`--${variableName}`);
    return variableValue;
}
 
export default GetThemeColors;