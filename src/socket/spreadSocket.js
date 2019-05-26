export const spreadSocket = socket => {
  const spread = socket.of('/spread')

  spread.on('connection', () => {
    console.log('Client connected on /spread')
  })
}

export const emitGameId = (socket, event, game) => {
  socket.of('/spread').emit(event, game.game_id)
  return game
}
