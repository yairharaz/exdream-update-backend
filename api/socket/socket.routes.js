
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('booking', (sellerId)=> {  
            io.emit('update exp', 'booking')
            io.emit(sellerId)
        })
        socket.on('review', (sellerId)=> {  
            io.emit(sellerId)
        })
    })
}