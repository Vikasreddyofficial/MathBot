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
        fetch('/chat/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': document.querySelector('input[name="csrfmiddlewaretoken"]').value
            },
            body: new URLSearchParams({
                'message': 'I am a school-going student, please restrict to the task of solving math-related problems. I request to give the answer in detailed steps.'
            })
        })
        .then(response => response.json())
        .then(data => {
            const newMessage = document.createElement('li');
            newMessage.textContent = 'Response: ' + data.response;
            responseDiv.appendChild(newMessage);
            startButton.style.display = 'none';
            enableChat();
        })
        .catch(error => console.error('Error:', error));
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
