import { GlobalFigureProps } from "./ITool";


export interface LineFigureProps extends GlobalFigureProps {
    currentX: number,
    currentY: number,
    lastX: number,
    lastY: number,
}

export interface ILineProps {
    id: string,
    method: string,
    figure: LineFigureProps
}