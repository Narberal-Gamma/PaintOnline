import { GlobalFigureProps } from "./ITool"

export interface RectFigureProps extends GlobalFigureProps {
    startX: number,
    startY: number,
    width: number,
    height: number
}

export interface IRectProps {
    id: string,
    method: string,
    figure: RectFigureProps
}