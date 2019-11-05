#!bin/bash
declare -a arr=("cordova-plugin-advanced-http" "cordova-plugin-filepath" "cordova-plugin-whitelist" "cordova-plugin-device" "cordova-plugin-splashscreen" "cordova-plugin-ionic-webview" "cordova-plugin-ionic-keyboard" "cordova-plugin-calendar" "cordova-plugin-camera" "cordova-plugin-file-transfer" "cordova-plugin-vibration" "cordova-android-support-gradle-release" "cordova-plugin-badge" "cordova-plugin-app-version" "cordova-plugin-network-information" "cordova-plugin-local-notification" "cordova-plugin-crop" "cordova-plugin-allow-backup" "cordova-plugin-image-picker" "cordova-plugin-fcm-with-dependecy-updated")

## now loop through the above array
for i in "${arr[@]}"
do
    echo "$i"
    ionic cordova plugin add  "$i"
   # or do whatever with individual element of the array
done
