export const chatSocket = socket => {
  const chat = socket.of('/chat')

  chat.on('connection', () => {
    console.log('Client connected on /chat')
  })
}
