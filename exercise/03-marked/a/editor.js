const {Menu, dialog} = require('electron').remote
const fs = require('fs')
const marked = require('marked')
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false})

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New',
        accelerator: 'CmdOrCtrl+N',
        click: function () {
          var filePath = document.getElementById('filePath')
          var text = document.getElementById('text')
          var save = confirm('是否要存檔')
          if (save === true) {
            dialog.showSaveDialog({filters: [ { name: 'any', extensions: ['*'] }, { name: 'text', extensions: ['txt'] } ]},
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
        label: 'Open',
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
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click: function () {
          var fileName = document.getElementById('filePath').innerText
          var text = document.getElementById('text')
          if (fileName.trim().length === 0) {
            dialog.showSaveDialog({filters: [ { name: 'any', extensions: ['*'] }, { name: 'text', extensions: ['txt'] } ]},
            function (fileName) {
              fs.writeFile(fileName, text.value)
            })
          }
          fs.writeFile(fileName, text.value)
        }
      },
      {
        label: '另存新檔',
        accelerator: 'CmdOrCtrl+Shift+S',
        click: function () {
          dialog.showSaveDialog({filters: [ { name: 'any', extensions: ['*'] }, { name: 'text', extensions: ['txt'] } ]},
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
        accelerator: '',
        click: function () {
          var text = document.getElementById('text')
          var ebox = document.getElementById('ebox')
          ebox.innerHTML = marked(text.value)
          console.log(ebox.innerHTML)
          text.style.width = '50%'
          ebox.style.width = '49%'
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
