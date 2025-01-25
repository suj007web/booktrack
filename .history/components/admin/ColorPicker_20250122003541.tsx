import { useState } from 'react';
import {HexColorPicker} from 'react-colorful';

interface Props {
    value ? : string;
    onPickerChange : (color : string) => void;
}

const ColorPicker = ({value, onPickerChange} : Props) =>{
    const [color, setColor] = useState('#ffffff');
    const [isOpen, setIsOpen] = useState(false);
    return <div>
        
    </div>
}

export default ColorPicker;