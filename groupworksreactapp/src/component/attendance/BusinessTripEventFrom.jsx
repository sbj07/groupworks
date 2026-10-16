import React from 'react';
import EventForm from './EventForm';

// business-trip 일정 등록/수정 (공통 EventForm 사용)
const BusinessTripEventFrom = (props) => <EventForm kind="business-trip" {...props} />;

export default BusinessTripEventFrom;
