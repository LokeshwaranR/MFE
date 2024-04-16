import { makeObservable, observable, action } from 'mobx';
import { makeAutoObservable } from "mobx";
class ChartStore {
  chartData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Demo Data",
        data: [65, 59, 80, 81, 56],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.4,
      },
    ],
  };
  dataFromAngular = {}
  constructor(){
    makeAutoObservable(this);
  }
  updateChartData(newData) {
    this.chartData = newData;
  }
  updateDataFromAngular(newData) {
    this.dataFromAngular = newData;
  }

  getDataFromAngular(){
    return this.dataFromAngular;
  }
  getChartData(){
    return this.chartData;
  }

}

const chartStore = new ChartStore();
export default chartStore;