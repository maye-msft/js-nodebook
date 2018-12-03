Vue.component(`cameradialog`, 
{
    template: `
    <v-dialog v-model="cameradialog" height="500" width="590">
        <v-card>
            <v-card-title class="headline">Camera Dialog</v-card-title>

            <v-card-text>
                <canvas style="padding:10px;width:100%;height:100%; max-width:600px" id="video-canvas"></canvas>
                <video id="video" width="100%" height="100%" autoplay style="padding:10px;" ></video>            
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="green darken-1" flat="flat" @click="closeCamera()">
                    Close
                </v-btn>

                <v-btn color="green darken-1" flat="flat" @click="closeCamera()">
                    Snap
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    `,
    data() {
        return {
            video : null,
            stream : null
        }
    },
    computed: {
        ...Vuex.mapState([
            'cameradialog'
        ]),
    },
    mounted: function () {
        //this.init_camera()
    },
    methods: {
        closeCamera() {
            store.commit('closeCameraDialog')
            this.stream.getTracks()[0].stop()
            return this.processImage()
        },
        init_camera() {
            
                var that = this
                this.video = document.getElementById('video');
                
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
                        that.video.src = window.URL.createObjectURL(stream);
                        that.video.play();
                        that.stream = stream;
                    });
                } else if (navigator.getUserMedia) { // Standard
                    navigator.getUserMedia({ video: true }, function (stream) {
                        that.video.src = stream;
                        that.video.play();
                        that.stream = stream;
                    }, errBack);
                } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
                    navigator.webkitGetUserMedia({ video: true }, function (stream) {
                        that.video.src = window.webkitURL.createObjectURL(stream);
                        that.video.play();
                        that.stream = stream;
                    }, errBack);
                } else if (navigator.mozGetUserMedia) { // Mozilla-prefixed
                    navigator.mozGetUserMedia({ video: true }, function (stream) {
                        that.video.src = window.URL.createObjectURL(stream);
                        that.video.play();
                        that.stream = stream;
                    }, errBack);
                }

                video.addEventListener('loadedmetadata', function () {
                    var videocanvas = document.getElementById('video-canvas');
                    videocanvas.width = video.videoWidth;
                    videocanvas.height = video.videoHeight;
                });
            


            // video.addEventListener('play', function () {
            //     var $this = this; //cache
            //     var videocanvas = document.getElementById('video-canvas');
            //     var videocanvasctx = videocanvas.getContext('2d');
            //     (function loop() {
            //         if (!$this.paused && !$this.ended) {
            //             videocanvasctx.drawImage($this, 0, 0);
            //             videocanvasctx.font = 'italic 12pt Calibri';
            //             // videocanvasctx.fillText('Hello World!', 150, 100);
            //             setTimeout(loop, 1000 / 30); // drawing at 30fps

            //             for (var idx in that.faceRectangles) {
            //                 var item = that.faceRectangles[idx]
            //                 videocanvasctx.beginPath();
            //                 videocanvasctx.rect(item.left, item.top, item.width, item.height);
            //                 videocanvasctx.lineWidth = 3;
            //                 videocanvasctx.strokeStyle = 'yellow';
            //                 videocanvasctx.stroke();
            //                 videocanvasctx.fillStyle = 'yellow';
            //                 videocanvasctx.fillText(that.gender[idx], item.left + item.width + 5, item.top + 20);
            //                 videocanvasctx.fillText(that.age[idx], item.left + item.width + 5, item.top + 40);
            //             }


            //         }
            //     })();
            // }, 0);

        },
        
        processImage() {
            var that = this;
            var videocanvas = document.getElementById('video-canvas');
            var image = videocanvas.toDataURL();
            //var binaryData = dataURItoBlob(image)
            //var binaryDataToSend = new Uint8Array(binaryData)
            return image
            // that.progressing = true
            // axios({
            //     method: 'POST',
            //     url: '/api/detectface',
            //     headers: {
            //         "Content-Type": "application/octet-stream"
            //     },
            //     data: binaryDataToSend
            // }).then(function (response) {
            //     const data = response.data;
            //     console.log(JSON.stringify(data, null, 2));
            //     that.faceRectangles = [];
            //     that.gender = [];
            //     that.age = [];
            //     that.values = [];
            //     for (var item of data) {
            //         that.faceRectangles.push(item.faceRectangle)
            //         that.age.push(item.faceAttributes.age)
            //         that.gender.push(item.faceAttributes.gender)
            //         that.values = obj2array(flatten(item), 'name', 'value')

            //     }
            //     that.progressing = false
            // }).catch(function (e) {
            //     console.log(e)
            //     that.progressing = false
            // });
        }
    }


});