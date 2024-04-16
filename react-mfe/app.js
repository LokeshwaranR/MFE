import React from "react";
import ReactDOM from "react-dom";
import { Chart } from "primereact/chart";
import "./app.css";
import J1 from "./public/assets/J1.json";
import J2 from "./public/assets/J2.json";
import J3 from "./public/assets/J3.json";
import J4 from "./public/assets/J4.json";
import chartStore from "./MobXStore";
import { observer } from "mobx-react";
import { toJS } from 'mobx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
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
      },
      dataFromAngular: {},
    };
  }

  componentDidMount() {
    window.addEventListener("AngularToReact", this.handleDataFromAngular);
    const selectedCommunication = localStorage.getItem("selectedComm");
    if (selectedCommunication === "WBS") {
      const receivedData = localStorage.getItem("AtoR");
      if (receivedData) {
        this.mapData(JSON.parse(receivedData));
      } else {
        console.error("Error in getting Data from localStorage");
      }
    } else if (selectedCommunication === "CE") {
      console.log(chartStore.dataFromAngular);
      let AngularData = chartStore.getDataFromAngular();
      let originalData = toJS(AngularData);
      console.log(originalData);
      if (originalData  && originalData.data) {
        this.mapData(originalData.data);
      } else {
        console.error("Error in getting Data from service");
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("AngularToReact", this.handleDataFromAngular);
  }

  handleDataFromAngular = (event) => {
    console.log("Received data from Angular:", event.detail);
    chartStore.updateDataFromAngular(event.detail);
  };

  mapData(jsonData) {
    let data = {
      labels: jsonData.map((data) => data.name),
      datasets: [
        {
          label: "Value Transition from Angular to React",
          data: jsonData.map((data) => data.value),
        },
      ],
    };
    chartStore.updateChartData(data);
  }

  sendData = async () => {
    try {
      let selectedJsonFile = localStorage.getItem("selectedJson");
      let selectedCommunication = localStorage.getItem("selectedComm");
      let jsonData = this.getJsonData(selectedJsonFile);
      console.log("data:", jsonData);
      this.setJSONForComm(jsonData, selectedCommunication);
    } catch (error) {
      console.error("Failed to send data:", error);
    }
  };

  getJsonData = (selectedJson) => {
    if (selectedJson == "J1") {
      return J1;
    } else if (selectedJson == "J2") {
      return J2;
    } else if (selectedJson == "J3") {
      return J3;
    } else if (selectedJson == "J4") {
      return J4;
    }
  };
  setJSONForComm(json, comm) {
    if (comm == "WBS") {
      if (localStorage.getItem("RtoA")) {
        localStorage.removeItem("RtoA");
      }
      localStorage.setItem("RtoA", JSON.stringify(json));
    } else if (comm == "CE") {
      const event = new CustomEvent("ReactToAngular", {
        detail: {
          message: "This is a custom event from React to Angular",
          data: json,
        },
      });
      window.dispatchEvent(event);
    } else if (comm == 'SPB'){
      const event = new CustomEvent("ReactToParent", {
        detail: {
          message: "This is a custom event from React to Parent Angular",
          data: json,
        },
      });
    }
  }

  render() {
    const reactVersion = require("./package.json").dependencies["react"];
    const logoUrl =
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg";

    const options = {
      plugins: {
        legend: {
          display: true,
          position: "bottom",
        },
      },
      scales: {
        x: {
          display: true,
        },
        y: {
          display: true,
          beginAtZero: true,
        },
      },
    };

    return [
      <div className="box-header">
        <div
          className="box"
          onClick={this.sendData}
          style={{ marginTop: "10px", marginBottom: "20px" }}
        >
          <div>Send Data</div>
        </div>
      </div>,
      <Chart
        type="line"
        data={chartStore.chartData}
        options={options}
        height="60vh"
        className="w-full"
      />,
      <h1 key="mfe">
        <img
          src={logoUrl}
          alt="React Logo"
          style={{ marginRight: "10px" }}
          height="20"
        />
        React MFE
      </h1>,
      <p key="version">React Version: {reactVersion}</p>,
    ];
  }
}

class ReactMfe extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<App />, this);
  }
}

customElements.define("react-element", ReactMfe);
export default observer(App);
