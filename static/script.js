document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('chat-form');
    const messageInput = document.getElementById('message');
    const responseDiv = document.getElementById('response');
    const startButton = document.getElementById('start-button');

    function enableChat() {
        messageInput.style.pointerEvents = 'auto';
        messageInput.style.opacity = '1';
        form.querySelector('.input-group-btn > .btn').style.pointerEvents = 'auto';
        form.querySelector('.input-group-btn > .btn').style.opacity = '1';
        messageInput.focus();
    }

    startButton.addEventListener('click', function() {
        // Print "Hi" to the responseDiv
        const newMessage = document.createElement('li');
        newMessage.className = 'bot-message'; // Add class for bot message

        const botText = document.createElement('span');
        botText.textContent = 'Bot: Hi, I’m here to help with math problems';

        newMessage.appendChild(botText);
        responseDiv.appendChild(newMessage);

        // Hide the start button and enable the chat
        startButton.style.display = 'none';
        enableChat();
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const message = messageInput.value;

        // Create and display the user's message
        const userMessage = document.createElement('li');
        userMessage.textContent = 'You: ' + message;
        userMessage.className = 'user-message';
        responseDiv.appendChild(userMessage);

        fetch('/chat/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': document.querySelector('input[name="csrfmiddlewaretoken"]').value
            },
            body: JSON.stringify({
                'message': message
            })
        })
        .then(response => response.json())
        .then(data => {
            // Create and display the bot's response
            const botMessage = document.createElement('li');
            botMessage.className = 'bot-message'; // Add class for bot message

            const botText = document.createElement('span');
            botText.innerHTML = 'Bot: <br>' + data.response.replace(/\n/g, '<br>'); // Convert new lines to <br>

            botMessage.appendChild(botText);
            responseDiv.appendChild(botMessage);
            messageInput.value = '';
        })
        .catch(error => console.error('Error:', error));
    });

    // Initially disable the input and send button
    messageInput.style.pointerEvents = 'none';
    messageInput.style.opacity = '0.5';
    form.querySelector('.input-group-btn > .btn').style.pointerEvents = 'none';
    form.querySelector('.input-group-btn > .btn').style.opacity = '0.5';
});
