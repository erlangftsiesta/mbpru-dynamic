$(document).on("change",".load_ajax_change",function(e){

  // alert("AAaa");
  var target= $(this).data('ajaxtarget');
  var data= $(this).data('ajaxdata');
  // var data_unit = $(this).data('ajaxunit');
  var load= $(this).data('ajaxload');
  var format= $(this).data('format');
  var data_arr = data.split('|');

  var keys = '';
  for (i = 0; i < data_arr.length; i++) {
    var key = $(data_arr[i]).val();
    keys += key+'|';
  }

  // alert("as");

  $(target).html("mengambil data ...");
  $.ajax({
    type: "POST",
    url:load,
    data:{keys:keys},
    success: function(isi){
      // alert(isi);
      if (format == 'val') {
        $(target).val(isi);
      }
      else{
        $(target).html(isi);
      }
    },
    error: function(){
      console.log("Ambil data gagal");
      $(target).html("");
    }
  });

});
