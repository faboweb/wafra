import * as React from "react";
import { StyleSheet, View } from "react-native";
import { CrossPlatformGradient } from "@/components/CrossPlatformGradient";
import Header from "@/components/Header";
import Overview from "@/components/Overview";
// import HistoryList from "@/components/HistoryList";
import Footer from "@/components/Footer";
import { Padding, Gap } from "../../GlobalStyles";
import { useAccount } from "@/hooks/useAccount";
import { useRouter } from "@/hooks/useRouter";
import { TransactionHistory } from "@/components/TransactionHistory";

const Dashboard = () => {
  const { account } = useAccount();
  const router = useRouter();

  React.useEffect(() => {
    if (!account) {
      router.push("/");
    }
  }, []);

  return (
    <View style={styles.container}>
      <CrossPlatformGradient
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.38 }}
        colors={["#dfffdf", "#fff"]}
      />
      <Header />
      <Overview />
      <TransactionHistory />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    padding: Padding.p_5xl,
  },
});

export default Dashboard;
