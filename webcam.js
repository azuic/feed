// var unirest=require('unirest');
//
//
// unirest.get("https://webcamstravel.p.mashape.com/webcams/list/t?show=regions")
// .header("X-Mashape-Key", "ExVoBlOSoTmshziffC289kQmza8Vp1uhYGvjsn042oYwjMU3wk")
// .header("X-Mashape-Host", "webcamstravel.p.mashape.com")
// .end(function (result) {
//   console.log(result.status, result.headers, result.body);
// });

var request = 'https://maps.googleapis.com/maps/api/streetview?size=400x400&location=Seattle&fov=90&heading=235&pitch=10&source=outdoor&key='+process.env.GMAP_KEY;
console.log(request);
