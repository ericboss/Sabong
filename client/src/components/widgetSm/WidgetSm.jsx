import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import {commissionSourcesData} from "../../dummyData"
export default function WidgetSm() {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Top Commissions Sources</span>
      <ul className="widgetSmList">
        {commissionSourcesData && commissionSourcesData.map((data) =>(<li className="widgetSmListItem">
          <img
            src={data.image}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{data.name}</span>
            <span className="widgetSmUserTitle">{data.title}</span>
          </div>
          <span className="widgetSmButton">
           
          ₱{data.amount}
          </span>
        </li>))}
        
      </ul>
    </div>
  );
}
