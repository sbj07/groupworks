import React, { useEffect, useState } from 'react';
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import styled from 'styled-components';

const StyledSignUpDiv = styled.div`

`;



function Cover() {
  const [vo, setVo] = useState({
    name: "",
    id : "",
    pwd: "",
    email: "",
    tel: "",
    address: "",
    departNo: "",
    companyNo: "",
    positionNo: "",

  });

  
  const ListSelectBox = ( {prop} ) => {
    const [listArr, setListArr] = useState([]);

    useEffect( () => {
      fetch(`http://127.0.0.1:8888/app/api/member/${prop}`)
      .then( (resp) => { return resp.json() })
      .then( (data) => {
        setListArr(data.list);
      })
      ;
    }, []);
    
    return (
      <select name={`${prop}No`} value={vo[`${prop}No`]} onChange={handleInputChange} > 
        {
          listArr.map( (vo) => {
            return <option key={vo.name} value={vo.no}  >{vo.name}</option>;
          } )
        }
      </select>
    );
  };


 
  const handleInputChange = (event) => {
    const {name , value} = event.target;

    setVo({
        ...vo ,
        [name] : value
    });

  };

  const handleJoinSubmit = (event) => {
    event.preventDefault();
    console.log(vo);
  };
  
  return (
    <StyledSignUpDiv>
      <CoverLayout image={bgImage}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-3}
            p={3}
            mb={1}
            textAlign="center"
            >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              GroupWorks
            </MDTypography>
            <MDTypography display="block" variant="button" color="white" my={1}>
              아래에 정보를 기입해주세요.
            </MDTypography>
          </MDBox>

          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form" onSubmit={handleJoinSubmit}>

              <MDBox mb={2}>
                <MDInput type="text" label="이름" variant="standard" name="name" onChange={handleInputChange} fullWidth/>
              </MDBox>

              <MDBox mb={2}>
                <MDInput type="text" label="아이디" variant="standard" name="id" onChange={handleInputChange} fullWidth/>
              </MDBox>

              <MDBox mb={2}>
                <MDInput type="password" label="비밀번호" variant="standard" name="pwd" onChange={handleInputChange} fullWidth/>
              </MDBox>

              <MDBox mb={2}>
                <MDInput type="email" label="Email" variant="standard" name="email" onChange={handleInputChange} fullWidth />
              </MDBox>

              <MDBox mb={2}>
                <MDInput type="text" label="연락처 ( - 없이 기입해주세요 )" variant="standard" name="tel" onChange={handleInputChange} fullWidth />
              </MDBox>

              <MDBox mb={2}>
                <MDInput type="text" label="주소" variant="standard" name="address" onChange={handleInputChange} fullWidth />
              </MDBox>

              <MDBox mb={2}>
                <ListSelectBox prop="company"/>
                <ListSelectBox prop="depart" />
                <ListSelectBox prop="position" />
              </MDBox>

              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info" type="submit" fullWidth>
                  sign in
                </MDButton>
              </MDBox>

            </MDBox>
          </MDBox>
        </Card>
      </CoverLayout>
    </StyledSignUpDiv>
  );
}

export default Cover;
