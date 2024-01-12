import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useState } from "react";

function Transaction({ icon, name, description, value, onDelete }) {

  const [color, setColor] = useState("secondary");

  const handleClick = () => {
    setColor(color === "secondary" ? "success" : "secondary");
  };

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
              <MDBox>
                <MDInput type="text" variant="standard" name="pwd" placeholder='새로운 할일' fullWidth style={{ width: '200%' }}/>
              </MDBox>
            <MDTypography variant="caption" color="text" fontWeight="regular">
              {description}
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDTypography variant="button" color={color} fontWeight="medium" textGradient>
          {value}
        </MDTypography>
          <MDButton style={{marginLeft:'39%'}}variant="gradient" color="success" size="small" type="submit">
            등록
          </MDButton>
          <MDButton variant="gradient" color="error" size="small" type="button" onClick={onDelete}>
            삭제
          </MDButton>
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
