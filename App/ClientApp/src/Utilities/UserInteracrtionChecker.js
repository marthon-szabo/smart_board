import { removeSpinnerTextless } from '../Utilities/Spinner'; 
import addCheckMark from '../Utilities/CheckMark';
import check_mark from "../images/check_mark.png";
import x_mark from "../images/x_mark.png";


export const enableLogin = (button) => {
    removeSpinnerTextless(button);
    button.style.backgroundColor = "#32c671";
    addCheckMark(button, check_mark);
    setTimeout(() => {
        window.location.href = "https://localhost:5001/profile";
    }, 1000);

};

export const disableLogin = (button, buttonText, alertText = 'Invalid username or password! Please try it again.') => {
    removeSpinnerTextless(button);
    const buttonColor = button.style.backgroundColor;
    button.style.backgroundColor = "#f34336";
    addCheckMark(button, x_mark)
    alert(alertText);
    setTimeout(() => {
        button.innerHTML = buttonText;
        button.style.backgroundColor = buttonColor;
    }, 2000);
}