import React, { useEffect, useState } from 'react';
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { useNavigate } from 'react-router-dom';


function Cover() {
  const navigate = useNavigate();

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

  const [companyList, setCompanyList] = useState([]);
  const [departList, setDepartList] = useState([]);
  const [positionList, setPositionList] = useState([]);
  
  // Api호출
  useEffect( () => {
    fetch(`http://127.0.0.1:8888/app/api/member/company`)
    .then( (resp) => { return resp.json() })
    .then( (data) => {
      setCompanyList(data.list);
    });

    fetch(`http://127.0.0.1:8888/app/api/member/depart`)
    .then( (resp) => { return resp.json() })
    .then( (data) => {
      setDepartList(data.list);
    });

    fetch(`http://127.0.0.1:8888/app/api/member/position`)
    .then( (resp) => { return resp.json() })
    .then( (data) => {
      setPositionList(data.list);
    });
  }, []);

  // 옵션 리스트 생성
  const ListSelectBox = ( {prop, list} ) => {
    return (
      <select name={`${prop}No`} value={vo[`${prop}No`]} onChange={handleInputChange} > 
        {
          list.map( (vo) => {
            return <option key={vo.name} value={vo.no}  >{vo.name}</option>;
          } )
        }
      </select>
    );
  };

  // vo데이터 저장
  const handleInputChange = (event) => {
    const {name , value} = event.target;
    
    setVo({
      ...vo ,
      [name] : value
    });
    
  };

  const handleIdCheck = () => {
    let idStr = vo.id;
    console.log(idStr);
    fetch(`http://127.0.0.1:8888/app/api/member/check-id?id=${idStr}`)
    .then( resp => resp.json() )
    .then( data => {
      if(data.msg === 'nope'){
        alert("사용가능한 아이디 입니다.");
      }else if(data.msg === 'okay') {
        alert("중복된 아이디입니다. 다른 아이디를 입력해주세요.");
      }
    });
  }
  //Api 호출
  const handleJoinSubmit = (event) => {
    event.preventDefault();

    fetch("http://127.0.0.1:8888/app/api/member/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(vo)
    })
    .then( resp => resp.json())
    .then( data => {
      if(data.msg === 'okay'){
        alert("회원가입 완료!");
        navigate("/sign-in");
      }else{
        alert('회원가입 실패');
      }
    })
  };
  
  return (
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
              <MDInput type="text" label="아이디" variant="standard" name="id" onChange={handleInputChange} />
              <MDButton variant="gradient" color="info" size="small" type="button" onClick={handleIdCheck}>
                중복체크
              </MDButton>
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
              <ListSelectBox prop="company" list={companyList} />
              <ListSelectBox prop="depart" list={departList} />
              <ListSelectBox prop="position" list={positionList} />
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
  );
}

export default Cover;
