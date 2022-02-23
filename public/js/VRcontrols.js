/**
 * Minified by jsDelivr using UglifyJS v3.3.23.
 * Original file: /npm/three-vrcontrols@1.0.0/VRControls.js
 * 
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
THREE.VRControls=function(i,n){var t,e=this;void 0!==navigator.getVRDevices?navigator.getVRDevices().then(function(o){for(var i=0;i<o.length;i++)if(o[i]instanceof PositionSensorVRDevice)return void(t=o[i]);void 0!==n&&n("HMD not available")}):void 0!==n&&n("Your browser is not VR Ready"),this.scale=1,this.update=function(){if(void 0!==t){var o=t.getState();null!==o.orientation&&i.quaternion.copy(o.orientation),null!==o.position&&i.position.copy(o.position).multiplyScalar(e.scale)}},this.zeroSensor=function(){void 0!==t&&t.zeroSensor()}};
//# sourceMappingURL=/sm/631b502b7c920b1aa6b06e24ea4d0c5d5a96c46765321fabc3f6a9b869a37bae.map