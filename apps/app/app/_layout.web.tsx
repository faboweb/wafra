import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Providers } from "@/providers/providers";
import WebRouter from "./_router.web";

export default function WebLayout() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <Providers>
          <WebRouter />
        </Providers>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
    width: "100%",
    backgroundColor: "#f5f5f5",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "430px",
    minHeight: "100%",
    backgroundColor: "white",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    flex: 1,
  },
});
