package com.encryptednotesapp

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.JSIModule
import com.facebook.react.bridge.JSIModulePackage
import com.facebook.react.bridge.JSIModuleSpec
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.flipper.ReactNativeFlipper
import com.facebook.soloader.SoLoader
import com.nozbe.watermelondb.jsi.WatermelonDBJSIPackage

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              // Packages that cannot be autolinked yet can be added manually here, for example:
              // add(MyReactNativePackage())
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
          override fun getJSIModulePackage(): JSIModulePackage {
              return JSIModulePackage { reactApplicationContext, jsContext ->
                  val modules = mutableListOf<JSIModuleSpec<JSIModule>>()
                  // Add WatermelonDB JSI package
                  modules.addAll(WatermelonDBJSIPackage().getJSIModules(reactApplicationContext, jsContext))
                  // Add more JSI packages here by conventions above, for example:
                  // modules.addAll(ReanimatedJSIModulePackage().getJSIModules(reactApplicationContext, jsContext))
                  modules
              }
          }
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(this.applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }
    ReactNativeFlipper.initializeFlipper(this, reactNativeHost.reactInstanceManager)
  }
}
