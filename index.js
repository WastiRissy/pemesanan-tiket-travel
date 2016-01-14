var http = require('http');
	express = require('express');
	bodyParser = require('body-parser');
	path = require('path');
	MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server,
	CollectionDriver = require('./collectionDriver').CollectionDriver;
	
var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.locals.ucfirst = function(value){
    return value.charAt(0).toUpperCase() + value.slice(1);
};

var mongoHost = 'localHost';
var mongoPort = 27017;
var collectionDriver;
var mongoClient = MongoClient;
var url = 'mongodb://'+mongoHost+':'+mongoPort+'/pemesanan_tiket';
mongoClient.connect(url, function(err,db){
	if(err) throw err;
	collectionDriver = new CollectionDriver(db);
});


//render halaman untuk mengedit record
app.get('/pesan/edit/:entity', function(req, res) {
	var params = req.params;
	collectionDriver.get("pemesanan_tiket", params.entity, function(error, objs) {
		if (error) { res.status(400).send({error: "error occured"}); }
		else {
			if (req.accepts('html')) {
				res.render('edit',{object: objs});
			} else {
				res.set('Content-Type','application/json');
				res.status(200).send(objs);
			}
		}
	});
});

//render halaman untuk input record baru
app.get('/pesan/tambah', function(req, res) {
	var params = req.params;
	res.render('tambah',{collection: params.collection});
});


//ambil semua record
app.get('/', function(req, res) {
	var params = req.params;
	var col = "pemesanan_tiket";
	collectionDriver.findAll(col, function(error, objs) {
		if (error) { res.status(400).send({error: "error occured"}); }
		else {
			if (req.accepts('html')) {
				res.render('index',{objects: objs, collection: col});
			} else {
				res.set('Content-Type','application/json');
				res.status(200).send(objs);
			}
		}
	});
});

//ambil detail record
app.get('/pesan/:entity', function(req, res) {
	var params = req.params;
	var entity = params.entity;
	var collection = "pemesanan_tiket";
	if (entity) {
		collectionDriver.get(collection, entity, function(error, objs) {
			if (error) { res.status(400).send({error: "error occured"}); } 
			else {
				if (req.accepts('html')) {
					res.render('detail',{objects: objs, collection: collection});
				} else {
					res.status(200).send(objs);
				}
			}
		});
	} else {
		res.status(400).send({error: 'bad url', url: req.url});
	}
});

//menambah record
app.post('/pesan', function(req, res) {
    var object = req.body;
    var collection = 'pemesanan_tiket';
    collectionDriver.save(collection, object, function(err,docs) {
          if (err) { res.status(400).send({error: "error occured"}); } 
          else { res.redirect('/'); }
     });
});

//mengupdate record
app.post('/pesan/edit/:entity', function(req, res) {
    var entity = req.params.entity;
    var collection = "pemesanan_tiket";
	var obyek = req.body;
    if (entity) {
		collectionDriver.update(collection, obyek, entity, function(error, objs) {
			if (error) { res.status(400).send({error: "error occured"}); }
			else { res.redirect('/');}
		});
	} else {
       var error = { "message" : "Cannot PUT a whole collection" };
       res.status(400).send(error);
   }
});

//menghapus record
app.get('/pesan/delete/:entity', function(req, res) {
    var params = req.params;
    var entity = params.entity;
    var collection = "pemesanan_tiket";
    if (entity) {
       collectionDriver.delete(collection, entity, function(error, objs) {
          if (error) { res.status(400).send({error: "error occured"}); }
          else { res.redirect('/'); }
       });
   } else {
       var error = { "message" : "Cannot DELETE a whole collection" };
       res.status(400).send(error);
   }
});


app.use(function (req,res) {
    res.render('404', {url:req.url});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});