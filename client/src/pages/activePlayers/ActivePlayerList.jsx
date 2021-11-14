import "./activeplayerlist.css"
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, Facebook, Email, Phone } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { activePlayerData } from "../../dummyData"

function ActivePlayerList() {
    const [data, setData] = useState(activePlayerData);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 100 ,height:100,
    renderCell:(params) =>{
        return(
            <div className="activePlayerIDList">
                {params.row.id}
                <button className="activePlayerListStatus">Active</button>
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
          <div className="activePlayerListUser">
            
            <div className="contactOne">
            <img className="activePlayerListImg" src={params.row.avatar} alt="" />
            {params.row.username}
            </div>
            <div className="contactTwo">
            <Facebook className="activePlayerListImg"/>
            <span> facebook</span>
            </div>
            
          </div>
        );
      },
    },
    { field: "email", headerName: "Contact Details", width: 350, 

    renderCell: (params) => {
        return (
          <div className="activePlayerListUser">
            
            <div className="contactOne">
            <Email className="activePlayerListImg"/>
            {params.row.email}
            </div>
            <div className="contactTwo">
            <Phone className="activePlayerListImg"/>
            <span> {params.row.phoneNumber}</span>
            </div>
            
          </div>
        );
      }

    },
    {
      field: "points",
      headerName: "Current Points",
      width: 200,
     
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
            <Link to={"/user/" + params.row.id}>
              <button className="activePlayerListEdit">Convert as Agent</button>
            </Link>
            <DeleteOutline
              className="activePlayerListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="activePlayerList">
      <div className="userTitleContainer">
          <h1 className="userTitle">Active Players</h1>
          
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


export default ActivePlayerList
