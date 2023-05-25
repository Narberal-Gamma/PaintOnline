import { IBrushProps } from "./IBrush";
import { ICircleProps } from "./ICircle";
import { ILineProps } from "./ILine";
import { IRectProps } from "./IRect";

export interface GlobalFigureProps {
    type: string,
    color: string,
    lineWidth: number
}

export type ToolType =
    IBrushProps
    & IRectProps
    & ICircleProps
    & ILineProps