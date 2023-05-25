export default class Tool {
    canvas;
    ctx;
    socket: WebSocket;
    id: string;

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string = '') {
        this.canvas = canvas as HTMLCanvasElement
        this.socket = socket
        this.id = id
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        this.destroyEvents()
        this.cursorType()
    }

    destroyEvents() {
        this.canvas.onmousedown = null;
        this.canvas.onmouseup = null;
        this.canvas.onmousemove = null;
    }

    cursorType(type: string = 'default'){
        this.canvas.style.cursor = `${type}`
    }

    set fillColor (color: string) {
        this.ctx.fillStyle = color
    }

    set strokeColor(color: string){
        this.ctx.strokeStyle = color
    }

    set lineWidth (width: number){
        this.ctx.lineWidth = width
    }

}