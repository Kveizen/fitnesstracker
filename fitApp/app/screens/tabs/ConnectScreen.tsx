import React from "react";
import {
  View,
  Button,
  StyleSheet,
  NativeEventEmitter,
  NativeModules,
} from "react-native";

import BleManager from "react-native-ble-manager"; // Import the BleManager module
const BleManagerModule = NativeModules.BleManager; // Create a new BleManagerModule
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule); // Create a new BleManagerEmitter

function ConnectScreen() {
  const handleConnect = () => {
    BleManager.start({ showAlert: false }).then(() => {
      console.log("Module initialized");
      BleManager.getBondedPeripherals().then((p) => console.log(p));
    });
    BleManager.enableBluetooth().then(() => {
      console.log("Bluetooth enabled");
    });
    let is_scanning = true;
    BleManagerEmitter.addListener("BleManagerDiscoverPeripheral", (s) => {
      if (is_scanning && s.name == "fitnes_tracker_3000") {
        is_scanning = false;
        BleManager.connect(s.id).then(() => {
          console.log("Connected to device");

          console.log(s);

        });
      }
    });
    BleManager.scan([], 1, true).then(() => {
      console.log("Scanning");
    });
    console.log("Connect button pressed");
  };

  return (
    <View style={styles.container}>
      <Button title="Connect" onPress={handleConnect} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ConnectScreen;
