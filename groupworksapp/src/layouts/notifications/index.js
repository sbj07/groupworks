import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Notifications() {

  return (
    <DashboardLayout>
      <DashboardNavbar />
        <MDButton variant="gradient" color="success"  style={{fontSize: "17px", width: "10%", marginLeft:"72%", marginTop: "1.5%"}}> 
          결재 등록
        </MDButton>
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2} lineHeight={0}>
                <MDTypography variant="h5">결재 현황</MDTypography>
               
              </MDBox>
              <MDBox p={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} lg={4}>
                    <MDButton variant="gradient" color="warning"  style={{fontSize: "17px"}}fullWidth> 
                      결재 목록 조회
                    </MDButton>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <MDButton variant="gradient" color="info" style={{fontSize: "17px"}} fullWidth>
                      결재 대기 목록
                    </MDButton>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <MDButton variant="gradient" color="success" style={{fontSize: "17px"}} fullWidth>
                      결재 완료 목록
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2} lineHeight={0}>
                <MDTypography variant="h5">결재 목록</MDTypography>
              </MDBox>
              <MDBox p={2}>
                <Grid container spacing={3}>
                  <table style={{border:"1px solid black", width:"100%"}}>
                    <thead>
                      <tr>
                        <th>번호</th>
                        <th>내용</th>
                        <th>상태</th>
                        <th>등록일</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>asd</td>
                        <td>승인</td>
                        <td>2024-01-13</td>
                      </tr>
                    </tbody>
                  </table>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;
