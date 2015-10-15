var changeDataJS = {
    opacityClass:function(i){
        var classN = '';
        if (i%2==0) {
            classN = ' class="opacity" ';
        };
        return classN;
    },
    bigTable:function(tableId){

        var bTable = $(tableId);
        var _html = [];
        _html.push('<thead>');
        _html.push('<tr>',
                    '<td class="w60">排名</td>',
                    '<td class="w180">呢称</td>',
                    '<td class="w80">积分</td>',
                  '</tr>');
        _html.push('</thead>');
        _html.push('<tbody>');
        for(var i = 0; i < 9; i++){

            var classN = changeDataJS.opacityClass(i);
            _html.push('<tr'+classN+'>',
                        '<td class="w60">'+(i+1)+'</td>',
                        '<td class="w180"><img src="test.jpg"/><span class="bName">namenamename</span></td>',
                        '<td class="w80">1111111</td>',
                      '</tr>');
        }
        _html.push('</tbody>');
        bTable.html(_html.join(""));
    },
    smallTable:function(tableId){

        var sTable = $(tableId);

        var _html = [];
        _html.push('<thead>');
        _html.push('<tr>',
                    '<td class="w60">排名</td>',
                    '<td class="w90">呢称</td>',
                  '</tr>');
        _html.push('</thead>');
        _html.push('<tbody>');
        for(var i = 0; i < 9; i++){
            var classN = changeDataJS.opacityClass(i);
            _html.push('<tr'+classN+'>',
                        '<td class="w60">'+(i+1)+'</td>',
                        '<td class="w90"><span class="sName">namenamename</span></td>',
                      '</tr>');
        }
        _html.push('</tbody>');
        sTable.html(_html.join(""));
    }
};