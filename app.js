let isOnline = false;
let pubKey = window.localStorage.getItem('publicKey');
let lastChatId = window.localStorage.getItem('lastChatId');
let currentChatId = window.localStorage.getItem('lastChatId');
let sendButton = document.getElementById('chat_submit');
let chatWindow = document.getElementById('chat');
let chatData;
let message = document.getElementById('chat_input');

let contacts = [
    {
        publicKey: "contact 1"
    },
    {
        publicKey: "contact 2"
    }
];

let contactBtn = document.getElementsByClassName('contactBtn');


function makeId() {
    let newPubKey = '';
    let characters = "abcdefghijklmnopqrstuvwxyz-!@_//$1234567890";
    for (let i = 0; i < 12; i++) {
        newPubKey += characters.charAt(Math.floor(Math.random() * 36));
    }
    window.localStorage.setItem('publicKey', newPubKey);
}

function renderMessages() {
    for (let i = 0; i < chatData.length; i++) {
        if (chatData[i].sender === 'you') {
            chatWindow.insertAdjacentHTML('beforeend', `
        <div class="chat-row chat-row__you">
          <div class="chat-bubble__container">
            <p class="chat-bubble you brdr__radius box-shadow">
              ${chatData[i].text}
            </p>
            <p class="name-tag name-tag__you">you</p>
          </div>
        </div>
            `)
        } else if (chatData[i].sender === lastChatId) {
            chatWindow.insertAdjacentHTML('beforeend', `
         <div class="chat-row chat-row__them">
          <div class="chat-bubble__container">
            <p class="chat-bubble them brdr__radius box-shadow">
                ${chatData[i].text}
            </p>
            <p class="name-tag name-tag__them">${chatData[i].sender}
        </div>
            `)
        }
    }
}


function renderContacts() {
    let contactList = document.getElementById('contact_list');
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].publicKey === lastChatId) {
            contactList.insertAdjacentHTML('beforeend', `
            <li><button id="${contacts[i].publicKey}" class="contactBtn brdr__radius box-shadow no__border contactBtn_active">${contacts[i].publicKey}</button></li>
        `)
        } else {
            contactList.insertAdjacentHTML('beforeend', `
            <li><button id="${contacts[i].publicKey}" class="contactBtn brdr__radius box-shadow no__border">${contacts[i].publicKey}</button></li>`)
        }
        contactBtn[i].addEventListener('click', () => {
            setLastChatId(contacts[i].publicKey);
        })
    }
}

function addMsg() {
    chatWindow.insertAdjacentHTML('beforeend', `
        <div class="chat-row chat-row__you">
          <div class="chat-bubble__container">
            <p class="chat-bubble you brdr__radius box-shadow">
              ${chatData[chatData.length - 1].text}
            </p>
            <p class="name-tag name-tag__you">you</p>
          </div>
        </div>`
    );
}


function setLastChatId(contactId) {
    lastChatId = contactId;
    window.localStorage.setItem('lastChatId', contactId);
    window.location.reload();
}


sendButton.addEventListener('click', () => {
    chatData = [...chatData, {
        sender: "you",
        text: message.value
    }];
    window.localStorage.setItem(lastChatId, JSON.stringify(chatData));
    addMsg()
    message.value = " ";
});

message.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        chatData = [...chatData, {
            sender: "you",
            text: message.value
        }];
        window.localStorage.setItem(lastChatId, JSON.stringify(chatData));
        addMsg()
        message.value = " ";
    }
})


window.onload = () => {
    isOnline = true;
    chatData = window.localStorage.getItem(lastChatId);
    if (pubKey !== null) {
        chatData = JSON.parse(chatData);
        renderContacts()
        if (chatData !== null) {
            renderMessages();
        } else {
            chatData = [];
        }
        console.log(isOnline)
        console.log(pubKey)
    } else {
        makeId();
    }
};

