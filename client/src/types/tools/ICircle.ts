
export interface CircleFigureProps{
    startX: number,
    startY: number,
    radius: number,
    fillColor: string,
    StrokeColor: string,
}

export interface ICircleProps {
    id: string,
    method: string,
    figure: CircleFigureProps
}