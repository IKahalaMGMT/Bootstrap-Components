// play/pause button for video script
window.addEventListener("load",e=>{
    let playPauseBtn = document.getElementById('play-pause-btn');
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', (e) => toggleState(e.currentTarget));
    }
    let video = document.getElementById('video-player');

    function toggleState(button) {
        let newButton = button.cloneNode(true);
        let stateElement = button.querySelector('[data-text]');
        let newStateElement = newButton.querySelector('[data-text]');
        let currentState = stateElement.textContent;
        newStateElement.textContent = button.dataset.alternate;
        newButton.dataset.alternate = currentState;
        button.parentElement.replaceChild(newButton, button);
        newButton.focus();
        video.pause();
        if (currentState != 'pause') {
          video.play();
        } else {
          video.pause();
        }
        newButton.addEventListener('click', (e) => toggleState(e.currentTarget));
        return newButton;
    }

    $(function() {
        /* Initialize Carousel */
        var paused = false;
        $('#myDesktopCarousel').carousel({
          interval: 5000,
          pause: false
        });

        /* Play trigger */
        $('#btnPause').click(function() {
          var state = (paused) ? 'cycle' : 'pause';
          paused = (paused) ? false : true;
          $('#myDesktopCarousel').carousel(state);
          $(this).toggleClass('play pause');
        });
      });
  })