import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import '../App.css'

const Calendar = (props) => {
  const handleDateSelect = (selectInfo) => {
    props.handleSelect(selectInfo.dateStr)
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: 'prev,next',
        center: 'title',
        right: 'dayGridWeek, dayGridMonth',
      }}
      editable={false}
      height= {350}
      selectable={true}
      dateClick={handleDateSelect}
      // select={(selectionInfo)=> console.log(selectionInfo)}
      weekends={false}
      // navLinks={true}
      initialView="dayGridMonth"
    />
  )
}

export default Calendar