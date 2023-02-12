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
function RPS () {
    while (!(input.buttonIsPressed(Button.B))) {
        if (input.isGesture(Gesture.Shake)) {
            RPS_hand = randint(1, 3)
            if (RPS_hand == 1) {
                basic.showIcon(IconNames.SmallSquare)
            } else if (RPS_hand == 2) {
                basic.showIcon(IconNames.Square)
            } else {
                basic.showIcon(IconNames.Scissors)
            }
        }
    }
    bluetooth.uartWriteLine("GAME OVER!")
    basic.showIcon(IconNames.Yes)
}
let RPS_hand = 0
let isConnected = false
let cmd = ""
bluetooth.startUartService()
cmd = ""
basic.forever(function () {
    if (isConnected) {
        if (cmd == "HI!") {
            bluetooth.uartWriteLine("HELLO!")
            basic.showIcon(IconNames.Happy)
        } else if (cmd == "TEMP") {
            bluetooth.uartWriteNumber(input.temperature())
            basic.showNumber(input.temperature())
        } else if (cmd == "RPS") {
            RPS()
        } else {
            if (!(cmd.isEmpty())) {
                bluetooth.uartWriteLine("INVALID")
            }
        }
    }
    cmd = ""
})
