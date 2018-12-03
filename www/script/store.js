const store = new Vuex.Store({
    state:{
      loading:true,
      cameradialog:false
    },
    mutations: {
        setLoading:function(state, loading) {
            state.loading = loading    
        },
        openCameraDialog(state) {
            state.cameradialog = true    
            vue.$emit('cameraopen')
        },
        closeCameraDialog(state) {
            state.cameradialog = false    
        }

    }
});