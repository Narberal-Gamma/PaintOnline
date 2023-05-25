import { GlobalFigureProps } from "./ITool"

export interface BrushFigureProps extends GlobalFigureProps {
    x: number,
    y: number
}

export interface IBrushProps {
    id: string,
    method: string,
    figure: BrushFigureProps
}
