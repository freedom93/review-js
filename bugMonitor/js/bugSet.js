$(function(){
    var dw = document.body.clientWidth;
    bugSetResize.cssResize(dw);
    bugSetEvent.renderBugSet();
    $('.editBtn').unbind('click').bind('click',function(){
        bugSetEvent.EditOrSave($(this));
    });
    $('.setting').bind('click',function(){
      window.location.href = 'bug.html';
    });
});

var bugSetEvent = {
    EditOrSave:function(_this){
        var flag = parseInt(_this.attr('flag'));
        if (flag) {
            _this.parent().find('input').attr('disabled','true').addClass('unEdit');
            _this.html('编辑');
            _this.attr('flag','0');
        }else{
            _this.parent().find('input').removeAttr('disabled').removeClass('unEdit');
            _this.html('保存');
            _this.attr('flag','1');
        }
    },
    renderBugSet:function(){
        var dataJson = bugJson.settingData;
        // console.log(dataJson);
        var aciton = parseInt(dataJson['action']);
        if (aciton) {
            $('#usercnt').val(dataJson['usercnt']);
            $('#percent').val(dataJson['percent']);
            $('#notify').val(dataJson['notify']);
        };

    }

};

var bugSetResize = {
    defaultW: 320,
    cssResize:function(dw){
        var ratio = dw/bugSetResize.defaultW;
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
        $('.warnSet').css('margin',(ratio*10) +'px');
        $('.warnSet h4').css('font-size',parseInt(ratio*15) +'px');
        $('.warnCon').width(ratio*300);
        $('.warnCon').css('font-size',parseInt(ratio*14) +'px');
        $('.warnCon').css('margin-left',parseInt(ratio*10) +'px');
        $('.warnCon input').width(ratio*28);
        $('.warnCon input').css('font-size',parseInt(ratio*14) +'px');
        $('.warnCon .wxName').width(ratio*280);
        $('.warnCon .wxName').css('margin-left',parseInt(ratio*10) +'px');
        $('.unEdit.wxName').width(ratio*160);
        $('.warnCon a').css('margin-left',parseInt(ratio*10) +'px');
        $('.warnCon a').width(ratio*40);
    }
};