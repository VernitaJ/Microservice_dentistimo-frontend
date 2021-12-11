import React, {useState} from 'react';
import Calendar from './Calendar';
import '../App.css';
import TimeSlots from './TimeSlots';

const SideSlide = () => {
    let [date, setDate] = useState('');

    const handleSelect = (info) => {
        console.log(info)
        setDate(info.dateStr)
    }
    
    return (
        <div className="side-bar">
            <Calendar handleSelect={handleSelect} />
            <TimeSlots date={date}/>
        </div>
    )
}

export default SideSlide;