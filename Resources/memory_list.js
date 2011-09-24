Ti.include("lib/util.js");
Ti.include("lib/db.js");

var win = Ti.UI.currentWindow;
win.backgroundColor = '#fff';

var data = [];

var memoryTableView = Titanium.UI.createTableView({
        data:data
});



var tabGroup = Ti.UI.currentWindow.tabGroup;

//
// functions
//
function getMemoryList(){
    var memoryData = [];
    var memoryList = Ti.App.MEMORYDB.selectAll();
    for(var i = 0; i < memoryList.length; i++ ){
        var row = Ti.UI.createTableViewRow();
        var titleLabel = Ti.UI.createLabel(
            {
                width:200,
                height:'auto',
                color:'black'
            }
        );
        titleLabel.text = memoryList[i].title;
        row.add(titleLabel);
        
        row.addEventListener(
            'click',
            function(e){
                var memoryDetailWindow = Ti.UI.createWindow(
                    {
                        url:'memory_detail.js',
                        memory:memoryList[e.index],
                        map:win.map
                    }
                );
                Ti.UI.currentTab.open(memoryDetailWindow);
            }
        );
        memoryData.push(row);
    };
    memoryTableView.setData(memoryData);
}

tabGroup.addEventListener(
    'focus',
    function(e){
        win.remove(memoryTableView);
        getMemoryList();
        win.add(memoryTableView);
    }
)
