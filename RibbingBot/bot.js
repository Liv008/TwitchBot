const tmi = require('tmi.js')

const options = {
  options: {
    debug: true,
  },

  connection: {
    reconnect: true,
  },

  identity: {
    username: '',
    password: ''
  },

  channels: [''],
}

const client = new tmi.client(options);

client.on('connected', onConnectedHandler)
client.on('message', onMessageHandler)
client.on('chat', onChatHandler)

client.connect()

let lastCallTime = 0;
const cooldownPeriod = 300000;


function randrand(num){
  return Math.floor(Math.random() * num);
}

function onMessageHandler (target, context, msg, self) {
  if (self) {return}

  const commandName = msg.trim();

  if (commandName === '!test') {
    client.say(target, `Test passed!`)
  }

  if (commandName === '!hello') {
    client.say(target, `Welcome ${context.username}!`)
  }

}


function onChatHandler(target, context, msg, self){
  const currentTime = Date.now()
  
  if (currentTime - lastCallTime >= cooldownPeriod) {
    if (self) {return}

    var str = msg.split(' ')
    str[randrand(str.length)] = 'ribbit'
    const out = str.join(' ')
    client.say(target, `${out}`)
    
    lastCallTime = currentTime

  } else {return}

}


function onConnectedHandler(address, port, target){
  client.say(target, 'Ribbit! Froggie on the pond!')
  console.log(`* Connected to ${address} : ${port}`)
}
