import { Text, StyleSheet, View, ScrollView } from "react-native";
import HistoryRow from "./HistoryRow";
import { Gap, Color, FontFamily, FontSize } from "@/GlobalStyles";
import Btn from "./Btn";

const HistoryList = () => {
  return (
    <View style={[styles.history]}>
      <View style={[styles.historyParent, styles.frameGroupFlexBox]}>
        <Text style={[styles.history1, styles.historyTypo]}>History</Text>
        {/* <Text style={styles.e325027}>E£3,250.27</Text> */}
      </View>
      <ScrollView
        contentContainerStyle={{
          rowGap: 8,
        }}
      >
        <HistoryRow
          image={require("@/assets/frame-15.svg")}
          caption="Daily Payout February"
          amount="E£12,345.67"
        />
        <HistoryRow
          image={require("@/assets/frame-17.svg")}
          caption="Bond Payout"
          amount="E£9,876.54"
        />
        <HistoryRow
          image={require("@/assets/frame-171.svg")}
          caption="Deposited"
          amount="E£4,567.89"
        />
        <HistoryRow
          image={require("@/assets/frame-172.svg")}
          caption="Sent To"
          amount="E£98,765.43"
        />
        <Btn caption="View all history" variant="List" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  frameGroupFlexBox: {
    gap: Gap.gap_3xs,
    alignSelf: "stretch",
  },
  historyTypo: {
    color: Color.dardColor,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
  },
  history1: {
    fontSize: FontSize.subtitle1_size,
    textAlign: "left",
  },
  e325027: {
    fontFamily: FontFamily.textMdL24Regular,
    color: Color.taglineColor,
    fontSize: FontSize.caption_size,
    textAlign: "left",
  },
  historyParent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  viewAllHistory: {
    lineHeight: 18,
    textAlign: "center",
    flex: 1,
    fontSize: FontSize.caption_size,
  },
  history: {
    paddingLeft: 16,
    paddingRight: 16,
    alignSelf: "stretch",
  },
});

export default HistoryList;
