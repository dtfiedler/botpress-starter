/**
 * Description of the action goes here
 * @param  {String} params.name=value Description of the parameter goes here
 * @param  {Number} [params.age] Optional parameter
 */
async function yourCustomAction(state, event, params) {
  return state
}

/**
 * (Analytics) Tracks a new conversation
 */
async function trackNewConversation(state, { bp, user }) {
  // 'conversation' is the variable (see `analytics.js`)
  // '~' marks the grouping separator
  // And we group this metric by `userId`
  // i.e. we can know how many conversations each user have had
  // For more info see: https://botpress.io/docs/latest/recipes/analytics/
  await bp.analytics.custom.increment(`${'conversation'}~${user.id}`)
}

/**
 * Programmatically jump to a topic
 * @param  {String} params.flow="{{state.flow}}" The name of the topic
 */
async function jumpToTopic(state, event, params) {
  // See https://botpress.io/docs/latest/reference/DialogEngine.html#jumpTo
  await event.bp.dialogEngine.jumpTo(state._stateId, 'topics/' + params.topic + '.flow.json')
  await event.bp.dialogEngine.processMessage(state._stateId, event)
}

/**
 * (Analytics) Tracks if helpful response
 */
async function incrementAskedIfHelpful(state, { bp, user }) {
  // 'conversation' is the variable (see `analytics.js`)
  // '~' marks the grouping separator
  // And we group this metric by `userId`
  // i.e. we can know how many conversations each user have had
  // For more info see: https://botpress.io/docs/latest/recipes/analytics/
  await bp.analytics.custom.increment(`${'response'}~${user.id}`)
}

/**
 * (Analytics) Tracks if helpful response
 */
async function incrementHelpufulResponse(state, { bp, user }) {
  // 'conversation' is the variable (see `analytics.js`)
  // '~' marks the grouping separator
  // And we group this metric by `userId`
  // i.e. we can know how many conversations each user have had
  // For more info see: https://botpress.io/docs/latest/recipes/analytics/
  await bp.analytics.custom.increment(`${'helpful'}~${user.id}`)
}

module.exports = { yourCustomAction, jumpToTopic, trackNewConversation, incrementAskedIfHelpful, incrementHelpufulResponse }
