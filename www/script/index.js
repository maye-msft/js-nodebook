var router = new VueRouter({
    routes: [],
})

const vue = new Vue({
    el: '#app',
    store: store,
    router: router,
    data: {
        drawer: true,
        editor: null,
        cameraDialog: false,
        results: []
    },
    props: {
        source: String
    },
    mounted: function () {
        this.editor = ace.edit("editor");
        this.editor.setTheme("ace/theme/twilight");
        this.editor.session.setMode("ace/mode/javascript");
        // function displayContents(contents) {
        //     var element = document.getElementById('file-content');
        //     element.innerHTML = contents;
        //   }
        var that = this;
        document.getElementById('file-input').addEventListener('change', function(e){
            var file = e.target.files[0];
            if (!file) {
                return;
            }
            var reader = new FileReader();
            reader.onload = function (e) {
                var contents = e.target.result;
                // Display file content
                that.editor.setValue(contents, -1);
            };
            reader.readAsText(file);
        }, false);
    },
    computed: {
        ...Vuex.mapState([
            'loading', 'results'
        ]),
    },
    methods: {
        print(obj) {
            return obj
        },
        runCode() {
            var code = this.editor.getValue()
            this.results = []
            eval('window.notebook_function = function(results, book) {' + code + '}');
            window.notebook_function(this.results,
                {

                    http: this.http,
                    text: this.text,
                    html: this.html,
                    json: this.json,
                    image: this.image

                }
            );
        },
        openCamera() {
            this.$store.commit('openCameraDialog')
            this.$refs.cameradialog.init_camera()
        },
        http(params) {
            return window.axios({
                method: 'post',
                url: '/api/httpreq',
                data: params
            })
        },
        text(string) {
            this.results.push(string)
        },
        json(obj) {
            this.results.push(['object', obj])
        },
        html(html) {
            this.results.push(['html', html])
        },
        image(url) {
            this.results.push(['image', 'http://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg']);
        },
        saveFile() {
            var code = this.editor.getValue()
            var blob = new Blob([code], { type: "plain/text;charset=utf-8" });
            saveAs(blob, this.fielname || 'untitled.jsnb');
        },
        openFile(e) {
            $('#file-input').click();
        }



    }
})


