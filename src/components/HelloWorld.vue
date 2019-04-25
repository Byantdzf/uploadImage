<template>
  <div class="hello">
    <input type="file"  @change="onChange">
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        ossConfig: {},
        host: '',
        file: {}
      }
    },
    methods: {
      onChange (event) {
        // 移动端仅支持单文件上传
        this.file = event.target.files[0]
        if (!this.file) return
        this.uploadFile(this.file)
      },
      uploadFile () {
        var self = this
        var formData = new FormData()
        // console.log(this.$md5(self.file.name))
        var fileName = this.$md5(self.file.name) + '.' + self.file.type.split('/').pop().toLowerCase()
        var filePath = self.host + '/' + self.ossConfig.dir + fileName
        formData.append('name', self.ossConfig.dir + fileName)
        formData.append('key', self.ossConfig.dir + fileName)
        formData.append('policy', self.ossConfig.policy)
        formData.append('OSSAccessKeyId', self.ossConfig.accessid)
        formData.append('success_action_status', '200')
        formData.append('signature', self.ossConfig.signature)
        formData.append('file', self.file)
        formData.append('filename', self.file.name)
        console.log(formData.entries().next())
        this.$post(this.host, formData)
          .then((response) => {
            console.log(filePath)
          })
        // this.$post(this.host, formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(({data}) => {
        //   console.log(filePath)
        //   console.log('上传成功')
        // }).catch((error) => {
        //   alert('上传失败')
        // })
      }
    },
    mounted () {
      // console.log(this.api)
      // document.body.style.cursor = "url(resource/pic/icons/magnifier3.cur) 12 12,crosshair";
      this.$fetch('/api/upload/signature')
        .then((response) => {
          this.ossConfig = response
          this.host = response.host
          console.log(response)
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
