const remote = window.require('electron').remote,
ipcRenderer = window.require('electron').ipcRenderer,
$ = jQuery = window.require('../node_modules/jquery/dist/jquery.min.js');



/* Barre de Menu principale*/
document.getElementById('menu-button-container').addEventListener('click', (event) => {
    ipcRenderer.send('display-app-menu', {
        x: event.x,
        y: event.y
    })
})
document.getElementById('minimize-button').addEventListener('click', () => {
    remote.getCurrentWindow().minimize()
})
document.getElementById('min-max-button').addEventListener('click', () => {
    const currentWindow = remote.getCurrentWindow();
    if (currentWindow.isMaximized()){
        currentWindow.unmaximize()
    }else{
        currentWindow.maximize()
    }
})
document.getElementById('close-button').addEventListener('click', () => {
    remote.app.quit()
}) 


/*Fade-out de la page d'accueil*/
var clbr = document.getElementById("lol");
var elem = document.getElementById('page-1');
var fadeOutInterval;
    
//code for chrome, safari, opera
clbr.addEventListener('webkitAnimationEnd',function(){
    
  	clearInterval(fadeOutInterval);

  	elem.fadeOut = function(timing) {
		var newValue = 1;
		elem.style.opacity = 1;
    	fadeOutInterval = setInterval(function(){ 
			if (newValue > 0) {
			newValue -= 0.01;
			} 
			else if (newValue < 0) {
				elem.style.opacity = 0;
				elem.style.display = 'none';
				clearInterval(fadeOutInterval);
			}
			elem.style.opacity = newValue;
		}, timing);
	}
elem.fadeOut(0.2);
});

//standard syntax
clbr.addEventListener('animationend',function(){
      
  	clearInterval(fadeOutInterval);

  	elem.fadeOut = function(timing) {
		var newValue = 1;
		elem.style.opacity = 1;
    	fadeOutInterval = setInterval(function(){ 
			if (newValue > 0) {
			newValue -= 0.01;
			} 
			else if (newValue < 0) {
				elem.style.opacity = 0;
				elem.style.display = 'none';
				clearInterval(fadeOutInterval);
			}
			elem.style.opacity = newValue;
		}, timing);
	}
elem.fadeOut(0.2);
});

/*Animer la musique*/ 
$(document).ready(function(){
    loadPlaylist(target, tracks);
});

var index=0, target="#player",
mediaPath ='../assets/lib/', extension = '.mp3', type = 'audio/mp3', author = 'Amadou & Mariam';
var tracks = [ 
    {
        track:1,
        name:"Se te djon ye",
        length:"04:14",
        file:"01 - Se te djou ye(Amadou Bakayoko)"
    }, 

    {
        track:2,
        name:"Kelen la seben",
        length:"05:55",
        file:"02 - Kelen la seben(Mariam Doumbia)"
    },

    {
        track:3,
        name:"Mon Amour",
        length:"04:10",
        file:"03 - Mon Amour(A Bakayoko)"
    }, 

    {
        track:4,
        name:"Min ni min be gnogonfe",
        length:"03:39",
        file:"04 - Min ni min be gnogonfe(A  Bakayoko)"
    }, 

    {
        track:5,
        name:"Allah ma na komin ke",
        length:"03:25",
        file:"05 - Allah ma na komin ke(A  bakayoko)"
    },

    {
        track:6,
        name:"Dou gne te so ye",
        length:"03:21",
        file:"06 - Dou gne te so ye(M  Doumbia)"
    },

    {
        track:7,
        name:"Ko Be Na Touma Son",
        length:"03:34",
        file:"07- Ko Be Na Touma Son"
    },

    {
        track:8,
        name:"Touba La Kono",
        length:"04:00",
        file:"08- Touba La Kono"
    },

    {
        track:9,
        name:"Fourousso Kono",
        length:"06:04",
        file:"09 - Fourousso Kono"
    }, 

    {
        track:10,
        name:"Mougnou koro kadi",
        length:"03:41",
        file:"10 - Mougnou koro kadi(A Bakayoko)"
    },

    {
        track:11,
        name:"Cheri Coco",
        length:"03:09",
        file:"11 - Cheri Coco(M Doumbia)"
    } 
],

trackCount = tracks.length,
npTitle = $('#titre'),

audio = $(target).bind('ended', function() { 
    if((index + 1) < trackCount) { 
        index++; 
        loadTrack(index);
        audio.play(); 
    } else { 
        audio.pause(); 
        index = 0; 
        loadTrack(index); 
    } 
})

.get(0);

var prvTrack = $('.previous').click(function() { 
    if((index - 1) > -1) { 
        index--; 
        loadTrack(index);
        audio.play(); 
    } else {
        audio.pause(); 
        index = 0; 
        loadTrack(index);
    }
});

var nxtTrack = $('.next').click(function() {
    if((index + 1) < trackCount) { 
        index++; 
        loadTrack(index); 
        audio.play();  
    } else { 
        audio.pause(); 
        index = 0; 
        loadTrack(index); 
    } 
});

$(document).on("click", "ul.plyr-playlist li a", function(event) {
    //$("ul.plyr-playlist li a").on("click", function(event) {
    $("li.pls-playing").removeClass("pls-playing");
    $(this)
    .parent()
    .addClass("pls-playing");
    var plop = $(this).parent().index();
    playTrack(plop);
});

var loadTrack = function(id) { 
    $('.pls-playing').removeClass('pls-playing'); 
    $('ul li:eq(' + id + ')').addClass('pls-playing'); 
    npTitle.text(tracks[id].name);
    index = id; audio.src = mediaPath + tracks[id].file + extension;
},

playTrack = function(id) { 
    loadTrack(id);
    audio.play();   
};

loadTrack(0);

function loadPlaylist(target, tracks) {
    $("li.pls-playing").removeClass("pls-playing");
    $(".plyr-playlist-wrapper").remove();

    if (tracks) {

        PlyrPlaylist(".plyr-playlist", tracks);
        //return 
    }

    function PlyrPlaylist(target, tracks) {

        $('<div class="plyr-playlist-wrapper"><ul class="plyr-playlist"></ul></div>').insertAfter("#debut");

        var playingclass = "";
        var items = [];
        $.each(tracks, function(id, val) {

            if (0 === id) playingclass = "pls-playing";
            else playingclass = "";

            items.push(
                '<li class="'+playingclass+'"><a href="#" data-type="'+type +'" data-audio-id="'+mediaPath+val.file+'"><div class="db">'+val.track+'.  '+val.name+'</div><div class="ml">'+author+'</div><div class="fn">'+val.length+'</div></a></li>'
            );
            
            if (id == 19) 
            return false;
            
        });

        $(target).html(items.join(""));
        
        setTimeout(function(){
        }, 
        500);
    }
};


/*Affichage grille galerie*/

/*Affichage sign-up*/


/*Menu de notification*/
new Notification('YAH Player', {
    body: 'Ready to play album music.',
    icon: '../assets/picto/icon.ico'
});
