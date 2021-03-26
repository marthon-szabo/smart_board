export const addSpinner = (element) => {
    const spinnerDiv = document.createElement("div");
    
    spinnerDiv.className = "spinner-border";
    spinnerDiv.setAttribute("role", "status");

    element.innerHTML = "";
    element.appendChild(spinnerDiv);
}

export const removeSpinnerTextless = (element) => {
    const spinner = document.querySelector(".spinner-border");
    element.removeChild(spinner);
}

export const removeSpinner = (element, originalText) => {
    removeSpinnerTextless(element);

    element.innerHTML = originalText;
}
