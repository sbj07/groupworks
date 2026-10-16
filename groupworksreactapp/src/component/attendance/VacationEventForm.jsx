import React from 'react';
import EventForm from './EventForm';

// vacation 일정 등록/수정 (공통 EventForm 사용)
const VacationEventForm = (props) => <EventForm kind="vacation" {...props} />;

export default VacationEventForm;
