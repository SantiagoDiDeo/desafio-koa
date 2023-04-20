const logger = require("../logger/logger");
const io = require('socket.io');

const socket = io.connect();

const userEmail = document.getElementById('userEmail');
const userName = document.getElementById('userName');
const userSurname = document.getElementById('userSurname');
const userAge = document.getElementById('userAge');
const userNickname = document.getElementById('userNickname');
const userAvatar = document.getElementById('userAvatar');
const userMensaje = document.getElementById('userMensaje');

const myButton = document.getElementById('logout');
myButton.addEventListener('click',  () => {
  try {
    window.location.href = '/logout';
    return;
  } catch (err) {
    logger.error(Error('err'));
    console.log(`ERRORRRR ${err}`);
  };

});

socket.on('connect', () => {
    logger.info('connected');
});

//agregar nuevo producto
let formulario = document.getElementById('form');

const formAddE = async () => {

    formulario = await formulario.addEventListener('submit',  e => {
        e.preventDefault();
        const product = {
            "title": title.value,
            "price": price.value,
            "thumbnail": thumbnail.value
        };
         socket.emit('newProduct', product);
        
        });

};




//lista productos
socket.on('products',  (data) => {
    
    let htmlToRender = `
  <table class="table container">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Precio</th>
        <th scope="col">Foto</th>
      </tr>
    </thead>
    </tbody>`;
   
    data.forEach(( element) => {
        htmlToRender = htmlToRender + `
        <tr>
          <th scope="row">${element.id}</th>
          <td>${element.title}</td>
          <td>${element.price}</td>
          <td><img src=${element.thumbnail} style="max-width: 50px; height: auto;"</td>
        </tr>` 
    
    });
    htmlToRender = htmlToRender + '</tbody></table>';
    document.getElementById('tableProducts').innerHTML = htmlToRender;
});




//chat
socket.on('chat', async (data) => {
        
    htmlToRender = '';
    await data.forEach((element) => {

        htmlToRender = htmlToRender + `
        <tr>
            <th><h1 class='user'>${element.email}</h1></th>
            <th><h1 class='mensaje'>${element.message}</h1></th>
            <th><h1 class='date'>${element.date}</h1></th>
        </tr>
        `
    });

    document.getElementById('message').innerHTML = htmlToRender;
    });
    

    const validateEmail = (mail) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
      if (regex.test(mail)) {
        return true; 
      } else {
        alert("El mail ingresado no es válido."); 
        return false;
      };
    };
  
  const addMessage = async () => {
 
    let messageToAdd =  {
      author: {
        id: userEmail.value,
        name: userName.value,
        usersurname: userSurname.value,
        age: userAge.value,
        nickname: userNickname.value,
        avatar: userAvatar.value
      },
      text: userMensaje.value
    };
    
    userMensaje.value = '';


if(validateEmail(messageToAdd.author.id)) {

   await socket.emit('newMessage', messageToAdd);
  };
};
