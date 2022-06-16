const SetThemeColors = (variableName, variableValue, root) => {
    // Set the value of variable --blue to another value (in this case "lightblue")
    return root.style.setProperty(`--${variableName}`, variableValue);
}
 
export default SetThemeColors;