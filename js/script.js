const app = () =>{
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video =document.querySelector('.vid-container video');

    //sound
    const sounds = document.querySelectorAll('.sound-picker button');
    //timedisplay
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect =document.querySelectorAll('.time-picker button');
    //get the length of the outline
    const outlineLength = outline.getTotalLength();
    console.log(outlineLength);
    let fakeDurattion =600;
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

 
   //different time
   timeSelect.forEach(option =>{
   option.addEventListener('click',function(){
       fakeDurattion = this.getAttribute("data-time");
       timeDisplay.textContent =`${Math.floor(fakeDurattion/60)}:${Math.floor(fakeDurattion%60)}`;

   })
   });
    //play sound
  play.addEventListener('click',()=>{
      checkPlaying(song);
    });

    //stop and play
    const checkPlaying = song =>{
        if(song.paused){
            song.play();
            video.play();
            play.src = "./svg/pause.svg";

        }else{
            song.pause();
            video.pause();
            play.src="./svg/play.svg";
        }
    }

    //we can animate the circle 
    song.ontimeupdate = () =>{
        let currentTime = song.currentTime;
        let elapsed = fakeDurattion - currentTime;
        let seconds = Math.floor(elapsed%60);
        let minutes = Math.floor(elapsed/60);
        let progress = Math.floor(outlineLength - (currentTime/fakeDurattion)*outlineLength);
        outline.style.strokeDashoffset = progress;
        timeDisplay.textContent =`${minutes}:${seconds}`;
        
        if(currentTime >= fakeDurattion){
            song.pause();
            song.currentTime = 0;
            play.src = "./svg/play.svg";
            video.pause();

        }
    }
       //different sound
       sounds.forEach(option=>{
        option.addEventListener('click',function(){
           song.src=this.getAttribute('data-sound');
           video.src=this.getAttribute('data-video');
           checkPlaying(song);
        });
      }); 
};

app();