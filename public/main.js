var resultData= {};

function flip() {
   $('.card').toggleClass('flipped');
}

$('.submit-text').on('click',function(){
   var text = $('#text-input').val();
     var data = {
       text: text,
 };

 console.log(data);
 fetch(data);
});

$('.page-change').on('click',function(){
 window.location = 'http://localhost:3000/info/';
});


var fetch = function (data) {
var URIEncodedSong = encodeURIComponent(data.text);

$.ajax({
  method: "GET",
  url: 'http://localhost:3000/' + URIEncodedSong, 
  dataType: 'json',
  data: data, 

  success: function(response) {
    console.log(response); 
    console.log(response.document_tone.tone_categories[0].tones[0].score);

    var highestScore = 0;
    var index = -1;

      for(var i =0; i < 5; i++){
        var score = response.document_tone.tone_categories[0].tones[i].score;
        if(score>highestScore)
        {
          highestScore = score;
          index = i;
        }
      }

    var resultEmotion = response.document_tone.tone_categories[0].tones[index].tone_name;
    console.log(resultEmotion);

    if(resultEmotion=="Fear"){
     $('.back').html('<img src= "https://slack-imgs.com/?c=1&url=http%3A%2F%2Fmedia.salemwebnetwork.com%2Fcms%2FCW%2Ffaith%2F14061-fear-hide-scared-woman.1200w.tn.jpg"/>' );
     $('.title').html('Fear no more');
    }

    else if (resultEmotion=="Joy"){
     $('.back').html('<img src= "https://images.unsplash.com/photo-1446161543652-83eaa65fddab?crop=entropy&fit=crop&fm=jpg&h=650&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1375" style = "height:100%"/>');
     $('.title').html('Keep smilling ');
    }

    else if(resultEmotion=="Disgust"){
     $('.back').html('<img src="http://gratisography.com/pictures/229_1.jpg"/>');
     $('.title').html('Sounds Yucky');
    }

    else if(resultEmotion=="Anger"){
     $('.back').html('<img src="http://gratisography.com/pictures/262_1.jpg"/>');
     $('.title').html('Why So Angry?');
    }

    else if(resultEmotion=="Sadness"){
     $('.back').html('<img src="http://wallpaperswide.com/download/sense_of_sadness-wallpaper-1366x768.jpg"/>');
     $('.title').html('You seem down');
    }

    // resultData = response;
    // $('.result').html(JSON.stringify(response));

  },

  error: function(jqXHR, textStatus, errorThrown) {
    console.log(textStatus);
    }

  }); //ajax
}  //fetch 
console.log(resultData);