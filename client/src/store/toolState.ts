import { makeAutoObservable } from "mobx";

class ToolState {
    tool: any = {};

    constructor(){
        makeAutoObservable(this)
    }

    setTool (tool: object){
        this.tool = tool
    }

    setFillColor (color: string){
        this.tool.fillColor = color
    }

    setStrokeColor (color: string){
        this.tool.strokeColor = color
    }

    setLineWidth (width: number){
        this.tool.lineWidth = width
    }
}

export default new ToolState()