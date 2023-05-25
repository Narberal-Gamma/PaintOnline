import { ChangeEvent, FC } from "react";
import '../styles/bar.scss';
import ToolState from "../store/toolState";

const SettingBar: FC = () => {

    const changeLineWidth = (e: ChangeEvent<HTMLInputElement>) => {
        ToolState.setLineWidth(+e.target.value)
    }

    const changeColor = (e: ChangeEvent<HTMLInputElement>) => {
        ToolState.setStrokeColor(e.target.value)
    }

    return (
        <div className="setting-bar">
            <label htmlFor="line-width">Толщина линии:</label>
            <input
                onChange={(e) => changeLineWidth(e)}
                defaultValue={1}
                min={1}
                max={50}
                id="line-width"
                type="number"
            />
            <label htmlFor="stroke-color">Цвет обводки:</label>
            <input
                onChange={(e) => changeColor(e)}
                id="stroke-color"
                type="color"
            />
        </div>
    )
}

export default SettingBar