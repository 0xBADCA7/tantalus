'use strict'

function MainController ($location, $scope, NotebooksService, NotesService, TagsService) {
  var self = this

  // Exposed controller
  self.notebooks = []
  self.notes = []
  self.tags = []
  self.notebook = undefined
  self.note = undefined
  self.syncing = undefined

  // Exposed functions
  self.goto = goto
  self.selectNotebook = selectNotebook
  self.selectNote = selectNote
  self.createNewNote = createNewNote
  self.deleteSelectedNote = deleteSelectedNote
  self.startSync = syncData
  self.setChanged = setChanged

  /**
   * Load all required resources.
   */
  function loadEverything () {
    self.notebooks = NotebooksService.getNotebooks()
    self.notes = NotesService.getNotes()
    self.tags = TagsService.getTags()
  }

  /**
   * Go to specific path.
   * @param  {String} path Path to go.
   */
  function goto (path) {
    $location.path(path)
  }

  /**
   * Select a notebook to filter displayed notes.
   * @param  {Object} notebook Notebook object.
   */
  function selectNotebook (notebook) {
    self.notebook = notebook
  }

  /**
   * Select a note to be displayed.
   * @param  {Object} note Note object.
   */
  function selectNote (note) {
    self.note = note
  }

  /**
   * Create a new note and select it.
   */
  function createNewNote () {
    var note = NotesService.newNote()
    selectNote(note)
  }

  /**
   * Delete the currently selected note.
   */
  function deleteSelectedNote () {
    NotesService.deleteNote(self.note)
    self.note = undefined
  }

  /**
   * Mark note as changed and touch its update time.
   * @param {Object} note Note that have been changed.
   */
  function setChanged (note) {
    note.updatedTime = Date.now()
    note.dirty = true
    syncData()
  }

  /**
   * Synchronise data with the server.
   */
  function syncData () {
    // for now it's just a timed fake event to show off the animation

    // stop latest timeout
    if (self.syncing) {
      clearTimeout(self.syncing)
    }

    // fire new timeout
    self.syncing = setTimeout(function () {
      self.syncing = undefined
      $scope.$apply()
    }, 2000)
  }

  // Load everything immediately
  loadEverything()
}

module.exports = MainController
