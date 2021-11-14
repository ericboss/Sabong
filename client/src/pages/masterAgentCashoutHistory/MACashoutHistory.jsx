import "./MACashoutHistory.css"
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, Facebook, Email, Phone } from "@material-ui/icons";
import { MACashoutHistoryData } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";

function MACashoutHistory() {
    const [data, setData] = useState(MACashoutHistoryData);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 100 ,height:100,
    
    },
    
    { field: "transactionType", headerName: "Transaction Type", width: 200}, 
    { field: "Ref", headerName: "Ref #", width: 170}, 
   
    {
      field: "amount",
      headerName: "Amount",
      width: 190,

    },

 
    {
      field: "username",
      headerName: "Username",
      width: 150,
      
    },

    {
      field: "remarks",
      headerName: "Remarks",
      width: 300,
      
    },
    {
        field: "status",
        headerName: "Status",
        width: 150,
        
      },
    {
      field: "transactionBy",
      headerName: "Transaction By",
      width: 170,
      
    },
  ];

  return (
    <div className="commissionLogsList">
        <div className="userTitleContainer">
          <h1 className="userTitle">Cashout History</h1>
          
        </div>
      <DataGrid

        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}


export default MACashoutHistory
