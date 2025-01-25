import { useState } from 'react';
import {HexColorPicker} from 'react-colorful';

const ColorPicker = () =>{
    const [color, setColor] = useState('#ffffff');
    return <HexColorPicker color={color} onChange={setColor} />
}