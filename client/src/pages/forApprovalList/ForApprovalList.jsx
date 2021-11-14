import "./forApprovalList.css"
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, Facebook, Email, Phone } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { activePlayerData } from "../../dummyData"

function ForApprovalList() {
    const [data, setData] = useState(activePlayerData);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 100 ,height:100,
    renderCell:(params) =>{
        return(
            <div className="forApprovalIDList">
                {params.row.id}
               {/* <button className="forApprovalListStatus">Active</button>*/}
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
          <div className="forApprovalListUser">
            
            <div className="contactOne">
            <img className="forApprovalListImg" src={params.row.avatar} alt="" />
            {params.row.username}
            </div>
            <div className="contactTwo">
            <Facebook className="forApprovalListImg"/>
            <span> facebook</span>
            </div>
            
          </div>
        );
      },
    },
    { field: "email", headerName: "Contact Details", width: 400, 

    renderCell: (params) => {
        return (
          <div className="forApprovalListUser">
            
            <div className="contactOne">
            <Email className="forApprovalListImg"/>
            {params.row.email}
            </div>
            <div className="contactTwo">
            <Phone className="forApprovalListImg"/>
            <span> {params.row.phoneNumber}</span>
            </div>
            
          </div>
        );
      }

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
              <button className="forApprovalListEdit">Activate Player</button>
            </Link>
            <DeleteOutline
              className="forApprovalListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="forApprovalList">
      <div className="userTitleContainer">
          <h1 className="userTitle">For Approvals</h1>
          
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


export default ForApprovalList
