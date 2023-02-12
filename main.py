def on_bluetooth_connected():
    global isConnected
    basic.show_string("C")
    isConnected = True
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

def on_bluetooth_disconnected():
    global isConnected
    basic.show_string("D")
    isConnected = False
bluetooth.on_bluetooth_disconnected(on_bluetooth_disconnected)

def on_button_pressed_a():
    basic.show_string(cmd)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_uart_data_received():
    global cmd
    cmd = bluetooth.uart_read_until(serial.delimiters(Delimiters.NEW_LINE))
    cmd = cmd.substr(0, len(cmd) - 1)
bluetooth.on_uart_data_received(serial.delimiters(Delimiters.NEW_LINE),
    on_uart_data_received)

isConnected = False
cmd = ""
bluetooth.start_uart_service()
cmd = ""

def on_forever():
    pass
basic.forever(on_forever)
