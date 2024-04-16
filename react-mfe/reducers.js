import { SET_CHART_DATA, SET_DATA_FROM_ANGULAR } from './actions';

const initialState = {
  chartData: {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [{
      label: "Demo Data",
      data: [65, 59, 80, 81, 56],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.4,
    }],
  },
  dataFromAngular: {}
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CHART_DATA:
      return { ...state, chartData: action.payload };
    case SET_DATA_FROM_ANGULAR:
      return { ...state, dataFromAngular: action.payload };
    default:
      return state;
  }
}

export default rootReducer;
