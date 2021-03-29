const addErrorMessage = (element, content) => {
    const errorColor = "#f34336";
    const message = document.createElement("p");

    message.className = "error-message";
    message.style.color = errorColor;
    message.innerText = `*${content}`;
    message.style.fontSize = "1.125em";
    message.style.fontStyle = "italic";

    element.appendChild(message);
}

export default addErrorMessage;