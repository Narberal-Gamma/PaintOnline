import { IBrushProps } from "../types/tools/IBrush"
import Tool from "./Tool"

export default class Brush extends Tool {
    mouseDown: boolean = false

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string = '') {
        super(canvas, socket, id)
        this.listen()
    }

    listen() {
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true
        this.ctx?.beginPath()
        this.ctx?.moveTo(e.pageX - (e.target as HTMLCanvasElement).offsetLeft, e.pageY - (e.target as HTMLCanvasElement).offsetTop)
    }
    mouseUpHandler() {
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            id: this.id,
            method: 'draw',
            figure: {
                type: 'finish'
            }
        } as IBrushProps))
    }
    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown) {
            this.socket.send(JSON.stringify({
                id: this.id,
                method: 'draw',
                figure: {
                    type: 'brush',
                    x: e.pageX - (e.target as HTMLCanvasElement).offsetLeft,
                    y: e.pageY - (e.target as HTMLCanvasElement).offsetTop,
                    color: this.ctx.strokeStyle,
                    lineWidth: this.ctx.lineWidth
                },
            } as IBrushProps))
        }
    }

    static draw(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, lineWidth: number) {
        ctx.lineTo(x, y)
        ctx.strokeStyle = color
        ctx.lineWidth = lineWidth
        ctx.stroke()
    }
}