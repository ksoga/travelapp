/**
 * MapView
 * Androidでは1アプリ1MapViewのためapp.jsにインクルードして各windowに引き回して使用する
 * ※決してapp.js以外にインクルードはしない
 */
var mapView = Titanium.Map.createView(
    {
        mapType : Titanium.Map.STANDARD_TYPE,
        animate:true,
        regionFit:false,
        top:130
    }
);

