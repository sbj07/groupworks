import React from 'react';
import EventForm from './EventForm';

// outside-work 일정 등록/수정 (공통 EventForm 사용)
const OutworkEventForm = (props) => <EventForm kind="outside-work" {...props} />;

export default OutworkEventForm;
