Ti.include("lib/map_util.js");

Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create controls tab and window
//

var win1 = Titanium.UI.createWindow({
    url : 'memory_form.js',
    title:'現在地',
    backgroundColor:'#fff',
    map:mapView
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'現在地',
    window:win1
});

var win2 = Titanium.UI.createWindow({
    url:'memory_list.js',
    title:'思い出',
    backgroundColor:'#fff',
    map:mapView
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'思い出',
    window:win2
});

var win3 = Titanium.UI.createWindow({
    url : 'landmark_view.js',
    title:'観光地',
    backgroundColor:'#fff',
    map:mapView
});
var tab3 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'観光地',
    window:win3
});

//
//  add tabs
//

tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);


// open tab group
tabGroup.open();
