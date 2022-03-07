import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import type { ViewStyle } from "react-native";
import type { RefObject } from "react";
import type { ChartConfiguration, ChartType } from "chart.js";
import type { ChartJsRef, SetNewConfigDataType, WithChartJsRef } from "./types";

// TODO fork of https://github.com/dpwiese/react-native-canvas-charts
//  added setting labels
//  added generic types
//  once fully integrated and tested, do something for the community (make an MR)
const htmlTemplate = require("./index.html");

const styles = StyleSheet.create({
  webview: {
    height: "100%",
    width: "100%",
  },
});

export type ChartJsProps<TChartType extends ChartType = ChartType> = {
  initialConfig: ChartConfiguration<TChartType>;
  style?: ViewStyle;
};

const ChartJsForwarded = forwardRef<ChartJsRef, ChartJsProps>((props, ref) => {
  const webRef = useRef<WebView>();

  function addChart<TChartType extends ChartType = ChartType>(
    initialConfig: ChartJsProps<TChartType>["initialConfig"]
  ) {
    const chartHeight = JSON.stringify(styles.webview.height);
    const chartConfig = JSON.stringify(initialConfig);
    webRef?.current?.injectJavaScript(`const canvasEl = document.createElement("canvas");
        canvasEl.height = ${chartHeight};
        document.body.appendChild(canvasEl);
        window.canvasLine = new Chart(canvasEl.getContext('2d'), ${chartConfig});true;`);
  }

  function setNewConfigData<TChartType extends ChartType = ChartType>(data: SetNewConfigDataType<TChartType>) {
    data.datasets.forEach((_item, i: number) => {
      const yAxisData = JSON.stringify(data.datasets[i].data);
      const xAxisData = JSON.stringify(data.labels);
      webRef?.current?.injectJavaScript(`window.canvasLine.config.data.datasets[${i}].data = ${yAxisData};
			window.canvasLine.config.data.labels = ${xAxisData};
			window.canvasLine.update();true;`);
    });
  }

  useImperativeHandle(ref, () => ({
    setNewConfigData,
  }));

  const webViewWrapperStyle: ViewStyle = {
    overflow: "hidden",
    ...props.style,
  };

  return (
    <View style={webViewWrapperStyle}>
      <WebView
        originWhitelist={["*"]}
        ref={webRef as RefObject<WebView<unknown>>}
        source={htmlTemplate}
        onLoadEnd={(): void => {
          addChart(props.initialConfig);
        }}
        style={styles.webview}
      />
    </View>
  );
});

export const ChartJs = ChartJsForwarded as <TChartType extends ChartType = ChartType>(
  props: ChartJsProps<TChartType> & WithChartJsRef
) => ReturnType<typeof ChartJsForwarded>;
