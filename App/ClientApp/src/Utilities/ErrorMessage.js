const addErrorMessage = (element, content) => {
    const errorColor = "#f34336";
    const message = document.createElement("p");

    message.style.color = errorColor;
    message.text = content;

    element.appendChild(message);
}

export default addErrorMessage;