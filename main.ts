//% weight=0 color=#3CB371 icon="\uf0ad"
namespace GameConsole{
    let nowSettingTarget = 0
    let dollhead = 0
    let dollbody = 0
    let settingmod = 0
    let x = 0
    let btnA = 0
    let btnB = 0
    let lastbtnA = 0
    let lastbtnB = 0
    let timer = 0
    let isTimeCount = 0

    /**
    * 搖桿的執行功能，捕捉A/B按鍵以及加速計的X軸，P0/P1做換裝的設定，震動送出換裝資訊
    */
    //% blockId="ConsoleExcue" block="console excue"
    //% blockGap=20 weight=75
    export function ConsoleExcue(): void {
        if (settingmod == 0) {
            if (input.pinIsPressed(TouchPin.P0)) {
                basic.showString("Head")
                basic.pause(500)
                settingmod = 1
                isTimeCount = 0
                timer = 300
                nowSettingTarget = 0
            } else {
                input.pinIsPressed(TouchPin.P1)) 
                basic.showString("Body")
                basic.pause(500)
                settingmod = 1
                isTimeCount = 0
                timer = 300
                nowSettingTarget = 1
            }
            
            if (input.buttonIsPressed(Button.A)) {
                btnA = 1
                basic.showString("A")
            }else {
                btnA = 0
            }
            if (input.buttonIsPressed(Button.B)) {
                btnB = 1
                basic.showString("B")
            }else {
                btnB = 0
            }

            if (btnA!=lastbtnA) {
                if(btnA > 0) {
                    serial.writeLine("btnA=1")
                }else {
                    serial.writeLine("btnA=0")
                    basic.clearScreen()
                }
                lastbtnA = btnA
            }
            if (btnB!=lastbtnB) {
                if(btnB > 0) {
                    serial.writeLine("btnB=1")
                }else {
                    serial.writeLine("btnB=0")
                    basic.clearScreen()
                }
                lastbtnB = btnB
            }
            
            serial.writeLine("pitch="+ input.rotation(Rotation.Pitch))
            serial.writeLine("roll=" input.rotation(Rotation.Roll))
            
        } else {
            if (input.buttonIsPressed(Button.A)) {
                if (isTimeCount == 0) {
                    isTimeCount = 1
                    basic.showNumber(dollhead + 1)
                } else {
                    isTimeCount = 1
                    timer = 30
                    if (nowSettingTarget == 0) {
                        dollhead = (dollhead + 1) % 3
                        basic.showNumber(dollhead + 1)
                    }
                }
            }
            
        }
        if (isTimeCount) {
            timer = timer - 1
            if (timer < 0) {
                isTimeCount = 0
                settingmod = 0
            }
            basic.pause(10)
        }
    }
}
