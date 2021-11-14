import { Link } from "react-router-dom";
import "./agent.css";
import LineCharts from "../../components/chart/LineCharts"
import {productData} from "../../dummyData"
import { useParams } from "react-router-dom";
import {
    CalendarToday,
    Facebook,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@material-ui/icons";

export default function Agent(props) {
    const agentId = useParams().agentId;
    console.log(agentId);
  return (
    <div className="agent">
      <div className="agentTitleContainer">
        <h1 className="agentTitle">Agent</h1>
       
      </div>
      <div className="agentTop">
          <div className="agentTopLeft">
              <LineCharts data={productData} dataKey="Sales" title="Commission Performance"/>
          </div>
          <div className="agentShow">
          <div className="agentShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="agentShowImg"
            />
            <div className="agentShowTopTitle">
              <span className="agentShowUsername">Anna Becker</span>
              
            </div>
          </div>
          <div className="agentShowBottom">
            <span className="agentShowTitle">Account Details</span>
            <div className="agentShowInfo">
              <PermIdentity className="agentShowIcon" />
              <span className="agentShowInfoTitle">annabeck99</span>
            </div>
            <div className="agentShowInfo">
              <CalendarToday className="agentShowIcon" />
              <span className="agentShowInfoTitle">10.12.2020</span>
            </div>
            <span className="agentShowTitle">Contact Details</span>
            <div className="agentShowInfo">
              <PhoneAndroid className="agentShowIcon" />
              <span className="agentShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="agentShowInfo">
              <MailOutline className="agentShowIcon" />
              <span className="agentShowInfoTitle">annabeck99@gmail.com</span>
            </div>
            <div className="agentShowInfo">
              <LocationSearching className="agentShowIcon" />
              <span className="agentShowInfoTitle">New York | USA</span>
            </div>
            <div className="agentShowInfo">
              <Facebook className="agentShowIcon" />
              <span className="agentShowInfoTitle">Anna Becker</span>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
}
