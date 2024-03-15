$(document).ready(function(){
    var url = $(location).attr('pathname');
    $('#sidebarnav li').removeAttr('class');
    $("a[href$='"+url+"']").parent().addClass('mega-menu niche-templates active');
});

