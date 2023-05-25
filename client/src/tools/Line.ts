import { ILineProps } from "../types/tools/ILine";
import Tool from "./Tool";


export default class Line extends Tool {
    mouseDown: boolean = false;
    currentX: number = 0;
    currentY: number = 0;
    lastX: number = 0;
    lastY: number = 0;
    saved: string = ''

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
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
        this.currentX = e.pageX - (e.target as HTMLCanvasElement).offsetLeft
        this.currentY = e.pageY - (e.target as HTMLCanvasElement).offsetTop
        this.ctx.beginPath()
        this.ctx.moveTo(this.currentX, this.currentY)
        this.saved = this.canvas.toDataURL()
    }
    mouseUpHandler() {
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            id: this.id,
            method: 'draw',
            figure: {
                type: 'line',
                currentX: this.currentX,
                currentY: this.currentY,
                lastX: this.lastX,
                lastY: this. lastY,
                color: this.ctx.strokeStyle,
                lineWidth: this.ctx.lineWidth
            }
        } as ILineProps))
    }
    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown) {
            this.lastX = e.pageX - (e.target as HTMLCanvasElement).offsetLeft
            this.lastY = e.pageY - (e.target as HTMLCanvasElement).offsetTop
            this.draw(this.lastX, this.lastY)
        }
    }

    draw(x: number, y: number) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.moveTo(this.currentX, this.currentY)
            this.ctx.lineTo(x, y)
            this.ctx.stroke()
        }
    }

    static staticDraw(ctx: CanvasRenderingContext2D, currentX: number, currentY: number, lastX: number, lastY: number, strokeColor: string, lineWidth: number) {
        ctx.beginPath()
        ctx.moveTo(lastX, lastY)
        ctx.lineTo(currentX, currentY)
        ctx.strokeStyle = strokeColor
        ctx.lineWidth = lineWidth
        ctx.stroke()
    }
}