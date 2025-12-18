import React from "react";
import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { BLUE_SKY, WHITE } from "../../../utils/colors";

const ChartsWidget: React.FC = () => {
  const currentMonthIndex = new Date().getMonth(); // 0 para Jan, 1 para Fev, etc.

  const stackData = [
    {
      stacks: [
        {
          value: 5320,
          color: BLUE_SKY,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        },
        {
          value: -1994,
          color: WHITE,
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
        },
      ],
      label: "Jan",
    },
    {
      stacks: [
        {
          value: 2320,
          color: BLUE_SKY,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        },
        {
          value: -3744,
          color: WHITE,
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
        },
      ],
      label: "Fev",
    },
    {
      stacks: [
        {
          value: 2320,
          color: BLUE_SKY,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        },
        {
          value: -3744,
          color: WHITE,
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
        },
      ],
      label: "Mar",
    },
    {
      stacks: [
        {
          value: 2320,
          color: BLUE_SKY,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        },
        {
          value: -3744,
          color: WHITE,
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
        },
      ],
      label: "Abr",
    },
    {
      stacks: [
        {
          value: 2320,
          color: BLUE_SKY,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        },
        {
          value: -3744,
          color: WHITE,
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
        },
      ],
      label: "Mai",
    },
    {
      stacks: [
        {
          value: 2320,
          color: BLUE_SKY,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        },
        {
          value: -3744,
          color: WHITE,
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
        },
      ],
      label: "Jun",
    },
    {
      stacks: [
        {
          value: 2320,
          color: BLUE_SKY,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        },
        {
          value: -3744,
          color: WHITE,
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
        },
      ],
      label: "Jul",
    },
    {
      stacks: [
        {
          value: 2320,
          color: BLUE_SKY,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        },
        {
          value: -3744,
          color: WHITE,
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
        },
      ],
      label: "Ago",
    },
    {
      stacks: [
        {
          value: 2320,
          color: BLUE_SKY,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        },
        {
          value: -3744,
          color: WHITE,
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
        },
      ],
      label: "Set",
    },
    {
      stacks: [
        {
          value: 2320,
          color: BLUE_SKY,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        },
        {
          value: -3744,
          color: WHITE,
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
        },
      ],
      label: "Out",
    },
    {
      stacks: [
        {
          value: 2320,
          color: BLUE_SKY,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        },
        {
          value: -3744,
          color: WHITE,
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
        },
      ],
      label: "Nov",
    },
    {
      stacks: [
        {
          value: 2320,
          color: BLUE_SKY,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        },
        {
          value: -3744,
          color: WHITE,
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
        },
      ],
      label: "Dez",
    },
  ].map((item, index) => ({
    ...item,
    labelTextStyle:
      index === currentMonthIndex
        ? {
            color: BLUE_SKY,
            fontWeight: "bold",
            marginLeft: -18,
            textAlign: "center",
          } // Destaque para o mês atual
        : undefined,
  }));

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
    <View style={{ marginBlockEnd: 30}}>
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
        stackData={stackData}
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
          marginLeft: -18, // Define uma largura maior que a barra para permitir centralização
        }}
      />
    </View>
  );
};

export default ChartsWidget;
