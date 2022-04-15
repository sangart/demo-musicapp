const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd');
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const randomBtn = $('.btn-random')




const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    songs: [{
            name: "Bậu ơi đừng khóc! ",
            singer: "Phi Nhung",
            path: './assets/music/1.mp3',
            image: "./assets/img/1.jpg"
        },
        {
            name: "Biển tình",
            singer: "Mạnh Quỳnh",
            path: "./assets/music/2.mp3",
            image: "./assets/img/2.jpg"
        },
        {
            name: "Cầu vòng sau mưa",
            singer: "Cao Thái Sơn",
            path: "./assets/music/3.mp3",
            image: "./assets/img/3.jpg"
        },
        {
            name: "Con đường mưa",
            singer: "Cao Thái Sơn",
            path: "./assets/music/4.mp3",
            image: "./assets/img/4.jpg"
        },
        {
            name: "Đám cưới miệt vườn",
            singer: "Raftaar",
            path: "./assets/music/5.mp3",
            image: "./assets/img/5.jpg"
        },
        {
            name: "Khóc cho người đi",
            singer: "Đàm vĩnh Hưng",
            path: "./assets/music/6.mp3",
            image: "./assets/img/6.jpg"
        },
        {
            name: "Làm cha",
            singer: "Đông Dương",
            path: "./assets/music/7.mp3",
            image: "./assets/img/7.jpg"
        },
        {
            name: "Nỗi buồn mẹ tôi",
            singer: "Cẩm Ly",
            path: "./assets/music/8.mp3",
            image: "./assets/img/8.jpg"
        },
        {
            name: "Yêu đương khó quá thì chạy về khóc với anh",
            singer: "Erit",
            path: "./assets/music/9.mp3",
            image: "./assets/img/9.jpg"
        },
        {
            name: "Chạy về nơi phía anh",
            singer: "Khắc Việt",
            path: "./assets/music/10.mp3",
            image: "./assets/img/10.jpg"
        },
        {
            name: "Đế vương",
            singer: "Đình Dũng",
            path: "./assets/music/11.mp3",
            image: "./assets/img/11.jpg"
        }
    ],
    render: function() {
        const htmls = this.songs.map(song => {
            return `
    <div class="song">
        <div class="thumb" style="background-image:url('${song.image}')">
        </div>
        <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
        </div>
        <div class="option">
            <i class="fas fa-ellipsis-h"></i>
        </div>
    </div>
    `
        })
        $('.playlist').innerHTML = htmls.join('');
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function() {
        const _this = this
        const cdWidth = cd.offsetWidth
            //xử lý cd quay
        const cdTumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdTumbAnimate.pause()
            //xử lý phóng to
        document.onscroll = function() {
                const scrollTop = window.scrollY || document.documentElement.scrollTop
                const newCdWidth = cdWidth - scrollTop
                    //thu nhỏ hình ảnh
                cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
                cd.style.opacity = newCdWidth / cdWidth
            }
            // xử lý khi click play
        playBtn.onclick = function() {
                if (_this.isPlaying) {
                    audio.pause()
                } else {
                    audio.play()

                }
            }
            //khi song dc play
        audio.onplay = function() {
                _this.isPlaying = true
                player.classList.add('playing')
                cdTumbAnimate.play()
            }
            //khi song bi pause
        audio.onpause = function() {
                _this.isPlaying = false
                player.classList.remove('playing')
                cdTumbAnimate.pause()
            }
            //khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
                if (audio.duration) {
                    const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                    progress.value = progressPercent
                }
            }
            // xử lý khi tua song 
        progress.onchange = function(e) {
                const seekTime = audio.duration / 100 * e.target.value
                audio.currentTime = seekTime
            }
            // khi next song 
        nextBtn.onclick = function() {
                if (_this.isRandom) {
                    _this.playRandomSong()

                } else {
                    _this.nextSong()
                }
                audio.play()
            }
            //khi prev song
        prevBtn.onclick = function() {
                if (_this.isRandom) {
                    _this.playRandomSong()

                } else {
                    _this.prevSong()
                }
                audio.play()

            }
            // xử lý khi bật / tắt random song
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom)
        }
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    nextSong: function() {
        this.currentIndex++
            if (this.currentIndex >= this.songs.length) {
                this.currentIndex = 0
            }
        this.loadCurrentSong()

    },
    prevSong: function() {
        this.currentIndex--
            if (this.currentIndex < 0) {
                this.currentIndex = this.songs.length - 1
            }
        this.loadCurrentSong()
    },
    playRandomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()

    },

    start: function() {
        // định nghĩa các thuộc tính cho object
        this.defineProperties()
            // lắng nghe / sử lý sự kiện (DOM events)
        this.handleEvents()
            // tải thông tin bài hát đàu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()
            // render playlist
        this.render()
    }
}
app.start()