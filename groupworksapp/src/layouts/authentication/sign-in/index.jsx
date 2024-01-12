import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useState } from "react";

function Basic() {
  const navigate = useNavigate();
  const [vo, setVo] = useState({
    id : "",
    pwd: "",
  });

  const handleInputChange = (event) => {
    const {name , value} = event.target;
    
    setVo({
      ...vo ,
      [name] : value
    });
  };

  // API 호출
  const handleLoginSubmit = (event) => {
    event.preventDefault();

    fetch("http://127.0.0.1:8888/app/api/member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(vo)
    })
    .then( resp => resp.json() )
    .then( data => {
      if(data.msg === 'okay') {
        navigate("/home");
      }else {
        alert("로그인 실패, 다시 시도해 주세요.");
      }
    } )
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>


          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <MDTypography display="block" variant="button" color="white" my={1}>
              아래에 정보를 기입해주세요.
            </MDTypography>
          </Grid>

        </MDBox>
        
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleLoginSubmit}>
            
            <MDBox mb={2}>
              <MDInput type="text" label="ID" name="id" onChange={handleInputChange} fullWidth />
            </MDBox>
            
            <MDBox mb={2}>
              <MDInput type="password" label="Password" name="pwd" onChange={handleInputChange} fullWidth />
            </MDBox>
            
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" type="submit" fullWidth>
                sign in
              </MDButton>
            </MDBox>

            <MDBox mt={3} mb={1} textAlign="center">

              <MDTypography variant="button" fontWeight="medium" color="text">
                계정이 없으시다면?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  회원가입
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
