import React from "react";
import { View, Text } from "react-native";
import { BarChart, stackDataItem } from "react-native-gifted-charts";
import { BLUE_SKY, WHITE } from "../../../utils/colors";
import { ChartsWidgetStyles } from "./ChartsWidget.styles";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const ChartsWidget: React.FC<{ monthlySummaries: stackDataItem[] }> = ({ monthlySummaries }) => {
  const currentMonthIndex = new Date().getMonth();

  const renderLegend = (color: string, label: string) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10,
      }}
    >
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 6,
        }}
      />
      <Text style={{ color: WHITE, fontSize: 12 }}>{label}</Text>
    </View>
  );

  return (
    <View style={{ marginBlockEnd: 30, paddingInline: 25}}>
      {monthlySummaries.length === 0 ? (
        <View style={ChartsWidgetStyles.noData}>
          <MaterialIcons name="info-outline" size={24} color="black" />
          <Text>Movimente sua conta.</Text>
        </View>
      ) : (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginInlineEnd: 20,
              marginBlockEnd: 20,
            }}
          >
            {renderLegend(BLUE_SKY, "Receitas")}
            {renderLegend(WHITE, "Despesas")}
          </View>
          <BarChart
            height={120}
            barWidth={9}
            spacing={40}
            noOfSections={4}
            stackData={monthlySummaries}
            hideRules
            hideYAxisText
            yAxisThickness={0}
            xAxisThickness={0}
            xAxisLabelsAtBottom={true}
            scrollToIndex={currentMonthIndex}
            xAxisLabelTextStyle={{
              color: WHITE,
              fontSize: 14,
              textAlign: "center",
              marginLeft: -18,
            }}
          />
        </>
      )}
    </View>
  );
};

export default ChartsWidget;
