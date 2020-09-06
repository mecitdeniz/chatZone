const chatForm =  document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages')
const socket = io();

// Get username and room from URL
const username  = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

console.log(username);
socket.on('message',(msg)=>{
    outputMessage(msg);
    console.log(msg)
    //Scroll down end to the chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

//Message submit
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    //Get message text
    const msg = e.target.elements.msg.value;
    socket.emit('chat-message',msg);

    //Clear input

    e.target.elements.msg.value = '';
    e.target.elements.msg.focus;

})

//Output message

function outputMessage(msg){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${msg.username} <span>${msg.time}</span></p>
    <p class="text">
        ${msg.text}
    </p>`
    document.querySelector('.chat-messages').appendChild(div);
}