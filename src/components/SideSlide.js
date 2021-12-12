import React, {useState} from 'react';
import Calendar from './Calendar';
import '../App.css';
import TimeSlots from './TimeSlots';
import { CSSTransition } from 'react-transition-group';

const SideSlide = (props) => {
    let [date, setDate] = useState('');

    const handleSelect = (date) => {
        console.log(date)
        setDate(date)
    }
    
    return (
        <div className="side-bar">
            <button className="side-close" onClick={() => props.handleSideBar(false)}>Cancel</button>
            <Calendar handleSelect={handleSelect} className="calendar"/>
            <TimeSlots date={date}/>
        </div>
    )
}

export default SideSlide;