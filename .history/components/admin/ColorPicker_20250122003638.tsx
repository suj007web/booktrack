import { useState } from 'react';
import {HexColorInput, HexColorPicker} from 'react-colorful';

interface Props {
    value ? : string;
    onPickerChange : (color : string) => void;
}

const ColorPicker = ({value, onPickerChange} : Props) =>{
    const [color, setColor] = useState('#ffffff');
    const [isOpen, setIsOpen] = useState(false);
    return <div className='relative'>
        <div className='color-picker'>
        <HexColorPicker color={color} onChange={setColor} />
        <HexColorInput color={color} onChange={setColor} className=''/>
        </div>
    </div>
}

export default ColorPicker;