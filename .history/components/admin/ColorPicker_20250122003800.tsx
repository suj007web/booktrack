import { useState } from 'react';
import {HexColorInput, HexColorPicker} from 'react-colorful';

interface Props {
    value ? : string;
    onPickerChange : (color : string) => void;
}

const ColorPicker = ({value, onPickerChange} : Props) =>{
    const [color, setColor] = useState('#ffffff');

    return <div className='relative'>
        <div className='color-picker flex flex-row items-center'>
            <p>#</p>
        <HexColorInput color={color} onChange={setColor} className='hex-input'/>
        </div>
        <HexColorPicker color={color} onChange={setColor} />
    </div>
}

export default ColorPicker;