import "./agentList.css"
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, Facebook, Email, Phone } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AgentData } from "../../dummyData"

function AgentList() {
    const [data, setData] = useState(AgentData);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 100 ,height:100,
    renderCell:(params) =>{
        return(
            <div className="agentIDList">
                {params.row.id}
                <button className="agentListStatus">Active</button>
            </div>
        )
    }
    },
    {
      field: "username",
      headerName: "User Info",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="agentListUser">
            
            <div className="contactOne">
            <img className="agentListImg" src={params.row.avatar} alt="" />
            {params.row.username}
            </div>
           
            
          </div>
        );
      },
    },
 
    {
      field: "points",
      headerName: "Current Points",
      width: 170,
     
    },
    {
        field: "commissions",
        headerName: "Commissions",
        width: 200,
       
      },
    {
      field: "createdAt",
      headerName: "Date Registered",
      width: 170,
    },

 
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <>
          <Link to={{ pathname: "/agent/" + params.row.id, state: { from:"occupation" } }}>

<button className="agentListDetail">View More</button>
</Link>
            <Link to={"/user/" + params.row.id}>
              <button className="agentConvertPlayer">Convert as Player</button>
            </Link>
           
                   
          </>
        );
      },
    },
  ];

  return (
    <div className="activePlayerList">
        
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


export default AgentList;
