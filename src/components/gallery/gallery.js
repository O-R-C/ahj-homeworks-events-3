import GalleryUI from './galleryUI'

/**
 * Галерея изображений
 * @class
 */
export default class Gallery {
  ui = new GalleryUI()
  app = this.ui.getApp()

  /**
   * Сохраняет переданный элемент или найденный по селектору
   * @param {element|string} element элемент или селектор
   */
  constructor(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element)
    }
    this.element = element
    this.init()
  }

  init() {
    this.element.append(this.ui.getApp())
    this.addElements()
    this.addListeners()

    this.ui.showTitle()
  }

  /**
   * Ищет и сохраняет элементы
   */
  addElements() {
    this.form = this.element.querySelector('[class*="form"')
    this.fieldName = this.element.querySelector('[class*="fieldName"')
    this.fieldUrl = this.element.querySelector('[class*="fieldUrl"')
    this.message = this.element.querySelector('[class*="messageInvalid"')
    this.buttonAdd = this.element.querySelector('[class*="buttonAdd"')
  }

  /**
   * Добавляет подписки на события
   */
  addListeners() {
    this.form.addEventListener('submit', this.onSubmit)
  }

  /**
   * Обработчик события submit
   * @param {Event} evt событие submit
   */
  onSubmit = (evt) => {
    evt.preventDefault()

    const image = this.ui.getElement('image', 'img')
    image.src = this.fieldUrl.value

    this.imgUrlHandler(image)
    this.clearFields()
  }

  /**
   * Обработчик URL изображения
   * @param {element} img изображение
   */
  imgUrlHandler(img) {
    img.addEventListener('load', this.onLoad)
    img.addEventListener('error', this.onErrorLoad)
  }

  /**
   * Обработка валидного URL изображения
   * @param {Event} evt событие load
   */
  onLoad = (evt) => {
    console.log('ok')
  }

  /**
   * Обработка невалидного URL изображения
   */
  onErrorLoad = () => {
    this.timerMessage && clearTimeout(this.timerMessage)

    this.message.hidden = false

    this.timerMessage = setTimeout(() => {
      this.message.hidden = true
    }, 1000)
  }

  clearFields() {
    this.fieldName.value = ''
    this.fieldUrl.value = ''
  }
}
