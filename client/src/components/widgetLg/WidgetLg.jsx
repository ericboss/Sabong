import "./widgetLg.css";
import { SupervisorAccount} from "@material-ui/icons"
import { latestTransactionData } from "../../dummyData"
export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Name</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">transaction type</th>
        </tr>
        { latestTransactionData && latestTransactionData.map((data)=>(<tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src={data.image}
              alt=""
              className="widgetLgImg"
            />
            <div className="names">
            <span className="widgetLgName">{data.name}</span>
            <span className="widgetLgNameTitle">{data.title}</span>
            </div>
            
          </td>
          <td className="widgetLgDate">{data.date}</td>
          <td className="widgetLgAmount">₱{data.Amount}</td>
          <td className="widgetLgStatus">
            <Button type={data.transactionType} />
          </td>
        </tr>))}
        
      </table>
    </div>
  );
}
