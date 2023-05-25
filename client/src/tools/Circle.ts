import { ICircleProps } from "../types/tools/ICircle";
import Tool from "./Tool"

export default class Circle extends Tool {
    mouseDown: boolean = false;
    startX: number = 0;
    startY: number = 0;
    radius: number = 0;
    saved: string = '';

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
        this.ctx.beginPath()
        this.startX = e.pageX - (e.target as HTMLCanvasElement).offsetLeft
        this.startY = e.pageY - (e.target as HTMLCanvasElement).offsetTop
        this.saved = this.canvas.toDataURL()
    }
    mouseUpHandler() {
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            id: this.id,
            method: 'draw',
            figure: {
                type: 'circle',
                startX: this.startX,
                startY: this.startY,
                radius: this.radius,
                fillColor: this.ctx.fillStyle,
                StrokeColor: this.ctx.strokeStyle
            }
        } as ICircleProps))
    }
    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown) {
            let currentX = e.pageX - (e.target as HTMLCanvasElement).offsetLeft
            let currentY = e.pageY - (e.target as HTMLCanvasElement).offsetTop
            let width = currentX - this.startX
            let height = currentY - this.startY
            this.radius = Math.sqrt(width ** 2 + height ** 2)
            this.draw(this.startX, this.startY, this.radius)
        }
    }

    draw(x: number, y: number, r: number) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.arc(x, y, r, 0, 2 * Math.PI)
            this.ctx.fill()
            this.ctx.stroke()
        }
    }

    static staticDraw(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        r: number,
        fillColor: string,
        strokeColor: string
    ) {
        ctx.strokeStyle = strokeColor
        ctx.fillStyle = fillColor
        ctx.beginPath()
        ctx.arc(x, y, r, 0, 2 * Math.PI)
        ctx.fill()
        ctx.stroke()
    }
}