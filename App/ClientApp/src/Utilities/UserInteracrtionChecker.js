import { removeSpinnerTextless } from '../Utilities/Spinner'; 
import addCheckMark from '../Utilities/CheckMark';
import check_mark from "../images/check_mark.png";
import x_mark from "../images/x_mark.png";


export const enableLogin = (button) => {
    removeSpinnerTextless(button);
    addCheckMark(button, check_mark);
    setTimeout(() => {
        window.location.href = "https://localhost:5001/profile";
    }, 1000);

};

export const disableLogin = (button, buttonText) => {
    removeSpinnerTextless(button);
    addCheckMark(button, x_mark)
    alert('Invalid username or password! Please try it again.');
    setTimeout(() => {
        button.innerHTML = buttonText;
    }, 2000);
}