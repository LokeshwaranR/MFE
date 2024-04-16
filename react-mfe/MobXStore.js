import { makeObservable, observable, action } from 'mobx';

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

  updateChartData(newData) {
    this.chartData = newData;
  }
  updateDataFromAngular(newData) {
    this.dataFromAngular = newData;
  }

}

const chartStore = new ChartStore();
export default chartStore;