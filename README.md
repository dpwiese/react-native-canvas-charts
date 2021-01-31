# react-native-canvas-charts

![node-ci](https://github.com/dpwiese/react-native-canvas-charts/workflows/node-ci/badge.svg)
![npm (scoped)](https://img.shields.io/npm/v/@dpwiese/react-native-canvas-charts)

[react-native-canvas-charts](https://github.com/dpwiese/react-native-canvas-charts) provides a simple wrapper around [react-native-webview](https://github.com/react-native-webview/react-native-webview) for making canvas-based charts in React Native.

## Install

```sh
% npm i --save react-native-webview @dpwiese/react-native-canvas-charts
% cd ios && pod install
```

## Using

### Chart.js

Currently [react-native-canvas-charts](https://github.com/dpwiese/react-native-canvas-charts) only supports [Chart.js](https://www.chartjs.org) version 3.
To use, simply import `ChartJs`, define the standard Chart.js [Dataset Configuration](https://www.chartjs.org/docs/master/configuration/index#dataset-configuration) and pass it to the `config` prop.

```
import { ChartJs } from "@dpwiese/react-native-canvas-charts";
import React from "react";

const chartConfig = {
  type: "line",
  data: {
    datasets: [
      {
        label: "My Legend Label",
        backgroundColor: "rgb(224, 110, 60)",
        borderColor: "rgb(224, 110, 60)",
        data: [
          { x: 1, y: 2 },
          { x: 2, y: 5 },
          { x: 3, y: 3 },
        ],
        fill: false,
        pointRadius: 0,
        lineTension: 0.1,
        borderJoinStyle: "round",
      },
    ],
  },
  options: {
    animation: {
      duration: 0,
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "My Title",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      x: {
        type: "linear",
        display: true,
        scaleLabel: {
          display: true,
          labelString: "My X-Axis Label",
        },
        ticks: {
          autoSkipPadding: 100,
          autoSkip: true,
          minRotation: 0,
          maxRotation: 0,
        },
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "My Y-Axis Label",
        },
      },
    },
  },
};

export default () => <ChartJs config={chartConfig} style={{height: 500}}/>;
```

### Streaming Data

To stream data to the chart, the `setData` ref can be used as below

```
import { ChartJs } from "@dpwiese/react-native-canvas-charts";
import React, { useRef } from "react";
import { chartConfig } from "./chartConfig";

export default () => {
  const setDataRef = useRef<SetData>();

  // Update the charted data with newData
  setDataRef.current?.setData([allData.concat(newData)]);

  return (<ChartJs config={chartConfig} style={{height: 500}} ref={setDataRef}/>);
}
```
