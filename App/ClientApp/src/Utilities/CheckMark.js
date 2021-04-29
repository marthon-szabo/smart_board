// import check_mark from "../images/check_mark.png";

const addCheckMark = (element, url) => {
    const checkMark = document.createElement("img");
    checkMark.src = url;
    checkMark.className = "check-mark";

    element.innerHtml = "";
    element.appendChild(checkMark);
}

export default addCheckMark;
