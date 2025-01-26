import * as React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/Header";
import Overview from "@/components/Overview";
import HistoryList from "@/components/HistoryList";
import Footer from "@/components/Footer";
import { Padding, Gap } from "../../GlobalStyles";

const Dashboard = () => {
  return (
    <>
      <LinearGradient
        style={styles.dashboard}
        locations={[0, 0.38]}
        colors={["#dfffdf", "#fff"]}
      >
        <Header />
        <Overview />
        <HistoryList />
      </LinearGradient>
      <Footer />
    </>
  );
};

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    width: "100%",
    height: 812, // TODO
    overflow: "hidden",
    paddingHorizontal: Padding.p_5xl,
    paddingTop: Padding.p_5xl,
    gap: Gap.gap_sm,
    backgroundColor: "transparent",
    alignItems: "center",
  },
});

export default Dashboard;
