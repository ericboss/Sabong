import LineCharts from "../../components/chart/LineCharts";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData, PieChartdata } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import PieCharts from "../../components/chart/PieChart";

export default function Home() {
  return (
    <div className="home">
      <FeaturedInfo />
      <div className="charts">
        <LineCharts data={userData} title="Commission Spread" grid dataKey="Commissions"/>
      <PieCharts pieChartData={PieChartdata}  title="Commission Sources"/>
      </div>
      
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
