export const SET_CHART_DATA = 'SET_CHART_DATA';
export const SET_DATA_FROM_ANGULAR = 'SET_DATA_FROM_ANGULAR';

export function setChartData(data) {
  return { type: SET_CHART_DATA, payload: data };
}

export function setDataFromAngular(data) {
  return { type: SET_DATA_FROM_ANGULAR, payload: data };
}