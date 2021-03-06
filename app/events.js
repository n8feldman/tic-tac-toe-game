'use strict'

const getFormFields = require('./../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const gameui = require('./gameui')
const gameLogic = require('./gamelogic')
const store = require('./store.js')

const onSignUp = event => {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)
  api.signUp(data)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}

const onSignIn = event => {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)
  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}

const onSignOut = () => {
  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
}

const newGame = () => {
  api.newGame()
    .then(gameui.onNewGameSuccess)
    .catch(gameui.onNewGameFailure)
}

const turnTaken = event => {
  const cell = $(event.target).data('id')
  if (store.over === true) {
    gameui.makeMoveFailure('Please start a new game.')
  } else if (store.cells[cell] === '') {
    const data = gameLogic.buildGameData(cell)
    api.updateGame(data)
      .then(gameui.makeMoveSuccess)
      .catch(gameui.makeMoveFailure)
  } else {
    gameui.makeMoveFailure('Please select an empty cell')
  }
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  newGame,
  turnTaken
}
