import React from 'react'
import ReactDOM from 'react-dom'
import Editor, { Editable, Controls } from 'src/editor'
import VideoPlugin from './plugins/video'
import ContainerPlugin from './plugins/container'
import { PluginService, plugins } from 'src/editor'
import content from './content.js'

require('react-tap-event-plugin')()

const editor = new Editor({
  plugins: new PluginService([
    plugins.content.divider,
    plugins.content.image,
    plugins.content.slate(),
    plugins.content.spacer,
    plugins.content.video,
  ], [
    plugins.layout.spoiler,
    VideoPlugin,
    ContainerPlugin
  ])
})

// let currentState = {}

const elements = document.querySelectorAll('.editable')
for (const element of elements) {
  ReactDOM.render((
    <Editable
      editor={editor}
      state={content[element.dataset.editable]}
      onChange={(state) => {
        // console.log(state)
        // console.log(editor.renderToHtml(state))
      }}
    />
  ), element)
}

ReactDOM.render(<Controls editor={editor} />, document.getElementById('controls'))
