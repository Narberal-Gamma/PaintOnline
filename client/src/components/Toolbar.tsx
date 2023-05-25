import { ChangeEvent, FC, useState } from "react";
import '../styles/bar.scss';
import ToolState from "../store/toolState";
import Brush from "../tools/Brush";
import canvasState from "../store/canvasState";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";

interface PickedColorProps {
    fill: string,
    stroke: string
}

const Toolbar: FC = () => {

    const [pickedColor, setPickedColor] = useState<PickedColorProps>({fill: 'black', stroke: 'black'})

    const changeColor = (e: ChangeEvent<HTMLInputElement>) => {
        ToolState.setFillColor(e.target.value)
        ToolState.setStrokeColor(e.target.value)
        ToolState.setLineWidth(32)
        setPickedColor({fill: e.target.value, stroke: e.target.value})
    }

    const toolPicker = (toolType: any) => {
        if (toolType === Eraser) {
            ToolState.setFillColor('white')
            ToolState.setStrokeColor('white')
        } 
        else {
            ToolState.setFillColor(pickedColor.fill)
            ToolState.setStrokeColor(pickedColor.stroke)
        }
        ToolState.setTool(new toolType(canvasState.canvas, canvasState.socket, canvasState.sessionId))
    }

    const download = () => {
        const dataUrl = canvasState.canvas.toDataURL()
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = canvasState.sessionId + 'jpg'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    return (
        <div className="toolbar">
            <button className="toolbar__btn brush" onClick={() => toolPicker(Brush)}></button>
            <button className="toolbar__btn rect" onClick={() => toolPicker(Rect)}></button>
            <button className="toolbar__btn circle" onClick={() => toolPicker(Circle)}></button>
            <button className='toolbar__btn eraser' onClick={() => toolPicker(Eraser)}></button>
            <button className="toolbar__btn line" onClick={() => toolPicker(Line)}></button>
            <input onChange={(e) => changeColor(e)} className="color" type="color" />
            <button className="toolbar__btn undo" onClick={() => canvasState.undo()}></button>
            <button className="toolbar__btn redo" onClick={() => canvasState.redo()}></button>
            <button className="toolbar__btn save" onClick={() => download()}></button>
        </div>
    )
}

export default Toolbar