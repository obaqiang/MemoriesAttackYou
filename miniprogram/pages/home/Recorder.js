class Recorder {

  constructor() {
    this.recorderManager = null
    this.initRecordManager()
  }
  initRecordManager() {
    let that = this
    that.recorderManager = wx.getRecorderManager()
    that.recorderManager.onStop((res) => {
      // that.setData({
      //   tempFilePath: res.tempFilePath // 文件临时路径
      // })
      console.log('获取到文件：' + that.data.tempFilePath)
    })
    this.recorderManager.onError((err) => {
      console.log('录音失败了！',err)
      //console.log(res)
    })
  }
  //开始录音
  start() {

    console.log('触发start')
    this.recorderManager.start({
      duration: 60000,
      sampleRate: 16000, //采样率，有效值 8000/16000/44100
      numberOfChannels: 1, //录音通道数，有效值 1/2
      encodeBitRate: 96000, //编码码率
      format: 'mp3', //音频格式，有效值 aac/mp3
      frameSize: 50, //指定帧大小
      audioSource: 'auto' //指定录音的音频输入源，可通过 wx.getAvailableAudioSources() 获取
    })
  }
  //录音暂停
  suspend() {
    this.recorderManager.pause()
  }
  //继续录音
  continue () {
    this.recorderManager.resume()
  }
  //录音停止
  stop() {
    this.recorderManager.stop()
  }
  //播放录音
  play() {
    // 获取innerAudioContext实例
    const innerAudioContext = wx.createInnerAudioContext()
    // 是否自动播放
    innerAudioContext.autoplay = true
    // 设置音频文件的路径
    innerAudioContext.src = this.data.tempFilePath;
    // 播放音频文件
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    });
    // 监听音频播放错误事件
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  }
}

export {
  Recorder
}