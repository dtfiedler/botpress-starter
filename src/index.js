const {
  contentElements,
  contentRenderers,
  actions: builtinActions,
  setup: setupBuiltins
} = require('@botpress/builtins')

const registerCustom = require('./custom')

module.exports = async bp => {
  // This bot template includes a couple of built-in elements and actions
  // Please see the "@botpress/builtins" package to know more
  await registerBuiltin(bp)

  // Register custom actions, elements and renderers
  await registerCustom(bp)

  // Train the NLU model if using the Native NLU Engine
  if (bp.nlu && bp.nlu.provider && bp.nlu.provider.name === 'native') {
    await bp.nlu.provider.sync()
  }

  const webchat = {
    botName: 'GE Cares',
    botAvatarUrl: 'https://ge-cares-01-staging.botpress.cloud/media/a9s21mjj8whnc8k9vo4c-ge-icon.png', // You can provide a URL here
    botConvoTitle: 'GE Cares Chatbot',
    botConvoDescription: "I'm a botpress bot!",
    backgroundColor: '#ffffff',
    textColorOnBackground: '#666666',
    foregroundColor: '#000000',
    textColorOnForeground: '#ffffff',
    showUserName: false, // Whether or not to show the user's name
    showUserAvatar: false, // Whether or not to show the user's avatar
    enableTranscriptDownload: true 
  }

  bp.createShortlink('chat', '/lite', {
    m: 'channel-web',
    v: 'full-screen',
    options: JSON.stringify({ config: webchat })
  })

  bp.logger.info(`------------`)
  bp.logger.info(`Webchat available at ${bp.botfile.botUrl}/s/chat`)
  bp.logger.info(`------------`)

  ////////////////////////////
  /// Conversation Management
  ////////////////////////////

  bp.hear({'nlu.intent.intentConfidentEnough': true}, (event, next) => {
    bp.logger.info(`[NLU] ${event.text}... => "${event.nlu.intent.name}"`)
    event.nlu.entities.length &&
      event.nlu.entities.forEach(entity => {
        bp.logger.info(`[NLU] Entity Detected (${entity.type}) "${entity.value}"`)
      })
    next()
  })

  // All events that should be processed by the Flow Manager
  bp.hear({ type: /bp_dialog_timeout|text|message|quick_reply/i }, (event, next) => {
    bp.dialogEngine.processMessage(event.sessionId || event.user.id, event).then()
  })
}

async function registerBuiltin(bp) {
  await setupBuiltins(bp)

  // Register all the built-in content elements
  // Such as Carousel, Text, Choice etc..
  for (const schema of Object.values(contentElements)) {
    await bp.contentManager.loadCategoryFromSchema(schema)
  }

  await bp.contentManager.recomputeCategoriesMetadata()

  // Register all the renderers for the built-in elements
  for (const renderer of Object.keys(contentRenderers)) {
    bp.renderers.register(renderer, contentRenderers[renderer])
  }

  // Register all the built-in actions
  bp.dialogEngine.registerActions(builtinActions)
}
