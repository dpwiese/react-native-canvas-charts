import type { WebView } from "react-native-webview";
import type { ChartConfiguration, ChartType } from "chart.js";
import type { ForwardedRef } from "react";

export type ChartJsData<TChartType extends ChartType = ChartType> = ChartConfiguration<TChartType>["data"];

export type SetNewConfigDataType<TChartType extends ChartType = ChartType> = Pick<
  ChartJsData<TChartType>,
  "labels" | "datasets"
>;

export type ChartJsRef = Partial<WebView> & {
  setNewConfigData: <TChartType extends ChartType = ChartType>(newConfig: SetNewConfigDataType<TChartType>) => void;
};

export type WithChartJsRef = { ref?: ForwardedRef<ChartJsRef> };
