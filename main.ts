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
    * P0/P1做換裝的設定
    */
    //% blockId="SettingRuntime" block="Setting Runtime"
    //% blockGap=20 weight=75
    export function SettingRuntime(): void {
        if (settingmod == 0) {
            if (input.pinIsPressed(TouchPin.P0)) {
                basic.creanScreen()
                basic.showString("Head")
                settingmod = 1
                isTimeCount = 0
                timer = 300
                nowSettingTarget = 0
            } else if (input.pinIsPressed(TouchPin.P1)) {
                basic.creanScreen()
                basic.showString("Body")
                settingmod = 1
                isTimeCount = 0
                timer = 100
                nowSettingTarget = 1
            }
            
        } else {
            if (input.buttonIsPressed(Button.A)) {
                if (isTimeCount == 0) {
                    isTimeCount = 1
                    if (nowSettingTarget == 0) {
                        basic.showNumber(dollhead + 1)
                    }else if (nowSettingTarget == 1) {
                        basic.showNumber(dollbody + 1)
                    }
                } else {
                    isTimeCount = 1
                    timer = 100
                    if (nowSettingTarget == 0) {
                        dollhead = (dollhead + 1) % 3
                        basic.showNumber(dollhead + 1)
                    }
                    if (nowSettingTarget == 1) {
                        dollbody = (dollbody + 1) % 3
                        basic.showNumber(dollbody + 1)
                    }
                }
            }
            
        }
        if (isTimeCount) {
            timer = timer - 1
            if (timer < 0) {
                basic.showIcon(IconNames.Heart)
                isTimeCount = 0
                settingmod = 0
            }
            basic.pause(10)
        }
    }
    /**
    * 搖桿的執行功能，捕捉A/B按鍵以及加速計的X軸
    */
    //% blockId="ConsoleExcue" block="console excue"
    //% blockGap=20 weight=75
    export function ConsoleExcue(): void {
        if (input.buttonIsPressed(Button.A)) {
            btnA = 1
            basic.showString("A")
            serial.writeLine("btnA=1")
        }else {
            btnA = 0
        }
        if (input.buttonIsPressed(Button.B)) {
            btnB = 1
            basic.showString("B")
            serial.writeLine("btnB=1")
        }else {
            btnB = 0
        }
        if (btnA!=lastbtnA) {
            if(btnA > 0) {
                
            }else {
                basic.clearScreen()
            }
            lastbtnA = btnA
        }
        if (btnB!=lastbtnB) {
            if(btnB > 0) {
                
            }else {
                basic.clearScreen()
            }
            lastbtnB = btnB
        }

        serial.writeLine("pitch=" + input.rotation(Rotation.Pitch))
        serial.writeLine("roll=" + input.rotation(Rotation.Roll))
    }

    /**
    * 送出換裝資訊
    */
    //% blockId="SettingOutput" block="Setting Output"
    //% blockGap=20 weight=75
    export function SettingOutput(): void {
        serial.writeLine("dollhead=" + dollhead)
        serial.writeLine("dollbody=" + dollbody)
    }
}
