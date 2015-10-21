$(function(){
    var dw = document.body.clientWidth;
    bugResize.cssResize(dw);
    bugEvent.initBugData();
    $('.item').unbind('click').bind('click',function(){
            bugEvent.clickTab($(this), $(this).attr('class'));
    }); 
    $(function(){
        $('.setting').bind('click',function(){
            window.location.href = 'bugSet.html';
        })
    });
});

var bugEvent = {
        initBugData:function(){
                $('#detailData1').show();
                bugData.renderCrashData();
        },
        clickTab:function(object, str){
                var flag = str.charAt(str.length - 1);
                $('#detailData1').hide();
                bugData.changeTabCon(parseInt(flag)+1);
                var _this = object;
                _this.parent().find('a').removeClass('active');
                object.find('a').addClass('active');
        }
};

var bugData={
        tabFalg:1,
        changeTabCon:function(tabFalg){
                var detailTit = '崩溃';
                var titTips = '支持iOS、Android平台以及Unity应用的崩溃监控，为您发现并上报所有崩溃信息。';
                switch(tabFalg){
                        case 1: detailTit = '崩溃';
                                titTips = '支持iOS、Android平台以及Unity应用的崩溃监控，为您发现并上报所有崩溃信息。';
                                bugData.renderCrashData();
                                $('.container').hide();
                                break;
                        case 2: detailTit = '卡顿/ANR';
                                titTips = '支持iOS卡顿、Android ANR的异常监控，帮您提升应用流畅度。';
                                bugData.renderANR();
                                break;
                        case 3: detailTit = '分析';
                                titTips = '提供丰富的Crash现场信息分析，为定位和解决Crash提供更多线索。';
                                bugData.renderRelysis();
                                break;
                        case 4: detailTit = '统计';
                                titTips = '实时监控Crash，分析Crash趋势，主动掌握产品发布和运营质量。';
                                bugData.renderStatictis();
                                break;
                }
                $('#detailTit').html(detailTit);
                $('#titTips').html(titTips);
        },
        renderCrashData:function(){
                var dataJson = bugJson.crashData;
                // console.log(dataJson);
                $('#detailData1').show();
                $('#crashcnt').html(bugCommon.formatNum(dataJson['crashcnt']));
                $('#crashrate').html(dataJson['crashrate']+'%');
                $('#alluser').html(bugCommon.formatNum(dataJson['alluser']));
                $('#infectuser').html(bugCommon.formatNum(dataJson['infectuser']));
        },
        renderANR:function(){
            var dataJson = bugJson.anrData;
            // console.log(dataJson);
            $('.container').show();
            $('.container').html('<div id="container" style="width:100%;height:255px;"></div>');
            $('#container').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: dataJson['subtitle']
                },
                xAxis: {
                    categories: dataJson['categories']
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'ANR (次数)'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} 次</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.005,
                        borderWidth: 0
                    }
                },
                series: [{
                    data: dataJson['data1']
                },{
                    data: dataJson['data2']
                }]
            });
        },
        renderRelysis: function() {
            var dataJson = bugJson.RelysisData;
            // console.log(dataJson);
            $('.container').show();
            $('.container').html('<div id="container2" style="width:100%;height:239px;"></div>');
            $('#container2').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                subtitle: {
                    text: dataJson['subtitle']
                },
                title: {
                    text: ''
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Data share',
                    data: [
                        ['tip1', 45.0],
                        ['tip2', 26.8], {
                            name: 'tip3',
                            y: 12.8,
                            sliced: true,
                            selected: true
                        },
                        ['tip4', 8.5],
                        ['tip5', 6.2],
                        ['tip6', 0.7]
                    ]
                }]
            });
        },
        renderStatictis:function(){
            var dataJson = bugJson.statictisData;
            // console.log(dataJson);
            $('.container').show();
            $('.container').html('<div id="container3" style="width:100%;height:239px;"></div>');
            $('#container3').highcharts({
                chart: {
                    type: 'line'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: dataJson['subtitle']
                },
                xAxis: {
                    categories: dataJson['categories']
                },
                yAxis: {
                    title: {
                        text: '每5分钟 (次)'
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                series: [{
                    name: '影响用户数',
                    data: dataJson['data1']
                }, {
                    name: '使用用户数',
                    data: dataJson['data2']
                }]
            });
        }

};

var bugCommon = {
        formatNum:function(num){
            if(isNaN(num))return "";
            var numArry = String(num).split(".");
            var ss=numArry[0];
            
            var strFormat="";
            while(ss.length>3)
            {
                strFormat=","+ss.substring(ss.length-3,ss.length)+strFormat;
                ss=ss.substring(0,ss.length-3);
            }
            if(ss.length>0)
            {
                strFormat=ss+strFormat;        
            }
            var fs=strFormat;
            var len = strFormat.length;
            if(len>5){
                fs=strFormat.substring(0,len-5)+strFormat.substring(len-5,len);
            }
            if(numArry[1]){
                fs+="."+numArry[1];
            }
            return fs;
        }

};

var bugResize = {
    defaultW: 320,
    cssResize:function(dw){
        var ratio = dw/bugResize.defaultW;
        if (ratio == 1) {
            return;
        };
        if(!ratio){
                ratio = 1;
        };
        $('.index-con').width(ratio*320);
        $('.index-con').css('font-size',parseInt(ratio*16) +'px');
        $('.banner').height(ratio*48);
        $('.hostImg').height(ratio*32);
        $('.hostImg').width(ratio*32);
        $('.hostImg').css('margin', parseInt(ratio*8) +'px '+parseInt(ratio*6) +'px '+parseInt(ratio*8) +'px '+parseInt(ratio*10) +'px');
        $('.hostName').css('top',parseInt(ratio*16) +'px');
        $('.setting').css('line-height',parseInt(ratio*48) +'px');
        $('.setting').css('margin-right',parseInt(ratio*10) +'px');
        $('.introdution').css('margin-left',parseInt(ratio*10) +'px');
        $('.function-nav li a').width(ratio*80);
        $('.function-nav li a').height(ratio*75);
        $('.detailInfo').height(ratio*350);
        $('.detailInfo').width(ratio*206);
        $('.detailInfo').css('margin-top',parseInt(ratio*14) +'px');
        $('.detailInfo').css('margin-right',parseInt(ratio*10) +'px');
        $('.detailData td').width(ratio*100);
        $('.detailData td').css('font-size',parseInt(ratio*13) +'px');
        $('.detailInfo h4').css('font-size',parseInt(ratio*13) +'px');
        $('.dataCol td').css('font-size',parseInt(ratio*20) +'px');
        $('.item').css('margin', parseInt(ratio*14) +'px '+parseInt(ratio*3) +'px '+parseInt(ratio*2) +'px 0');
        $('.function-heading').css('font-size',parseInt(ratio*14) +'px');
    }
};




