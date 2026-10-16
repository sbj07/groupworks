import FullCalendar from "@fullcalendar/react";
import React, { useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import koLocale from "@fullcalendar/core/locales/ko";
import styled from "styled-components";
import AppModal from "../common/AppModal";
import BusinessTripEventFrom from "../attendance/BusinessTripEventFrom";
import OutworkEventForm from "../attendance/OutworkEventForm";
import VacationEventForm from "../attendance/VacationEventForm";
import { API_BASE } from '../../api/config';
import { api } from '../../api/http';
import { notify } from '../common/Toast';

// 일정 종류별 색 (범례와 이벤트에 같이 쓴다)
const EVENT_TYPES = {
  "business-trip": { label: "출장", color: "#f5a524" },
  "outside-work": { label: "외근", color: "#1f9d6b" },
  vacation: { label: "휴가", color: "#2459e0" },
};

const StyledCalendarDiv = styled.div`
  width: 100%;

  .legend {
    display: flex;
    gap: 14px;
    margin-bottom: 10px;
    color: var(--gw-text-muted);
    font-size: 12px;
    font-weight: 600;
  }

  .legend span::before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 6px;
    border-radius: 50%;
    background: var(--dot);
  }
`;



const TestCalendar = ({ refresh }) => {
  const loginMemberNo = sessionStorage.getItem("loginMemberNo");

  const [eventList, setEventList] = useState([]);  // 이벤트 리스트 상태 추가

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedNo, setSelectedNo] = useState("");

  useEffect(() => {

    Promise.all([
      fetch(`${API_BASE}/api/attendance/business-trip?loginMemberNo=${loginMemberNo}`).then(resp => resp.json()),
      fetch(`${API_BASE}/api/attendance/outside-work?loginMemberNo=${loginMemberNo}`).then(resp => resp.json()),
      fetch(`${API_BASE}/api/attendance/vacation?loginMemberNo=${loginMemberNo}`).then(resp => resp.json()),
    ])
    .then(([bTripData, outsideWorkData, vacationData]) => {
      const newEventList = [];

      bTripData.bTripList.forEach((vo) => {
        newEventList.push({
          groupId: "business-trip",
          id: vo.no,
          title: vo.memo !== null ? "출장 : " + vo.memo : "출장",
          start: vo.startDate,
          end: vo.endDate,
          color: EVENT_TYPES["business-trip"].color,
        });
      });

      outsideWorkData.outsideWorkList.forEach((vo) => {
        newEventList.push({
          groupId: "outside-work",
          id: vo.no,
          title: "외근",
          start: vo.startTime,
          end: vo.endTime,
          color: EVENT_TYPES["outside-work"].color,
        });
      });

      vacationData.vacationList.forEach((vo) => {
        newEventList.push({
          groupId: "vacation",
          id: vo.no,
          title: "휴가",
          start: vo.startDate,
          end: vo.endDate,
          color: EVENT_TYPES.vacation.color,
        });
      });

      setEventList(newEventList);  // 상태 업데이트
    });
  }, [refresh, loginMemberNo]);


  const handleEventClick = (info) => {
    setModalVisible(true);
    setSelectedNo(info.event.id);
    setSelectedEvent(info.event.groupId);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDeleteEvent = async () => {
    if (!window.confirm("이 일정을 삭제하시겠습니까?")) return;
    const result = await api.delete(`/api/attendance/${selectedEvent}/${selectedNo}`);
    if (result.ok) {
      notify("일정을 삭제했습니다.", "success");
      setTimeout(() => window.location.reload(), 600);
    }
  };

  const typeInfo = EVENT_TYPES[selectedEvent];

  return (
      <StyledCalendarDiv>
        <div className="legend">
          {Object.values(EVENT_TYPES).map(t => <span key={t.label} style={{ "--dot": t.color }}>{t.label}</span>)}
        </div>
        <FullCalendar
          locale={koLocale}
          plugins={[dayGridPlugin]}
          contentHeight={480}
          events={eventList}
          eventClick={handleEventClick}
          dayMaxEvents={3}
          />
        <AppModal
          isOpen={modalVisible}
          onClose={closeModal}
          title={`${typeInfo?.label ?? "일정"} 수정`}
          subtitle="내용을 바꾸고 수정을 누르거나, 일정을 삭제할 수 있습니다."
          width={460}
          footer={<>
            <button type="button" className="btn btn-outline-danger" onClick={handleDeleteEvent}>삭제</button>
            <button type="button" className="btn btn-outline-secondary" onClick={closeModal}>닫기</button>
          </>}
        >
          {selectedEvent === 'business-trip' && <BusinessTripEventFrom type="put" putId={selectedNo} />}
          {selectedEvent === 'outside-work' && <OutworkEventForm type="put" putId={selectedNo} />}
          {selectedEvent === 'vacation' && <VacationEventForm type="put" putId={selectedNo} />}
        </AppModal>
      </StyledCalendarDiv>
  );
};

export default TestCalendar;
