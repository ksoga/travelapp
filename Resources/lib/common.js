/**
 * 共通設定
 */
// 読み込み中インジケータ設定
var actInd = Titanium.UI.createActivityIndicator({
    bottom:10, 
    height:50,
    width:10,
    style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN,
    message:'読み込み中...'
});

/**
 * 観光地情報取得ぺージ設定
 */
var apiKey = '6243197788a21c98';
var format = 'json';
var count = 20;
