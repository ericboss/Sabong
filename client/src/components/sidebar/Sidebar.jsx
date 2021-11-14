import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  PeopleOutline,
  HighlightOff,
  AccountBalance,
  Settings,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Summary Report
            </li>
          
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Report Archives
            </li>
            <Link to = "/commissionlogs" className="link">
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Commission History
            </li>
            </Link>
            <Link to = "/walletLogs" className="link">
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Wallet History
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Loading Station</h3>
          <ul className="sidebarList">
            <Link to="/walletstation" className="link">
              <li className="sidebarListItem">
                <AccountBalance className="sidebarIcon" />
                Wallet
              </li>
            </Link>
            <Link to="/commission_management" className="link">
  
              <li className="sidebarListItem">
                <AccountBalance className="sidebarIcon" />
                Commision
              </li>
            </Link>
            
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Players</h3>
          <ul className="sidebarList">
            <Link to="/ActivePlayerList" className="link">
            <li className="sidebarListItem">
              <PeopleOutline className="sidebarIcon" />
              Active Players
            </li>
            </Link>
            <Link to="/forApprovalList" className='link'>
            <li className="sidebarListItem">
              <PeopleOutline className="sidebarIcon" />
              For Approvals
            </li>
            </Link>
            <Link to="/deactivatedPlayers" className="link">
            <li className="sidebarListItem">
              <HighlightOff className="sidebarIcon" />
              Deactivated
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Master Agent</h3>
          <ul className="sidebarList">
            <Link to="/macashoutrequest" className="link">
            <li className="sidebarListItem">
              <AccountBalance className="sidebarIcon" />
              Cashout request
            </li>
            </Link>
            <Link to="/macashouthistory" className="link">
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Cashout History
            </li>
            </Link>
            
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Sub Agents</h3>
          <ul className="sidebarList">
            <Link to ="/agents" className="link">
            <li className="sidebarListItem">
              <PeopleOutline className="sidebarIcon" />
              My Agent Lists
            </li>
            </Link>
            
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Settings</h3>
          <ul className="sidebarList">
            <Link to="/settings" className="link">
            <li className="sidebarListItem">
              <Settings className="sidebarIcon" />
              Settings
            </li>
            </Link>
            
          </ul>
        </div>
      </div>
    </div>
  );
}
