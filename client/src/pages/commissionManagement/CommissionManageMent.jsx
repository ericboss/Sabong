import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./commissionManagement.css";
import { useState } from "react";

export default function CommissionManagement() {
    const [agentCommission, setAgentCommission] = useState(null);

  return (
      <div className="commissionManagement">
          <h1 className="newUserTitle">Commission Management</h1>
      
      <div className = "commissionsAmoutsbox">
      <div className="featuredItem">
        <span className="featuredTitle">Commissions</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          
        </div>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Selected Agent's Commissions</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${agentCommission}</span>
          
        </div>
      </div>
      </div>
    <div className="newUser">
      



      <form className="newUserForm">
      <div className="newUserItem">
          <label>Transaction Type</label>
          <select className="newUserSelect" name="transactionType" id="active">
            <option value="cashOut">Cashout</option>
          </select>
        </div>

        <div className="newUserItem">
          <label>Cashout From</label>
          <select className="newUserSelect" name="agentUsername" id="active">
          <option value="">Select Agent</option>
            <option value="agent1" >Agent One</option>
            <option value="agent2">Agent two</option>
            <option value="agent3">Agent three</option>
          </select>
        </div>
        <div className="newUserItem">
          <label>Amount</label>
          <input type="Number" placeholder="5000.0" />
        </div>
        <div className="newUserItem">
          <label>Details</label>
          <input type="text" />
        </div>
        
        <button className="newUserButton">Submit</button>
      </form>
    </div>
    </div>
  );
}
