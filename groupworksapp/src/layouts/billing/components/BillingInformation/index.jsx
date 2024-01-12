// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Billing page components
import Bill from "layouts/billing/components/Bill";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BillingInformation() {

  const navigate = useNavigate();

  //fetch를 이용해서 데이터 준비
  const [noticeVoList, setNoticeVoList] = useState([]);
  const loadNoticeVoList = () => {
    fetch("http://127.0.0.1:8888/app/notice/list")
    .then( resp => resp.json() )
    .then( (x) => { setNoticeVoList(x); } )
    ;
  }

  useEffect( () => {
    loadNoticeVoList();
  }, [] );

  return (
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          공지사항
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {
            noticeVoList.length ===0
            ?
            <h1>로딩중</h1>
            :
            noticeVoList.map( vo => <tr key={vo.noticeNo}>
            <td>{vo.noticeNo}</td>
            <td>{vo.title}</td>
            <td>{vo.writerNo}</td>
            <td>{vo.enrollDate}</td>
          </tr>
          )
        }
        <Bill
          
          />
          <button onClick={ () => {
            navigate("notice/detail");
          }}>공지사항 상세조회</button>
          <Bill
            name="lucas harper"
            company="stone tech zone"
            email="lucas@stone-tech.com"
            vat="FRB1235476"
          />
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default BillingInformation;
