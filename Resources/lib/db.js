/**
 * テーブル名
 */
var TABLE_NAME_TARAVEL_MEMORY = 'travel_memory';

/**
 * カラム名
 */
var COLUMN_NAME_TITLE       = 'title';
var COLUMN_NAME_DESCRIPTION = 'description';
var COLUMN_NAME_LAT         = 'lat';
var COLUMN_NAME_LNG         = 'lng';
var COLUMN_NAME_CREATE_DATE = 'create_date';

/**
 * DBオブジェクト
 */
var MemoryDB = function(){
    // DB名
    this.dbName = 'memory_db';
    
    // DBオープン
    this.open = function() {
        this.db = Titanium.Database.open(this.dbName);
    };
    
    // DBクローズ
    this.close = function() {
        this.db.close();
    };
    
    // CREATE TABLE
    this.createTable = function() {
        this.open();
        
        // CREATE TABLE文
        var createTableSql = 'CREATE TABLE IF NOT EXISTS ' + TABLE_NAME_TARAVEL_MEMORY + ' ('
                              + COLUMN_NAME_TITLE +' TEXT'
                              + ', ' + COLUMN_NAME_DESCRIPTION +' TEXT'
                              + ', ' + COLUMN_NAME_LAT +' NUMBER'
                              + ', ' + COLUMN_NAME_LNG +' NUMBER'
                              + ', ' + COLUMN_NAME_CREATE_DATE +' TEXT'
                              +  ' )';
        
        // SQL実行
        this.db.execute(createTableSql);
        
        this.close();
    };
    
    // INSERT
    this.insert = function(entity) {
        this.open();
        
        // INSERT文
        var insertSql = 'INSERT INTO ' + TABLE_NAME_TARAVEL_MEMORY + ' ('
                        + COLUMN_NAME_TITLE
                        + ', ' + COLUMN_NAME_DESCRIPTION
                        + ', ' + COLUMN_NAME_LAT
                        + ', ' + COLUMN_NAME_LNG
                        + ', ' + COLUMN_NAME_CREATE_DATE
                        + ') VALUES(?,?,?,?,?)';
        
        this.db.execute(insertSql,
                    entity.title,
                    entity.description,
                    entity.lat,
                    entity.lng,
                    entity.create_date
        );

        
        
        this.close();
        

    };
    
    // SELECT
    this.selectAll = function() {
        // 結果格納用配列
        var results = [];
        
        this.open();
        
        var selectAllSql = 'select * from '+ TABLE_NAME_TARAVEL_MEMORY　+ " order by " + COLUMN_NAME_CREATE_DATE + ' DESC';
        
        var resultSet = this.db.execute(selectAllSql);
        
        if(resultSet.getRowCount() > 0){
            
            while(resultSet.isValidRow()){
                var entity = {};
                
                entity.title = resultSet.fieldByName(COLUMN_NAME_TITLE);
                entity.description = resultSet.fieldByName(COLUMN_NAME_DESCRIPTION);
                entity.lat = resultSet.fieldByName(COLUMN_NAME_LAT);
                entity.lng = resultSet.fieldByName(COLUMN_NAME_LNG);
                entity.create_date = resultSet.fieldByName(COLUMN_NAME_CREATE_DATE);
                
                results.push(entity);
                resultSet.next();
            }
        }
        
        resultSet.close();
        this.close();
        
        return results;
    };
    
};

if (!Ti.App.MEMORYDB) {
    Ti.App.MEMORYDB = new MemoryDB();
    Ti.App.MEMORYDB.createTable();
}
