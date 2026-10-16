import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import VacationEventForm from './VacationEventForm';
import BusinessTripEventFrom from './BusinessTripEventFrom';
import OutworkEventForm from './OutworkEventForm';

// 홈의 일정 등록: 출장/외근은 한 번 더 고른다
const AttendanceAdd = ({ type }) => {
    const [workState, setWorkState] = useState('business');

    if (type === 'vacation') return <VacationEventForm />;

    return (
        <div>
            <div className="d-flex gap-3 mb-3">
                <Form.Check type="radio" id="attend-business" label="출장" name="outwork"
                    checked={workState === 'business'} onChange={() => setWorkState('business')} />
                <Form.Check type="radio" id="attend-outwork" label="외근" name="outwork"
                    checked={workState === 'outwork'} onChange={() => setWorkState('outwork')} />
            </div>
            {workState === 'business' ? <BusinessTripEventFrom key="business" /> : <OutworkEventForm key="outwork" />}
        </div>
    );
};

export default AttendanceAdd;
