const url = require('url')

module.exports = {
  '#file': data => {
    const fileUrl = url.resolve(data.BOT_URL, data.file)
    const title = data.title && data.title.length ? data.title : fileUrl

    return [
      {
        text: `[${title}](${fileUrl})`,
        markdown: true
      }
    ]
  }
}
