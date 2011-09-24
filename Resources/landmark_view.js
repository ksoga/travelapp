Ti.include("lib/common.js");

var win = Ti.UI.currentWindow;

var data = [];

//
// functions
//
// ---------------------------------------------------------------------------------------------
// area master 
// ---------------------------------------------------------------------------------------------
/***
 * エイビーロードAPI 地域マスタAPIからデータを取得する
 */
function getAreaMaster(){
    actInd.show();
    var areaMasterUrl = "http://webservice.recruit.co.jp/ab-road/area/v1/?key="
                        + apiKey + "&format=" + format;
    var xhr = Ti.Network.createHTTPClient();
    xhr.timeout = 100000;
    xhr.open('GET', areaMasterUrl);
    xhr.onload = function(){
        var areaMaster = JSON.parse(this.responseText);
        createAreaMasterTable(areaMaster.results);
        actInd.hide();
    }
    
    xhr.send();
    
    win.remove(countryTableView);
    win.add(areaTableView);
}

var areaTableView = Ti.UI.createTableView({
    data:data
});
var areaData = [];
/***
 * 取得した地域マスタ一覧を表示形式に成形
 */
function createAreaMasterTable(areaMaster){
    for(var i=0; i<areaMaster.area.length; i++){
        var area = areaMaster.area[i];
        var row = Ti.UI.createTableViewRow();
        var areaNameLabel = Ti.UI.createLabel(
            {
                width:200,
                height:'auto',
                color:'black'
            }
        );
        areaNameLabel.text = area.name;
        row.add(areaNameLabel);
        
        areaData.push(row);
    };
    areaTableView.setData(areaData);
    
    areaTableView.addEventListener(
      'click',
      function(e){
          var areaCode = areaMaster.area[e.index].code;
          getCountryMaster(areaCode, 1);
      }  
    );
}
// ---------------------------------------------------------------------------------------------
// country master 
// ---------------------------------------------------------------------------------------------
/***
 * エイビーロードAPI 国マスタAPIからデータを取得する
 */
function getCountryMaster(areaCode, start){
    actInd.show();
    var countryMasterUrl = "http://webservice.recruit.co.jp/ab-road/country/v1/"
                            + "?key=" + apiKey
                            + "&area=" + areaCode
                            + "&count=" + count
                            + "&start=" + start                            
                            + "&format=" + format;
                           
    var xhr = Ti.Network.createHTTPClient();
    xhr.timeout = 100000;
    xhr.open('GET', countryMasterUrl);
    xhr.onload = function(){
        var countryMaster = JSON.parse(this.responseText);
        createCountryTable(countryMaster.results);
        actInd.hide();
    }
    xhr.send();
    
    win.remove(areaTableView);
    win.remove(cityTableView);
    win.add(countryTableView);
}

var countryTableView = Ti.UI.createTableView({
    data:data
});

var countryIndex = 0;
var countryData = [];
var countryCodeArray = [];
/***
 * 取得した国マスタ一覧を表示形式に成形
 */
function createCountryTable(countryMaster){
    var countryAvailabe = countryMaster.results_available;
    var areaCode = "";
    
    for(var i=0; i<countryMaster.country.length; i++){
        countryIndex++;

        var country = countryMaster.country[i];
        areaCode = country.area.code;
        var row = Ti.UI.createTableViewRow();
        var countryNameLabel = Ti.UI.createLabel(
            {
                width:200,
                height:'auto',
                color:'black'
            }
        );
        countryNameLabel.text = country.name;
        row.add(countryNameLabel);
        
        row.addEventListener(
            'click',
            function(e){
                var countryCode = countryCodeArray[e.index - 1];
                getCityMaster(countryCode, 1);
            }
        )
        countryData.push(row);
        countryCodeArray.push(country.code);
    };
    
    // 次ページが存在する場合のみ「次の20件」を表示する
    if(countryIndex < countryAvailabe){
        var nextRow = Ti.UI.createTableViewRow();
        var nextLabel = Ti.UI.createLabel(
            {
                width:200,
                height:'auto',
                color:'black',
                text:'次の20件'
            }
        );
        nextRow.add(nextLabel);
        nextRow.addEventListener(
            'click',
            function(e){
                countryData.pop();
                var start = countryMaster.results_start + count;
                getCountryMaster(areaCode, start) 
            }
        )
        countryData.push(nextRow);
    }
    
    // 1ページ目のみ「地域選択へ戻る」を追加する
    if(countryData.length <= count + 1){
        var backRow = Ti.UI.createTableViewRow();
        var backNameLabel=Ti.UI.createLabel(
            {
                width:200,
                height:'auto',
                color:'black',
                text:'地域選択へ戻る'
            }
        );
        backRow.add(backNameLabel);
        backRow.addEventListener(
            'click',
            function(e){
                countryData.length = 0;
                countryCodeArray.length = 0;
                countryTableView.setData(countryData);
                win.remove(countryTableView);
                win.add(areaTableView);
            }
        );
        countryData.unshift(backRow);
    }
    
    countryTableView.setData(countryData);
 
}
// ---------------------------------------------------------------------------------------------
// city master 
// ---------------------------------------------------------------------------------------------
/***
 * エイビーロードAPI 都市マスタAPIからデータを取得する
 */
function getCityMaster(countryCode, start){
    actInd.show();
    var cityMasterUrl = "http://webservice.recruit.co.jp/ab-road/city/v1/" 
                        + "?key=" + apiKey
                        + "&country=" + countryCode
                        + "&count=" + count
                        + "&start=" + start
                        + "&format=" + format;
    var xhr = Ti.Network.createHTTPClient();
    xhr.setTimeout = 100000;
    xhr.open('GET', cityMasterUrl);
    xhr.onload = function(){
        var cityMaster = JSON.parse(this.responseText);
        createCityTable(cityMaster.results);
        actInd.hide();
    }
    xhr.send();
    
    win.remove(countryTableView);
    win.remove(spotTableView);
    win.add(cityTableView);
}

var cityTableView = Ti.UI.createTableView({
    data:data
});

var cityIndex = 0;
var cityData = [];
var cityCodeArray = [];
/***
 * 取得した都市マスタ一覧を表示形式に成形
 */
function createCityTable(cityMaster){
    var cityAvailabe = cityMaster.results_available;
    var coutryCode = "";
    
    for(var i=0; i<cityMaster.city.length; i++){
        cityIndex++;
                
        var city = cityMaster.city[i];
        coutryCode = city.country.code;
        
        var row = Ti.UI.createTableViewRow();
        var cityNameLabel = Ti.UI.createLabel(
            {
                width:200,
                height:'auto',
                color:'black'
            }
        );
        cityNameLabel.text = city.name;       
        row.add(cityNameLabel);
        
        row.addEventListener(
            'click',
            function(e){
                var cityCode = cityCodeArray[e.index -1];
                getSpotMaster(cityCode, 1);
            }
        );
        cityData.push(row);
        cityCodeArray.push(city.code);
    };
    
    // 次ページが存在する場合のみ「次の20件」を表示
    if(cityIndex < cityAvailabe){
        var nextRow = Ti.UI.createTableViewRow();
        var nextLabel = Ti.UI.createLabel(
            {
                width:200,
                height:'auto',
                color:'black',
                text:'次の20件'
            }
        );
        nextRow.add(nextLabel);
        nextRow.addEventListener(
            'click',
            function(e){
                cityData.pop();
                var start = cityMaster.results_start + count;
                getCityMaster(coutryCode, start)
            }
        );
        cityData.push(nextRow);
    }
    // 1ページ目のみ「国選択へ戻る」を追加する
    if(cityData.length <= count + 1){
        var backRow = Ti.UI.createTableViewRow();
        var backNameLabel=Ti.UI.createLabel(
            {
                width:200,
                height:'auto',
                color:'black',
                text:'国選択へ戻る'
            }
        );
        backRow.add(backNameLabel);
        backRow.addEventListener(
            'click',
            function(e){
                cityData.length = 0;
                cityCodeArray.length = 0;
                cityTableView.setData(cityData);
                win.remove(cityTableView);
                win.add(countryTableView);
            }
        );
        cityData.unshift(backRow);
    }
    
    cityTableView.setData(cityData);

}
// ---------------------------------------------------------------------------------------------
// spot master 
// ---------------------------------------------------------------------------------------------
/***
 * エイビーロードAPI 観光地マスタAPIからデータを取得する
 */
function getSpotMaster(cityCode, start){
    actInd.show();
    var spotMasterUrl = "http://webservice.recruit.co.jp/ab-road/spot/v1/" 
                        + "?key=" + apiKey
                        + "&city=" + cityCode
                        + "&count=" + count
                        + "&start=" + start
                        + "&format=" + format;
    var xhr = Ti.Network.createHTTPClient();
    xhr.setTimeout = 100000;
    xhr.open('GET', spotMasterUrl);
    xhr.onload = function(){
        var spotMaster = JSON.parse(this.responseText);
        createSpotTable(spotMaster.results);
        actInd.hide();
    }
    xhr.send();
    
    win.remove(cityTableView);
    win.add(spotTableView);
}

var spotTableView = Ti.UI.createTableView({
    data:data
});

var spotIndex = 0;
var spotData = [];

var spotInfoArray = [];
/***
 * 取得した観光地マスタ一覧を表示形式に成形
 */
function createSpotTable(spotMaster){
    var spotAvailabe = spotMaster.results_available;
    var cityCode = "";

    if(spotAvailabe === 0){
        var noDataRow = Ti.UI.createTableViewRow();
        var noDataLabel = Ti.UI.createLabel(
            {
                width:200,
                height:'auto',
                color:'black',
                text:'データがありません。'
            }
        );
        noDataRow.add(noDataLabel);
        spotData.push(noDataRow);
    }else{
        for(var i=0; i<spotMaster.spot.length; i++){
            spotIndex++;
                    
            var spot = spotMaster.spot[i];
            cityCode = spot.city.code;
            
            var row = Ti.UI.createTableViewRow();
            var spotNameLabel = Ti.UI.createLabel(
                {
                    width:200,
                    height:'auto',
                    color:'black'
                }
            );
            
            spotNameLabel.text = spot.name;
            row.add(spotNameLabel);
            
            row.addEventListener(
                'click',
                function(e){
                    var spotDetail = spotInfoArray[e.index - 1];
                    var spotDetailWindow = Ti.UI.createWindow(
                        {
                            url:"spot_detail.js",
                            spot:spotDetail,
                            map:win.map
                        }
                    );
                    Ti.UI.currentTab.open(spotDetailWindow);
                }
            );
            spotData.push(row);
            spotInfoArray.push(spot);
        };
        // 次ぺージが存在する場合のみ「次の20件」を表示
        if(spotIndex < spotAvailabe){
            var nextRow = Ti.UI.createTableViewRow();
            var nextLabel = Ti.UI.createLabel(
                {
                    width:200,
                    height:'auto',
                    color:'black',
                    text:'次の20件'
                }
            );
            nextRow.add(nextLabel);
            nextRow.addEventListener(
                'click',
                function(e){
                    var start = spotMaster.results_start + count;
                    getSpotMaster(cityCode, start)
                }
            )
            spotData.push(nextRow);
        }
    }
    // 1ページ目のみ「都市選択へ戻る」を追加する
    if(spotData.length <= count + 1){
        var backRow = Ti.UI.createTableViewRow();
        var backNameLabel=Ti.UI.createLabel(
            {
                width:200,
                height:'auto',
                color:'black',
                text:'都市選択へ戻る'
            }
        );
        backRow.add(backNameLabel);
        backRow.addEventListener(
            'click',
            function(e){
                spotData.length = 0;
                spotInfoArray.length = 0;
                spotTableView.setData(spotData);
                win.remove(spotTableView);
                win.add(cityTableView);
            }
        );
        spotData.unshift(backRow);
    }
    spotTableView.setData(spotData);
}

// initial process
getAreaMaster();