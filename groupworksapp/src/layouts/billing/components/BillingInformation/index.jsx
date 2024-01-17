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
  const [noticeList, setNoticeList] = useState([]);

// useEffect( () => {
// console.log("useEffect start");
// fetch("http://127.0.0.1:8888/app/notice/list")
// .then( (resp) => { return resp.json() })
// .then( (data) => {
//   console.log("data",data);
//   setNoticeList(data.voList);
// })
// } ,[] );
// console.log("유즈이펙트 끝나고",noticeList);


return (
  <div> {/* 여러 Card 요소들을 감싸는 루트 요소 */}
    {noticeList.map((notice, index) => ( // index를 key로 사용
      <Card key={index} id="delete-account">
        <MDBox pt={3} px={2}>
          <MDTypography variant="h6" fontWeight="medium">
            공지사항
          </MDTypography>
        </MDBox>
        <MDBox pt={1} pb={2} px={2}>
          <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
            <Bill
              name={notice.title}
              company={notice.content}
              email={notice.clickNo}
              vat={notice.filePath}
            />
          </MDBox>
        </MDBox>
      </Card>
    ))},
  </div>
);
}

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
