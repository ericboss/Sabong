import "./deactivatedPlayerList.css"
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, Facebook, Email, Phone } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { deactivatedPlayerData } from "../../dummyData"

function DeactivatedPlayerList() {
    const [data, setData] = useState(deactivatedPlayerData);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 100 ,height:100,
    renderCell:(params) =>{
        return(
            <div className="deactivatedPlayerIDList">
                {params.row.id}
              
            </div>
        )
    }
    },
    {
      field: "username",
      headerName: "User Info",
      width: 350,
      renderCell: (params) => {
        return (
          <div className="deactivatedPlayerListUser">
            
            <div className="contactOne">
            <img className="deactivatedPlayerListImg" src={params.row.avatar} alt="" />
            {params.row.username}
            </div>
            <div className="contactTwo">
            <Facebook className="deactivatedPlayerListImg"/>
            <span> facebook</span>
            </div>
            
          </div>
        );
      },
    },
    { field: "email", headerName: "Contact Details", width: 350, 

    renderCell: (params) => {
        return (
          <div className="deactivatedPlayerListUser">
            
            <div className="contactOne">
            <Email className="deactivatedPlayerListImg"/>
            {params.row.email}
            </div>
            <div className="contactTwo">
            <Phone className="deactivatedPlayerListImg"/>
            <span> {params.row.phoneNumber}</span>
            </div>
            
          </div>
        );
      }

    },
    {
      field: "points",
      headerName: "Current Points",
      width: 170,
     
    },
    {
      field: "createdAt",
      headerName: "Date Registered",
      width: 190,
    },

 
    {
      field: "action",
      headerName: "Action",
      width: 170,
      renderCell: (params) => {
        return (
          <>
            
              <button className="deactivatedPlayerListDeleteConfirm">Deactivated</button>
          
           
          </>
        );
      },
    },
  ];

  return (
    <div className="deactivatedPlayerList">
      <div className="userTitleContainer">
          <h1 className="userTitle">Deactivated Players</h1>
          
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


export default DeactivatedPlayerList;
