# Perfectp_MapPart
CSCI577a - Software Development - Team 05 - Perfecto Coffee

## Getting Started :
+ Follow the instructions in https://facebook.github.io/react-native/docs/getting-started.html, choose "Building Projects with Native Code"， then select your development OS and targeted OS.
### If you get an error like "Print: Entry, ":CFBundleIdentifier", Does Not Exist":
+ Run the command **"react-native upgrade"** in your Terminal

## Google Map Installation:
+ Follow the instructions in https://github.com/react-community/react-native-maps/blob/master/docs/installation.md, highly remommend **"Using React Native Link"**"
### If you get an error like "Invariant Violation: requireNativeComponent: "AirMap" was not found in the UIManager":
+ Use **Xcode** to open project
+ Find **Libraries** in Project Navigator and click right to choose **Add Files to "[Your Project]" ...**
+ Find **AirMaps.xcodeproj** in **node_modules/react-native-maps/lib/ios** and add it
+ Find **Link Binary With Libraries** in **Build Phases** and add **libAirMaps.a**
+ See more discussions in https://github.com/react-community/react-native-maps/issues/2005

## Google Place Installation:
+ Follow the instructions in https://github.com/tolu360/react-native-google-places, highly remommend **Manual Linking With Your Project (iOS)**

## Google Place Autocomplete Installation:
+ Follow the instructions in https://github.com/FaridSafi/react-native-google-places-autocomplete



