bluetooth.onBluetoothConnected(function () {
    basic.showString("C")
    isConnected = true
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showString("D")
    isConnected = false
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    cmd = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    cmd = cmd.substr(0, cmd.length - 1)
})
let isConnected = false
let cmd = ""
bluetooth.startUartService()
cmd = ""
basic.forever(function () {
	
})
