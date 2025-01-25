import { useState } from 'react';
import {HexColorPicker} from 'react-colorful';

interface Props {
    
}

const ColorPicker = () =>{
    const [color, setColor] = useState('#ffffff');
    const [isOpen, setIsOpen] = useState(false);
    return <HexColorPicker color={color} onChange={setColor} />
}

export default ColorPicker;