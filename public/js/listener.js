function listen(){
	var btnSave = $("#btn-save");
	var formTiket = $("#form-tiket");
	$("#btnTambah").click(function(){
		var fTiket = "<hr /><div class='form-group'>";
		fTiket += "<label for='kd_tiket' class='col-md-2'>Kode Tiket</label>";
		fTiket += "<div class='col-md-3'><input type='text' id='kd_tiket' class='form-control' name='tiket[kd_tiket]' /></div></div>";
		fTiket += "<div class='form-group'>";
		fTiket += "<label for='nama_penumpang' class='col-md-2'>Nama Penumpang</label>";
		fTiket += "<div class='col-md-10'><input type='text' id='nama_penumpang' class='form-control' name='tiket[nama_penumpang]' /></div></div>";
		fTiket += "<div class='form-group'>";
		fTiket += "<label for='dari' class='col-md-2'>Dari</label>";
		fTiket += "<div class='col-md-10'><input type='text' id='dari' class='form-control' name='tiket[dari]' /></div></div>";
		fTiket += "<div class='form-group'>";
		fTiket += "<label for='ke' class='col-md-2'>Ke</label>";
		fTiket += "<div class='col-md-10'><input type='text' id='ke' class='form-control' name='tiket[ke]' /></div></div>";
		fTiket += "<div class='form-group'>";
		fTiket += "<label for='wk' class='col-md-2'>Waktu Keberangkatan</label>";
		fTiket += "<div class='col-md-5'><input type='text' id='wk' class='form-control' name='tiket[waktu_keberangkatan]' /></div></div>";
		fTiket += "<div class='form-group'>";
		fTiket += "<label for='wt' class='col-md-2'>Waktu Tiba</label>";
		fTiket += "<div class='col-md-5'><input type='text' id='wt' class='form-control' name='tiket[waktu_tiba]' /></div></div>";
		formTiket.append(fTiket);
		btnSave.attr('style',"display:'';");
	});
}