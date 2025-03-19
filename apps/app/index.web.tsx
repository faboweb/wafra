import * as React from "react";
import { AppRegistry } from "react-native";
import WebLayout from "./app/_layout.web.js";

function AppWrapper() {
  return <WebLayout />;
}

AppRegistry.registerComponent("main", () => AppWrapper);
AppRegistry.runApplication("main", {
  initialProps: {},
  rootTag: document.getElementById("root"),
});
