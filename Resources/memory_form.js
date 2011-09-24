Ti.include("lib/util.js");
Ti.include("lib/db.js");

var win = Ti.UI.currentWindow;

var currentScrollView = Ti.UI.createScrollView({
        touchEnabled:false
});

var tabGroup = Ti.UI.currentWindow.tabGroup;

var currentLat = 0;
var currentLng = 0;
var postData = {};
var currentMapView = win.map;

var getCurrentLocationMap = function(){
    Titanium.Geolocation.getCurrentPosition(
        function(e) {
            if (!e.success || e.error)　{
                currentLat = 35.789316;
                currentLng = 139.620292;
            }
            else {
                currentLat = e.coords.latitude;
                currentLng = e.coords.longitude;
            }
            currentMapView.width = 240;
            currentMapView.height = 200;
            currentMapView.top = 130;
            currentMapView.region = {
                latitude:currentLat,
                longitude:currentLng,
                latitudeDelta:0.1,
                longitudeDelta:0.1
            };
            
            var currentPin = Titanium.Map.createAnnotation(
                {
                    latitude : currentLat,
                    longitude : currentLng,
                    pincolor : Titanium.Map.ANNOTATION_RED,
                    animate : true
                }
            );
            currentMapView.addAnnotation(currentPin);
           
            currentScrollView.add(currentMapView);
        }
    );
};
//
// create parts
//
function createMemoryForm(){
    var title = Ti.UI.createTextField({
        height:50,
        width:300,
        left:10,
        top:75,
        hintText : "タイトル"
    });
    
    var textArea = Ti.UI.createTextArea({
        height:100,
        width:300,
        left:10,
        top:360,
        font:{fontSize:20},
    });
    
    var postButton = Ti.UI.createButton(
        {
            top: 470,
            right: 10,
            width: 100,
            height: 44,
            title: '保存'
        }
    );
    
    var confirmDialog = Ti.UI.createAlertDialog(
        {
            title: '入力内容の保存',
            message: '保存します。よろしいですか？',
            buttonNames: ['はい','いいえ'],
            cancel: 1  
        }
    );
    
    var completeDialog = Ti.UI.createAlertDialog(
        {
            title: '入力内容の保存',
            message: '保存しました。',
            buttonNames: ['OK'],
        }
    );
    
    //
    // add event
    //
    confirmDialog.addEventListener(
        'click',
        function(e){
            // 「はい」が押下されたときのみ保存処理を行う
            if (e.index === 0) {
                postData.title = title.value;
                postData.description = textArea.value;
                postData.lat = currentLat;
                postData.lng = currentLng;
                postData.create_date = getCurrentTime();
                
                Ti.App.MEMORYDB.insert(postData);
                
                completeDialog.show();
                title.value="";
                textArea.value="";
            }
        }
    );
    
    postButton.addEventListener(
        'click',
        function(){
            if ( !title.value ) {
                alert('タイトルを入力してください。');
            } else if ( !textArea.value ){
                alert('内容を入力してください');
            } else {
                confirmDialog.show();
            }
        }
    );
    
    getCurrentLocationMap();
    currentScrollView.add(title);
    currentScrollView.add(textArea);
    currentScrollView.add(postButton);
    
    win.add(currentScrollView);
}

tabGroup.addEventListener(
    'focus',
    function(e){
        if(e.index === 0){
            win.remove(currentScrollView);
            currentScrollView = Ti.UI.createScrollView({
                    touchEnabled:false
            });
            getCurrentLocationMap();
            createMemoryForm();

        }
    }
);

//
// initial process
//
getCurrentLocationMap();
createMemoryForm();
