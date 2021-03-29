import { removeSpinnerTextless } from '../Utilities/Spinner'; 
import addCheckMark from '../Utilities/CheckMark';
import check_mark from "../images/check_mark.png";
import x_mark from "../images/x_mark.png";
import addErrorMessage from '../Utilities/ErrorMessage';


export const enableLogin = (button) => {
    removeSpinnerTextless(button);
    button.style.backgroundColor = "#32c671";
    addCheckMark(button, check_mark);
};

export const disableLogin = (button, buttonText, box, alertText) => {
    removeSpinnerTextless(button);
    const buttonColor = button.style.backgroundColor;
    const errorMessage = document.querySelector(".error-message");
    
    button.style.backgroundColor = "#f34336";
    addCheckMark(button, x_mark)

    if (box.contains(errorMessage) == false) {
        addErrorMessage(box, alertText);
    }
    
    setTimeout(() => {
        button.innerHTML = buttonText;
        button.style.backgroundColor = buttonColor;
    }, 2000);
}