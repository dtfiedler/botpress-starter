module.exports = ({ bp }) => {
  bp.analytics.custom.addGraph({
    name: 'Number of conversations',
    type: 'count',
    description: 'Number of conversations with each user',
    variables: ['conversation']
  })

  bp.analytics.custom.addGraph({
    name: 'Number of LiveChat Started',
    type: 'count',
    description: 'Number of LiveChats Started',
    variables: ['livechat']
  })

  //Helpful responses analytics
  bp.analytics.custom.addGraph({
    name: 'Helpfulness of Responses',
    type: 'percent',
    description: 'Percentage of helpful responses',
    variables: ['helpful', 'response'],
    fnAvg: (helpful, response) => helpful / response
  })


  // Register SalesForce LiveAgent
  bp.sflaManager &&
    bp.sflaManager.on &&
    bp.sflaManager.on('chat_started', userId => {
      bp.analytics.custom.increment(`${'livechat'}~${userId}`)
    })

    
}
