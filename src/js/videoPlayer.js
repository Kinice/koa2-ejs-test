+(() => {
  window.createFullVideo = srcStr => {
    const $videoBox = document.createElement('div');
    const $video = document.createElement('video');
    const $close = document.createElement('div');
    $videoBox.classList.add('video-player')
    $video.classList.add('video-tag')
    $close.classList.add('close')
    $video.src = srcStr
    $video.setAttribute('controls', 'controls')
    $video.setAttribute('autoplay', 'autoplay')
    $videoBox.appendChild($video)
    $videoBox.appendChild($close)
    $videoBox.style.zIndex = '999999'
    $close.addEventListener('click', closeVideoMoal, false)
    document.getElementsByTagName('body')[0].appendChild($videoBox)

    function closeVideoMoal (e) {
      $close.removeEventListener('click', closeVideoMoal)
      const $videoBox =  document.querySelector('.video-player');
      document.getElementsByTagName('body')[0].removeChild($videoBox)
      document.querySelector('.fixed-bar').style.display = 'block'
    }
  }
}) ()