import React, { ReactElement, forwardRef, useImperativeHandle } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { WebView } from "react-native-webview";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const chartJsHtml = require("./index.html");

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  webview: {
    height: "100%",
    width: "100%",
  },
});

export type DataPoint = {
  x: number;
  y: number;
};

export type SetData = {
  setData: (data: DataPoint[][]) => void;
};

type Props = {
  config: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  dataSets?: DataPoint[][];
  style?: StyleProp<ViewStyle>;
};

export const ChartJs = forwardRef(
  (props: Props, ref): ReactElement => {
    let webref: WebView<{ originWhitelist: string[]; ref: unknown; source: { html: string } }> | null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const addChart = (config: any): void => {
      webref?.injectJavaScript(`const canvasEl = document.createElement("canvas");
        canvasEl.height = ${JSON.stringify(styles.webview.height)};
        document.body.appendChild(canvasEl);
        window.canvasLine = new Chart(canvasEl.getContext('2d'), ${JSON.stringify(config)});true;`);
    };

    const setData = (dataSets: DataPoint[][]): void => {
      if (dataSets) {
        dataSets.forEach((_: DataPoint[], i: number) => {
          webref?.injectJavaScript(`window.canvasLine.config.data.datasets[${i}].data = ${JSON.stringify(dataSets[i])};
          window.canvasLine.update();true;`);
        });
      }
    };

    useImperativeHandle(ref, () => ({
      setData,
    }));

    return (
      // eslint-disable-next-line @typescript-eslint/ban-types
      <View style={{ ...styles.container, ...(props.style as {}) }}>
        <WebView
          originWhitelist={["*"]}
          ref={(r): WebView<{ originWhitelist: string[]; ref: unknown; source: { html: string } }> | null =>
            (webref = r)
          }
          source={chartJsHtml}
          onLoadEnd={(): void => {
            addChart(props.config);
          }}
          style={styles.webview}
        />
      </View>
    );
  }
);
