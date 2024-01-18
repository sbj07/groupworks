// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Billing page components
import Bill from "layouts/billing/components/Bill";
import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import NoticeEditModal from "./NoticeEditModal";









const BillingInformation = () => {

  // const handleNoticeDetail = (noticeNo) => {
  //   navigate(`/notice`); // 여기서 실제 이동할 경로를 지정합니다.
  // };

  const loginMember = sessionStorage.getItem("loginMemberNo");
  const navigate = useNavigate();
  const [noticeList, setNoticeList] = useState([]);


//
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const handleEditClick = (notice) => {
    setSelectedNotice(notice);
    setIsModalOpen(true);
  };
//


  useEffect( () => {
  console.log("useEffect start");
  console.log(loginMember);
  fetch(`http://127.0.0.1:8888/app/notice/list?loginMember=${loginMember}`)
  // fetch("http://127.0.0.1:8888/app/notice/list")
  .then( (resp) => { return resp.json() })
  .then( (data) => {
    console.log("Fetched data",data);
    console.log("data",data);
    setNoticeList(data.voList);
    console.log("유즈이펙트 끝나고", noticeList);
  })
  .catch(error => {
    console.error("Error fetching data:", error);
    // 데이터 로딩 중 발생한 오류를 처리합니다.
  });
  } , [] );

  return (
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          공지사항
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        {/* <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}> */}
          {noticeList.map((notice, noticeNo) => (
            <div key={noticeNo}>
            <Bill
              key={noticeNo}
              name={notice.title}
              company={notice.memberNo}
              email={notice.clickNo}
              vat={notice.filePath}
              onEdit={() => handleEditClick(notice)}
            />
            </div>
          ))}
        {/* </MDBox> */}
      </MDBox>
      {isModalOpen && (
        <NoticeEditModal
          open={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          noticeData={selectedNotice}
        />
      )}
    </Card>
  );
};

export default BillingInformation;









// 기존 코드
// function BillingInformation() {



//   return (
//     <Card id="delete-account">
//       <MDBox pt={3} px={2}>
//         <MDTypography variant="h6" fontWeight="medium">
//           공지사항ddd
//         </MDTypography>
//       </MDBox>
//       <MDBox pt={1} pb={2} px={2}>
//         <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>

//         <Bill
//           name="lucas harper"
//           company="stone tech zone"
//           email="lucas@stone-tech.com"
//           vat="FRB1235476"
//           />
//           <Bill
//             name="lucas harper"
//             company="stone tech zone"
//             email="lucas@stone-tech.com"
//             vat="FRB1235476"
//           />
//         </MDBox>
//       </MDBox>
//     </Card>
//   );
// }

// export default BillingInformation;
