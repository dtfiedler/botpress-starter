const path = require('path')
const { tail } = require('lodash')

module.exports = {
  id: 'file',
  renderer: '#file',

  group: 'GE Cares',
  title: 'File',

  jsonSchema: {
    description: 'A message pointing to an uploaded file',
    type: 'object',
    required: ['file'],
    properties: {
      file: {
        type: 'string',
        $subtype: 'media',
        $filter: '*/*',
        title: 'File'
      },
      title: {
        type: 'string',
        description: 'Link text that will be displayed to the users',
        title: 'Title (optional)'
      }
    }
  },

  uiSchema: {},

  computePreviewText: formData => {
    let fileName = path.basename(formData.file)

    if (fileName.includes('-')) {
      fileName = tail(fileName.split('-')).join('-')
    }

    const title = formData.title ? ' | ' + formData.title : ''
    return `File (${fileName})${title}`
  },

  computeMetadata: null
}
