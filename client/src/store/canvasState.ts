import { makeAutoObservable } from "mobx";

class CanvasState {
    canvas: HTMLCanvasElement = {} as HTMLCanvasElement;
    undoList: any = [];
    redoList: any = [];
    username: string = '';
    socket: WebSocket = {} as WebSocket;
    sessionId: string = '';

    constructor() {
        makeAutoObservable(this)
    }

    setSessionSocket(socket: WebSocket) {
        this.socket = socket
    }

    setSessionId(id: string = '') {
        this.sessionId = id
    }

    setUsername(username: string) {
        this.username = username
    }

    setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas
    }

    pushToUndo(data: string) {
        this.undoList.push(data)
    }

    undo() {
        let ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
        if (this.undoList.length > 0) {
            let dataUrl = this.undoList.pop()
            this.redoList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataUrl
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        } else {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }

    redo() {
        let ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
        if (this.redoList.length > 0) {
            let dataUrl = this.redoList.pop()
            this.undoList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataUrl
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        }
    }
}

export default new CanvasState()