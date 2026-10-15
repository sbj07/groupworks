import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSun, FiBriefcase } from 'react-icons/fi';
import VacationFormList from './VacationFormList';
import BusinessFormList from './BusinessFormList';

const StyledDocumentListDiv = styled.div`
  width: 100%;
`;

const Tiles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
  margin-bottom: 24px;
`;

const Tile = styled.button`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 20px;
  border: 1px solid var(--gw-border);
  border-radius: var(--gw-radius);
  background: var(--gw-surface);
  text-align: left;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:hover {
    border-color: var(--gw-primary);
  }

  &.active {
    border-color: var(--gw-primary);
    box-shadow: 0 0 0 3px rgba(36, 89, 224, 0.12);
  }

  & > svg {
    flex-shrink: 0;
    padding: 10px;
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: var(--gw-primary-soft);
    color: var(--gw-primary);
  }

  strong {
    display: block;
    font-size: 15px;
    color: var(--gw-text);
  }

  small {
    color: var(--gw-text-muted);
  }
`;

const DocumentList = () => {

    const [formType, setFormType] = useState('');

    const handleClick = (type) => {
        setFormType(type);
    };

    return (
       <StyledDocumentListDiv>
            <Tiles>
                <Tile type="button" className={formType === 'vacationForm' ? 'active' : ''} onClick={() => handleClick('vacationForm')}>
                    <FiSun />
                    <span><strong>휴가신청서</strong><small>휴가 신청과 결재 현황을 조회합니다.</small></span>
                </Tile>
                <Tile type="button" className={formType === 'businessForm' ? 'active' : ''} onClick={() => handleClick('businessForm')}>
                    <FiBriefcase />
                    <span><strong>출장신청서</strong><small>출장 신청과 결재 현황을 조회합니다.</small></span>
                </Tile>
            </Tiles>
            {formType === 'vacationForm' && <VacationFormList />}
            {formType === 'businessForm' && <BusinessFormList />}
       </StyledDocumentListDiv>
    );
};

export default DocumentList;
