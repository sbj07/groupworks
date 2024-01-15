import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Transaction from "layouts/billing/components/Transaction";
import MDButton from "components/MDButton";
import { useState } from "react";

function Transactions() {

  const [transactions, setTransactions] = useState([
  ]);   
   
  const [isAdding, setIsAdding] = useState(false);

  const handleAddClick = () => {
    if(transactions.length < 5){
      setIsAdding(true);
      const newTransaction = { id: new Date().getTime(), name:'새로운 할 일'};
      setTransactions([...transactions, newTransaction]);
    }
  };

  const handleDeleteClick = (id) => {
    console.log('handleDeleteClick called with id:', id);
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };
  
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Todo List
        </MDTypography>
        <MDBox display="flex" alignItems="flex-start">
        </MDBox>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <MDBox mb={2}>
          <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
            오늘 할 일
          </MDTypography>
          <MDBox marginLeft="87%" marginTop="-5%">
            <MDButton style={{ marginBottom: '40%' }} variant="gradient" color="success" size="small" type="button" onClick={handleAddClick}>
              추가
            </MDButton>
          </MDBox>
          {transactions.map((transaction) => (
            <Transaction
              key={transaction.id}
              color="secondary"
              icon="expand_more"
              name={transaction.name}
              onDelete={ () => handleDeleteClick(transaction.id) }
               >
             <MDButton variant="gradient" color="error" size="small" type="button" onClick={() => handleDeleteClick(transaction.id)}>
               삭제
             </MDButton>

            </Transaction>
          ))}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Transactions;
