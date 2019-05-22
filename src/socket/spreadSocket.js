export const spreadSocket = socket => {
  const spread = socket.of('/spread')

  spread.on('connection', () => {
    console.log('Client connected on /spread')
  })
}
