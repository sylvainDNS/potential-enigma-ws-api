export const chatSocket = socket => {
  const chat = socket.of('/chat')

  chat.on('connection', clientSocket => {
    console.log('Client connected on /chat')

    clientSocket.on('send', message => {
      clientSocket.broadcast.emit('receive', message)
    })
  })
}
