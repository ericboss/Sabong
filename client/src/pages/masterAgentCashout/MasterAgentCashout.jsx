import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./masterAgentCashout.css";
import { useState } from "react";

export default function MACashoutRequest() {
   

  return (
      <div className="commissionManagement">
          <h1 className="newUserTitle">Agent Widthrawal Request</h1>
      
      <div className = "commissionsAmoutsbox">
      <div className="featuredItem">
        <span className="featuredTitle">Current Wallet</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          
        </div>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Current Commission</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$14,236</span>
          
        </div>
      </div>
      </div>
    <div className="newUser">
      



      <form className="newUserForm">
      <div className="newUserItem">
          <label>Transaction Type</label>
          <select className="newUserSelect" name="transactionType" id="active">
            <option value="widthraw">Widthraw</option>
          </select>
        </div>

        <div className="newUserItem">
          <label>Wallet Type</label>
          <select className="newUserSelect" name="agentUsername" id="active">
          <option value="">Select wallet to transact with</option>
            <option value="agent1" >Current Points</option>
            <option value="agent2">Commission</option>
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
