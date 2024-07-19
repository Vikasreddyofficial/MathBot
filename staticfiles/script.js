document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('chat-form');
    const messageInput = document.getElementById('message');
    const responseDiv = document.getElementById('response');
    const startButton = document.getElementById('start-button');

    function enableChat() {
        messageInput.removeAttribute('disabled');
        form.querySelector('.input-group-btn > .btn').removeAttribute('disabled');
        messageInput.focus();
    }

    startButton.addEventListener('click', function() {
        responseDiv.textContent = 'Hey, I\'m here to help with math problems';
        startButton.style.display = 'none';
        enableChat();
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const message = messageInput.value;

        fetch('/chat/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': document.querySelector('input[name="csrfmiddlewaretoken"]').value
            },
            body: new URLSearchParams({
                'message': message
            })
        })
        .then(response => response.json())
        .then(data => {
            const newMessage = document.createElement('li');
            newMessage.textContent = 'Response: ' + data.response;
            responseDiv.appendChild(newMessage);
            form.reset();  // Clear the form fields after submission
        })
        .catch(error => console.error('Error:', error));
    });

    // Initially disable the input and send button
    messageInput.setAttribute('disabled', 'disabled');
    form.querySelector('.input-group-btn > .btn').setAttribute('disabled', 'disabled');
});
