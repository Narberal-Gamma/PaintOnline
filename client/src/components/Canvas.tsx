import { FC, useEffect, useRef } from "react";
import '../styles/canvas.scss'
import { observer } from "mobx-react-lite";
import CanvasState from "../store/canvasState";
import ToolState from "../store/toolState";
import Brush from "../tools/Brush";
import canvasState from "../store/canvasState";
import ModalWindow from "./ModalWindow";
import { useParams } from "react-router-dom";
import { IConnection } from "../types/websocket/IConnection";
import { ToolType } from "../types/tools/ITool";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Line from "../tools/Line";
import axios from "axios";

const Canvas: FC = observer(() => {

    const canvasRef = useRef<HTMLCanvasElement>({} as HTMLCanvasElement)
    const params = useParams<string>()

    useEffect(() => {
        CanvasState.setCanvas(canvasRef.current)
        let ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D
        axios.get(`http://localhost:5000/image?id=${params.id}`)
            .then(response => {
                const img = new Image()
                img.src = response.data
                img.onload = () => {
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                    ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
                }
            })
    }, [])

    useEffect(() => {
        if (canvasState.username) {
            const socket = new WebSocket('ws://localhost:5000/')
            canvasState.setSessionSocket(socket)
            canvasState.setSessionId(params.id)
            ToolState.setTool(new Brush(canvasRef.current, socket, params.id))
            socket.onopen = () => {
                console.log('Подключение установлена')
                socket.send(JSON.stringify({
                    id: params.id,
                    username: canvasState.username,
                    method: 'connection'
                } as IConnection))
            }
            socket.onmessage = (ev: MessageEvent) => {
                let msg: IConnection & ToolType = JSON.parse(ev.data)
                switch (msg.method) {
                    case 'connection':
                        console.log(`пользователь ${msg.username} присоединился`)
                        break;
                    case 'draw':
                        drawHandler(msg)
                        break
                }
            }
        }
    }, [canvasState.username])

    const drawHandler = (msg: ToolType) => {
        const figure = msg.figure
        const ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D
        switch (figure.type) {
            case 'brush':
                Brush.draw(ctx, figure.x, figure.y, figure.color, figure.lineWidth)
                break;
            case 'rect':
                Rect.staticDraw(ctx, figure.startX, figure.startY, figure.width, figure.height, figure.color)
                break;
            case 'circle':
                Circle.staticDraw(ctx, figure.startX, figure.startY, figure.radius, figure.fillColor, figure.StrokeColor)
                break
            case 'line':
                Line.staticDraw(ctx, figure.currentX, figure.currentY, figure.lastX, figure.lastY, figure.color, figure.lineWidth)
                break
            case 'finish':
                ctx.beginPath()
                break;
        }
    }

    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
        axios.post(`http://localhost:5000/image?id=${params.id}`, { image: canvasRef.current.toDataURL() })
            .then(response => console.log(response.data))
    }

    return (
        <div className="canvas">
            <ModalWindow />
            <canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={600} height={600} />
        </div>
    )
})

export default Canvas