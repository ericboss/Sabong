import "./commissionlogs.css"
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, Facebook, Email, Phone } from "@material-ui/icons";
import { commissionHistory } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { activePlayerData } from "../../dummyData"

function CommissionLogs() {
    const [data, setData] = useState(commissionHistory);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 100 ,height:100,
    renderCell:(params) =>{
        return(
            <div className="commissionLogsIDList">
                {params.row.id}
               {/* <button className="commissionLogsListStatus">Active</button>*/}
            </div>
        )
    }
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      
    },
    { field: "transactionType", headerName: "Transaction Type", width: 200}, 

   
    {
      field: "amount",
      headerName: "Amount",
      width: 190,

    },

 
    {
      field: "member",
      headerName: "Member",
      width: 150,
      
    },

    {
      field: "details",
      headerName: "Details",
      width: 700,
      
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
          <h1 className="userTitle">Commission logs</h1>
          
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


export default CommissionLogs
