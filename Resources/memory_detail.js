var win = Ti.UI.currentWindow;
win.backgroundColor = '#fff';

var memoryDetailScrollView = Ti.UI.createScrollView({
    touchEnabled:false
});

var title = win.memory.title;
var description = win.memory.description;
var lat = win.memory.lat;
var lng = win.memory.lng;
var createData = win.memory.create_date;

var closeButton = Ti.UI.createButton(
    {
        top:5,
        width:260,
        left:30,
        height:'auto',
        title:'戻る'
    }
); 

memoryDetailScrollView.add(closeButton);

closeButton.addEventListener(
    'click',
    function(){
        memoryMapView.removeAnnotation(memoryPin);
        win.close();
    }
);

var titleLabel = Ti.UI.createLabel(
    {
        top:50,
        left:10,
        height:'auto',
        font:
        {
            fontSize:25,
            fontWeight:'bold'
        },
        color:'black',
        touchEnabled:false,
        text:title
    }
);
memoryDetailScrollView.add(titleLabel);

var memoryMapView = win.map;
memoryMapView.width = 240;
memoryMapView.height = 200;
memoryMapView.left = 30;
memoryMapView.top = 130;
memoryMapView.region = {
    latitude:lat,
    longitude:lng,
    latitudeDelta:0.1,
    longitudeDelta:0.1
};

var memoryPin = Titanium.Map.createAnnotation(
    {
        latitude : lat,
        longitude : lng,
        title : title,
        pincolor : Titanium.Map.ANNOTATION_RED,
        animate : true
    }
);
memoryMapView.addAnnotation(memoryPin);
memoryDetailScrollView.add(memoryMapView);

var descriptionLabel = Ti.UI.createLabel(
    {
        top:350,
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
memoryDetailScrollView.add(descriptionLabel);

win.add(memoryDetailScrollView);