import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useEffect, useState } from "react";
import React from "react";

function Transaction({ icon, name, description, value, onDelete }) {

const [color, setColor] = useState("secondary");

const handleClick = () => {
setColor(color === "secondary" ? "success" : "secondary");
};

const [inputValue, setInputValue] = useState('');
const [isOkay, setIsokay] = useState("");

const handleRegister = (event) => {
event.preventDefault();
let loginMemberNo = sessionStorage.getItem("loginMemberNo")
console.log('loginMemberNo:', loginMemberNo);

fetch('http://127.0.0.1:8888/app/api/todo/write', { // 여기에 요청하려는 API 주소를 넣으세요.
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    content: inputValue,
    memberNo : loginMemberNo
  }),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
  setIsokay("true");
  alert("할일 등록 완료");
})
.catch((error) => {
  console.error('Error:', error);
});
};

// const [todoList, setTodoList] = useState([]);

// useEffect( () => {
// let loginMemberNo = sessionStorage.getItem("loginMemberNo");

// fetch(`http://127.0.0.1:8888/app/api/todo/list?memberNo=${loginMemberNo}`, {
//   method: 'GET',
// })
// .then( resp => resp.json())
// .then( data => {
//   console.log('Success', data);
//   if(data.msg === 'good'){
//     setTodoList(data.todoList);
//   }
// })
// } , [] )

return (
  <MDBox component="div" py={1} pr={2} mb={1} onClick={handleClick}>
    <MDBox display="flex" justifyContent="space-between" alignItems="center">
      <MDBox display="flex" alignItems="center">
      <MDBox mr={2}>
      <MDButton variant="outlined" color={color} iconOnly circular>
        <Icon sx={{ fontWeight: "bold" }}>{icon}</Icon>
      </MDButton>
      </MDBox>

      <MDBox display="flex" flexDirection="column" >

        {
          isOkay === "true"
          ?
          <MDTypography variant="caption" color="text" fontWeight="regular">
            {inputValue}
          </MDTypography>
          :
          <MDBox>
          <MDInput type="text" variant="standard" name="pwd" placeholder='새로운 할일' fullWidth style={{ width: '200%' }}
            value={inputValue} onChange={e => setInputValue(e.target.value)}/>
          </MDBox>
        }
      </MDBox>
    </MDBox>
    <MDTypography variant="button" color={color} fontWeight="medium" textGradient>
      {value}
    </MDTypography>
    {
      isOkay === "true"
      ?
        <MDButton variant="gradient" color="error" size="small" type="button" onClick={onDelete}>
        삭제
        </MDButton>
      :
      <>
        <MDButton style={{marginLeft:'39%'}}variant="gradient" color="success" size="small" type="submit" onClick={handleRegister}>
          등록
        </MDButton>
        <MDButton variant="gradient" color="error" size="small" type="button" onClick={onDelete}>
          삭제
        </MDButton>
      </>
    }
  </MDBox>
</MDBox>  
);
}

// Typechecking props of the Transaction
Transaction.propTypes = {
color: PropTypes.oneOf([
"primary",
"secondary",
"info",
"success",
"warning",
"error",
"light",
"dark",
]).isRequired,
icon: PropTypes.node.isRequired,
name: PropTypes.string.isRequired,
description: PropTypes.string.isRequired,
value: PropTypes.string.isRequired,
onDelete: PropTypes.func,
};

export default Transaction;