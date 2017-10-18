const {Menu, dialog} = require('electron').remote
const fs = require('fs')
const marked = require('marked')

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: '新增檔案',
        accelerator: 'CmdOrCtrl+N',
        click: function () {
          var filePath = document.getElementById('filePath')
          var text = document.getElementById('text')
          var save = confirm('是否要存檔')
          if (save === true) {
            dialog.showSaveDialog({filters: [ { name: 'any', extensions: ['*'] }, { name: 'Markdown', extensions: ['md'] } ]},
            function (fileName) {
              fs.writeFile(fileName, text.value)
              text.value = ''
              filePath.innerText = ''
            })
          } else {
            text.value = ''
            filePath.innerText = ''
          }
        }
      },
      {
        label: '開啟舊檔',
        accelerator: 'CmdOrCtrl+O',
        click: function () {
          dialog.showOpenDialog(
            function (fileName) {
              if (fileName === undefined) {
                console.log('No file selected')
                return
              }
              console.log('fileName=' + fileName)

              var filePath = document.getElementById('filePath')
              filePath.innerText = fileName
              fs.readFile(fileName.toString(), 'utf8', function (err, data) {
                if (err) window.alert('read fail!')
                var text = document.getElementById('text')
                text.value = data
              })
            }
          )
        }
      },
      {
        label: '存檔',
        accelerator: 'CmdOrCtrl+S',
        click: function () {
          var filePath = document.getElementById('filePath')
          var fileName = filePath.innerText
          var text = document.getElementById('text')
          if (fileName.trim().length === 0) {
            dialog.showSaveDialog({filters: [ { name: 'any', extensions: ['*'] }, { name: 'Markdown', extensions: ['md'] } ]},
            function (fileName) {
              fs.writeFile(fileName, text.value)
              filePath.innerText = fileName
            })
          }
          fs.writeFile(fileName, text.value)
        }
      },
      {
        label: '另存新檔',
        accelerator: 'CmdOrCtrl+Shift+S',
        click: function () {
          dialog.showSaveDialog({filters: [ { name: 'any', extensions: ['*'] }, { name: 'Markdown', extensions: ['md'] } ]},
          function (fileName) {
            var text = document.getElementById('text')
            fs.writeFile(fileName, text.value)
          }
          )
        }
      },
      { type: 'separator' },
      { label: 'Exit', role: 'close' }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
    ]
  },
  {
    label: '執行',
    submenu: [
      {
        label: 'md轉html',
        accelerator: 'F5',
        click: function () {
          var text = document.getElementById('text')
          var ebox = document.getElementById('ebox')
          ebox.innerHTML = marked(text.value)
          console.log(ebox.innerHTML)
          text.style.width = '50%'
          ebox.style.width = '49%'
        }
      },
      {
        label: '下載html',
        click: function () {
          var ebox = document.getElementById('ebox')
          if (ebox.innerHTML) {
            dialog.showSaveDialog({filters: [ { name: 'html', extensions: ['html'] } ]},
            function (fileName) {
              var html = `<html><head></head><body>` + ebox.innerHTML + `</body></html>`
              fs.writeFile(fileName, html)
            })
          }
        }
      },
      {
        label: '關閉右視窗',
        click: function () {
          var text = document.getElementById('text')
          var ebox = document.getElementById('ebox')
          ebox.innerHTML = null
          ebox.style.width = '0%'
          text.style.width = '100%'
        }
      }
    ]
  },
  {
    role: 'help',
    submenu: [ { label: 'Learn More' } ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
