cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-file/www/DirectoryEntry.js",
        "id": "cordova-plugin-file.DirectoryEntry",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.DirectoryEntry"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/DirectoryReader.js",
        "id": "cordova-plugin-file.DirectoryReader",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.DirectoryReader"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/Entry.js",
        "id": "cordova-plugin-file.Entry",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.Entry"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/File.js",
        "id": "cordova-plugin-file.File",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.File"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileEntry.js",
        "id": "cordova-plugin-file.FileEntry",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileEntry"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileError.js",
        "id": "cordova-plugin-file.FileError",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileError"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileReader.js",
        "id": "cordova-plugin-file.FileReader",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileReader"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileSystem.js",
        "id": "cordova-plugin-file.FileSystem",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileSystem"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileUploadOptions.js",
        "id": "cordova-plugin-file.FileUploadOptions",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileUploadOptions"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileUploadResult.js",
        "id": "cordova-plugin-file.FileUploadResult",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileUploadResult"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileWriter.js",
        "id": "cordova-plugin-file.FileWriter",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileWriter"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/Flags.js",
        "id": "cordova-plugin-file.Flags",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.Flags"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/LocalFileSystem.js",
        "id": "cordova-plugin-file.LocalFileSystem",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.LocalFileSystem"
        ],
        "merges": [
            "window"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/Metadata.js",
        "id": "cordova-plugin-file.Metadata",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.Metadata"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/ProgressEvent.js",
        "id": "cordova-plugin-file.ProgressEvent",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.ProgressEvent"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/fileSystems.js",
        "id": "cordova-plugin-file.fileSystems",
        "pluginId": "cordova-plugin-file"
    },
    {
        "file": "plugins/cordova-plugin-file/www/requestFileSystem.js",
        "id": "cordova-plugin-file.requestFileSystem",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.requestFileSystem"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/resolveLocalFileSystemURI.js",
        "id": "cordova-plugin-file.resolveLocalFileSystemURI",
        "pluginId": "cordova-plugin-file",
        "merges": [
            "window"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/browser/isChrome.js",
        "id": "cordova-plugin-file.isChrome",
        "pluginId": "cordova-plugin-file",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-file/www/browser/Preparing.js",
        "id": "cordova-plugin-file.Preparing",
        "pluginId": "cordova-plugin-file",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-file/src/browser/FileProxy.js",
        "id": "cordova-plugin-file.browserFileProxy",
        "pluginId": "cordova-plugin-file",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-file/www/fileSystemPaths.js",
        "id": "cordova-plugin-file.fileSystemPaths",
        "pluginId": "cordova-plugin-file",
        "merges": [
            "cordova"
        ],
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-file/www/browser/FileSystem.js",
        "id": "cordova-plugin-file.firefoxFileSystem",
        "pluginId": "cordova-plugin-file",
        "merges": [
            "window.FileSystem"
        ]
    },
    {
        "file": "plugins/cordova-plugin-advanced-http/www/lodash.js",
        "id": "cordova-plugin-advanced-http.lodash",
        "pluginId": "cordova-plugin-advanced-http"
    },
    {
        "file": "plugins/cordova-plugin-advanced-http/www/umd-tough-cookie.js",
        "id": "cordova-plugin-advanced-http.tough-cookie",
        "pluginId": "cordova-plugin-advanced-http"
    },
    {
        "file": "plugins/cordova-plugin-advanced-http/www/messages.js",
        "id": "cordova-plugin-advanced-http.messages",
        "pluginId": "cordova-plugin-advanced-http"
    },
    {
        "file": "plugins/cordova-plugin-advanced-http/www/local-storage-store.js",
        "id": "cordova-plugin-advanced-http.local-storage-store",
        "pluginId": "cordova-plugin-advanced-http"
    },
    {
        "file": "plugins/cordova-plugin-advanced-http/www/cookie-handler.js",
        "id": "cordova-plugin-advanced-http.cookie-handler",
        "pluginId": "cordova-plugin-advanced-http"
    },
    {
        "file": "plugins/cordova-plugin-advanced-http/www/angular-integration.js",
        "id": "cordova-plugin-advanced-http.angular-integration",
        "pluginId": "cordova-plugin-advanced-http"
    },
    {
        "file": "plugins/cordova-plugin-advanced-http/www/helpers.js",
        "id": "cordova-plugin-advanced-http.helpers",
        "pluginId": "cordova-plugin-advanced-http"
    },
    {
        "file": "plugins/cordova-plugin-advanced-http/www/advanced-http.js",
        "id": "cordova-plugin-advanced-http.http",
        "pluginId": "cordova-plugin-advanced-http",
        "clobbers": [
            "cordova.plugin.http"
        ]
    },
    {
        "file": "plugins/cordova-plugin-advanced-http/src/browser/cordova-http-plugin.js",
        "id": "cordova-plugin-advanced-http.http-proxy",
        "pluginId": "cordova-plugin-advanced-http",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/src/browser/DeviceProxy.js",
        "id": "cordova-plugin-device.DeviceProxy",
        "pluginId": "cordova-plugin-device",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/src/browser/SplashScreenProxy.js",
        "id": "cordova-plugin-splashscreen.SplashScreenProxy",
        "pluginId": "cordova-plugin-splashscreen",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-calendar/www/Calendar.js",
        "id": "cordova-plugin-calendar.Calendar",
        "pluginId": "cordova-plugin-calendar",
        "clobbers": [
            "Calendar"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
        "id": "cordova-plugin-camera.Camera",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "Camera"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
        "id": "cordova-plugin-camera.CameraPopoverOptions",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "CameraPopoverOptions"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/Camera.js",
        "id": "cordova-plugin-camera.camera",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "navigator.camera"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/src/browser/CameraProxy.js",
        "id": "cordova-plugin-camera.CameraProxy",
        "pluginId": "cordova-plugin-camera",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-file-transfer/www/FileTransferError.js",
        "id": "cordova-plugin-file-transfer.FileTransferError",
        "pluginId": "cordova-plugin-file-transfer",
        "clobbers": [
            "window.FileTransferError"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file-transfer/www/FileTransfer.js",
        "id": "cordova-plugin-file-transfer.FileTransfer",
        "pluginId": "cordova-plugin-file-transfer",
        "clobbers": [
            "window.FileTransfer"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file-transfer/www/browser/FileTransfer.js",
        "id": "cordova-plugin-file-transfer.BrowserFileTransfer",
        "pluginId": "cordova-plugin-file-transfer",
        "clobbers": [
            "window.FileTransfer"
        ]
    },
    {
        "file": "plugins/cordova-plugin-vibration/src/browser/Vibration.js",
        "id": "cordova-plugin-vibration.Vibration",
        "pluginId": "cordova-plugin-vibration",
        "merges": [
            "navigator"
        ]
    },
    {
        "file": "plugins/cordova-plugin-vibration/www/vibration.js",
        "id": "cordova-plugin-vibration.notification",
        "pluginId": "cordova-plugin-vibration",
        "merges": [
            "navigator"
        ]
    },
    {
        "file": "plugins/cordova-plugin-badge/www/badge.js",
        "id": "cordova-plugin-badge.Badge",
        "pluginId": "cordova-plugin-badge",
        "clobbers": [
            "cordova.plugins.notification.badge"
        ]
    },
    {
        "file": "plugins/cordova-plugin-badge/src/browser/favico.min.js",
        "id": "cordova-plugin-badge.Badge.Favico",
        "pluginId": "cordova-plugin-badge",
        "clobbers": [
            "cordova.plugins.notification.badge.Favico"
        ]
    },
    {
        "file": "plugins/cordova-plugin-badge/src/browser/BadgeProxy.js",
        "id": "cordova-plugin-badge.Badge.Proxy",
        "pluginId": "cordova-plugin-badge",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-app-version/www/AppVersionPlugin.js",
        "id": "cordova-plugin-app-version.AppVersionPlugin",
        "pluginId": "cordova-plugin-app-version",
        "clobbers": [
            "cordova.getAppVersion"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "id": "cordova-plugin-network-information.network",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "id": "cordova-plugin-network-information.Connection",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/src/browser/network.js",
        "id": "cordova-plugin-network-information.NetworkInfoProxy",
        "pluginId": "cordova-plugin-network-information",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-local-notification/www/local-notification.js",
        "id": "cordova-plugin-local-notification.LocalNotification",
        "pluginId": "cordova-plugin-local-notification",
        "clobbers": [
            "cordova.plugins.notification.local"
        ]
    },
    {
        "file": "plugins/cordova-plugin-local-notification/www/local-notification-core.js",
        "id": "cordova-plugin-local-notification.LocalNotification.Core",
        "pluginId": "cordova-plugin-local-notification",
        "clobbers": [
            "cordova.plugins.notification.local.core",
            "plugin.notification.local.core"
        ]
    },
    {
        "file": "plugins/cordova-plugin-local-notification/www/local-notification-util.js",
        "id": "cordova-plugin-local-notification.LocalNotification.Util",
        "pluginId": "cordova-plugin-local-notification",
        "merges": [
            "cordova.plugins.notification.local.core",
            "plugin.notification.local.core"
        ]
    },
    {
        "file": "plugins/cordova-plugin-crop/www/crop.js",
        "id": "cordova-plugin-crop.CropPlugin",
        "pluginId": "cordova-plugin-crop",
        "clobbers": [
            "plugins.crop"
        ]
    },
    {
        "file": "plugins/cordova-plugin-image-picker/www/imagepicker.js",
        "id": "cordova-plugin-image-picker.ImagePicker",
        "pluginId": "cordova-plugin-image-picker",
        "clobbers": [
            "plugins.imagePicker"
        ]
    },
    {
        "file": "plugins/cordova-plugin-fcm-with-dependecy-updated/www/FCMPlugin.js",
        "id": "cordova-plugin-fcm-with-dependecy-updated.FCMPlugin",
        "pluginId": "cordova-plugin-fcm-with-dependecy-updated",
        "clobbers": [
            "FCMPlugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-file": "6.0.1",
    "cordova-plugin-advanced-http": "1.11.1",
    "cordova-plugin-filepath": "1.4.2",
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-plugin-device": "2.0.2",
    "cordova-plugin-splashscreen": "5.0.2",
    "cordova-plugin-ionic-webview": "1.2.1",
    "cordova-plugin-ionic-keyboard": "2.1.3",
    "cordova-plugin-calendar": "5.1.3",
    "cordova-plugin-camera": "4.0.3",
    "cordova-plugin-file-transfer": "1.7.1",
    "cordova-plugin-vibration": "3.1.0",
    "cordova-android-support-gradle-release": "1.4.7",
    "cordova-plugin-badge": "0.8.8",
    "cordova-plugin-app-version": "0.1.9",
    "cordova-plugin-network-information": "2.0.1",
    "cordova-plugin-local-notification": "0.9.0-beta.2",
    "cordova-plugin-crop": "0.3.1",
    "cordova-plugin-allow-backup": "0.0.2",
    "cordova-plugin-image-picker": "1.1.1",
    "cordova-plugin-fcm-with-dependecy-updated": "2.4.0"
}
// BOTTOM OF METADATA
});