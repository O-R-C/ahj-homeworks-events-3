import GalleryUI from './galleryUI'

export default class Gallery {
  ui = new GalleryUI()
  app = this.ui.getApp()

  constructor(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element)
    }
    this.element = element
    this.init()
  }

  init() {
    this.element.append(this.ui.getApp())
    this.ui.showTitle()
  }
}
