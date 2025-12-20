import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { BarChart, stackDataItem } from "react-native-gifted-charts";
import { BLUE_SKY, WHITE } from "../../../utils/colors";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { useAuth } from "../../../services/firebase/auth";
import { getMonthlySummaries } from "../../../services/transactions";
import { ChartsWidgetStyles } from "./ChartsWidget.styles";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const ChartsWidget: React.FC = () => {
  const currentMonthIndex = new Date().getMonth(); // 0 para Jan, 1 para Fev, etc.
  const { user } = useAuth();
  const [monthlySummaries, setMonthlySummaries] = useState<stackDataItem[]>([]);

  useEffect(() => {
    if (user) {
      getMonthlySummaries(user?.uid).then((monthlySummaries) => {
        console.log(JSON.stringify(monthlySummaries, null, 2));

        setMonthlySummaries(
          monthlySummaries.map((item, index) => ({
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
          }))
        );
      });
    }
  }, [user]);

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
              marginLeft: -18, // Define uma largura maior que a barra para permitir centralização
            }}
          />
        </>
      )}
    </View>
  );
};

export default ChartsWidget;
