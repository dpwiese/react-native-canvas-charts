import React, { ReactElement, forwardRef, useImperativeHandle } from "react";
import { StyleProp, StyleSheet, View, ViewStyle, useWindowDimensions } from "react-native";
import { WebView } from "react-native-webview";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const htmlTemplate = require("./index.html");

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  webview: {
    height: "100%",
    width: "100%",
  },
});

export type SetData = {
  setData: (data: number[][]) => void;
};

type ChartStyle = StyleProp<ViewStyle> & { height: number };

type Props = {
  opts: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  data: number[][];
  style?: ChartStyle;
};

export const UPlot = forwardRef(
  (props: Props, ref): ReactElement => {
    let webref: WebView<{ originWhitelist: string[]; ref: unknown; source: { html: string } }> | null;
    const windowWidth = useWindowDimensions().width;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const addChart = (opts: any, data: number[][]): void => {
      // Subtracting height of u-title and u-legend and some more?
      opts.height = (props.style?.height || 200) - 27 - 58 - 30;
      opts.width = windowWidth - 20;
      webref?.injectJavaScript(
        `let uplot = new uPlot(${JSON.stringify(opts)}, ${JSON.stringify(data)}, document.body);true;`
      );
    };

    const setData = (data: number[][]): void => {
      webref?.injectJavaScript(`uplot.setData(${JSON.stringify(data)});true;`);
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
          source={htmlTemplate}
          onLoadEnd={(): void => {
            addChart(props.opts, props.data);
          }}
          style={styles.webview}
        />
      </View>
    );
  }
);
