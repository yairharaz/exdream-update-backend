
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('booking', ({sellerId, buyer})=> {
            io.emit('update exp', 'booking')
            io.emit(sellerId , buyer)

        })
    })
}