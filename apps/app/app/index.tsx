import * as React from "react";
import { Platform } from "react-native";

const WebLayout = React.lazy(() => import("./_layout.web"));
const MobileLayout = React.lazy(() => import("./_layout_inner"));

function App() {
  console.log("Platform.OS", Platform.OS);
  return (
    <React.Suspense fallback={null}>
      {Platform.OS === "web" ? <WebLayout /> : <MobileLayout />}
    </React.Suspense>
  );
}

export default App;
