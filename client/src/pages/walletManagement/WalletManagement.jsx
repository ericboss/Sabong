import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./walletManagement.css";
import { useState } from "react";

export default function WalletStation() {
    const [agentWallet, setAgentWallet] = useState(null);

  return (
      <div className="commissionManagement">
          <h1 className="newUserTitle">Wallet Station</h1>
      
      <div className = "commissionsAmoutsbox">
      <div className="featuredItem">
        <span className="featuredTitle">Wallet</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          
        </div>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Selected User's Wallet</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${agentWallet}</span>
          
        </div>
      </div>
      </div>
    <div className="newUser">
      



      <form className="newUserForm">
      <div className="newUserItem">
          <label>Transaction Type</label>
          <select className="newUserSelect" name="transactionType" id="active">
          <option value="">Select transaction type</option>
            <option value="cashout">Cashout</option>
            <option value="cashin">Cashin</option>
          </select>
        </div>

        <div className="newUserItem">
          <label>Cashout From</label>
          <select className="newUserSelect" name="agentUsername" id="active">
          <option value="">Select username</option>
            <option value="agent1" >Agent One</option>
            <option value="agent2">player two</option>
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
