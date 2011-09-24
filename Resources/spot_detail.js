var win = Ti.UI.currentWindow;
win.backgroundColor = '#fff';

var data = [];

var spotDetailScrollView = Ti.UI.createScrollView({
        touchEnabled:false
});

var name = win.spot.name;
var description = win.spot.description;
var lat = win.spot.lat;
var lng = win.spot.lng;
var mapScale = win.spot.map_scale;
var countryName = "国：" + win.spot.country.name;
var cityName = "都市：" + win.spot.city.name;

var closeButton = Ti.UI.createButton(
    {
        top:5,
        width:200,
        height:'auto',
        title:'戻る'
    }
);
spotDetailScrollView.add(closeButton);

closeButton.addEventListener(
    'click',
    function(){
        spotMapView.removeAnnotation(spotPin);
        win.close();
    }
);

var nameLabel = Ti.UI.createLabel(
    {
        top:50,
        left:10,
        heigt:20,
        font:{
            fontSize:25,
            fontWeight:'bold'
        },
        color:'black',
        touchEnabled:false,
        text:name
    }
);
spotDetailScrollView.add(nameLabel);

var countryLabel = Ti.UI.createLabel(
    {
        top:350,
        left:30,
        heigt:20,
        font:
        {
            fontSize:15
        },
        color:'black',
        touchEnabled:false,
        text:countryName
    }
);
spotDetailScrollView.add(countryLabel);

var cityLabel = Ti.UI.createLabel(
    {
        top:380,
        left:30,
        heigt:20,
        font:
        {
            fontSize:15
        },
        color:'black',
        touchEnabled:false,
        text:cityName
    }
);
spotDetailScrollView.add(cityLabel);

var spotMapView = win.map;
spotMapView.width = 240;
spotMapView.height = 200;
spotMapView.top = 130;
spotMapView.region = {
    latitude:lat,
    longitude:lng,
    latitudeDelta:0.1,
    longitudeDelta:0.1
};

var spotPin = Titanium.Map.createAnnotation(
    {
        latitude : lat,
        longitude : lng,
        title : name,
        pincolor : Titanium.Map.ANNOTATION_RED,
        animate : true
    }
);
spotMapView.addAnnotation(spotPin);
spotDetailScrollView.add(spotMapView);

var descriptionLabel = Ti.UI.createLabel(
    {
        top:410,
        left:30,
        right:30,
        heigt:'auto',
        font:
        {
            fontSize:15
        },
        color:'black',
        touchEnabled:false,
        text:description
    }
);
spotDetailScrollView.add(descriptionLabel);

win.add(spotDetailScrollView);