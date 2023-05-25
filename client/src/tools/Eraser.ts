import Brush from "./Brush";

export default class Eraser extends Brush {

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        super(canvas, socket, id)
        this.listen()
        this.cursorType(`url(./src/assets/images/eraser-cursor.png), auto`)
    }

    draw(x: number, y: number) {
        this.ctx.rect(x, y, 32, 32)
        this.ctx.fill()
    }
}
