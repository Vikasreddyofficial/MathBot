document.getElementById('send-button').addEventListener('click', sendMessage);

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== "") {
        appendMessage('user', userInput);
        document.getElementById('user-input').value = '';

        // Simulate bot response
        setTimeout(() => {
            appendMessage('bot', "This is a bot response.");
        }, 1000);
    }
}

function appendMessage(sender, message) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message', sender);

    const messageText = document.createElement('p');
    messageText.innerText = message;

    messageContainer.appendChild(messageText);
    document.getElementById('chat-messages').appendChild(messageContainer);

    // Scroll to the bottom of the chat
    document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
}
