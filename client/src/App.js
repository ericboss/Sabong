import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import SummaryReport from "./pages/summaryReport/SummaryReport";
import ActivePlayerList from "./pages/activePlayers/ActivePlayerList";
import ForApprovalList from "./pages/forApprovalList/ForApprovalList";
import DeactivatedPlayerList from "./pages/deactivatedPlayerList/DeactivatedPlayerList";
import AgentList from "./pages/agentList/AgentList";
import Agent from "./pages/Agent/Agent";
import Setting from "./pages/settings/Settings";
import CommissionManagement from "./pages/commissionManagement/CommissionManageMent";
import WalletStation from "./pages/walletManagement/WalletManagement";
import MACashoutRequest from "./pages/masterAgentCashout/MasterAgentCashout";
import CommissionLogs from "./pages/commissionHistory/CommissionLogs";
import WalletHistory from "./pages/walletHistory/WalletHistory";
import MACashoutHistory from "./pages/masterAgentCashoutHistory/MACashoutHistory";


function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/summaryreport">
            <SummaryReport />
          </Route>
          <Route path = "/ActivePlayerList">
          <ActivePlayerList />
            </Route>
            <Route path = "/forApprovalList">
          <ForApprovalList />
            </Route>
            <Route path = "/deactivatedPlayers">
          <DeactivatedPlayerList />

          </Route>
            <Route path = "/agents">
          <AgentList />
            </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/products">
            <ProductList />
          </Route>
          <Route path="/agent/:agentId">
            <Agent />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/newproduct">
            <NewProduct />
          </Route>

          <Route path="/commission_management">
            <CommissionManagement />
            </Route>
            <Route path="/walletstation">
                <WalletStation/>
            </Route>
            <Route path="/macashoutrequest">
                <MACashoutRequest />
            </Route>
            <Route path="/commissionlogs">
                <CommissionLogs />
            </Route>
            <Route path="/walletlogs">
                <WalletHistory />
            </Route>
            <Route path="/macashouthistory">
                <MACashoutHistory />
            </Route>
          <Route path="/settings">
            <Setting />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
