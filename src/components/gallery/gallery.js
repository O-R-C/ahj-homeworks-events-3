import GalleryUI from './galleryUI'
import { nanoid } from 'nanoid'

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
  constructor(element, data) {
    if (typeof element === 'string') {
      element = document.querySelector(element)
    }
    this.element = element
    this.init()
    this.images = data ?? []
    data && this.renderImages()
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
    this.form = this.element.querySelector('[class*="form"]')
    this.content = this.element.querySelector('[class*="content"]')
    this.fieldName = this.element.querySelector('[class*="fieldName"]')
    this.fieldUrl = this.element.querySelector('[class*="fieldUrl"]')
    this.message = this.element.querySelector('[class*="messageInvalid"]')
    this.buttonAdd = this.element.querySelector('[class*="buttonAdd"]')
  }

  /**
   * Добавляет подписки на события
   */
  addListeners() {
    this.form.addEventListener('submit', this.onSubmit)
    this.content.addEventListener('click', this.onDeleteImage)
  }

  /**
   * Обработчик события submit
   * @param {Event} evt событие submit
   */
  onSubmit = (evt) => {
    evt.preventDefault()
    this.url = this.fieldUrl.value
    this.name = this.fieldName.value

    this.image = this.ui.getElement('image', 'img')
    this.image.src = this.url

    this.imgUrlHandler()
    this.clearFields()
  }

  /**
   * Обработчик URL изображения
   * @param {element} img изображение
   */
  imgUrlHandler() {
    this.image.addEventListener('load', this.onLoad)
    this.image.addEventListener('error', this.onErrorLoad)
  }

  /**
   * Обработка валидного URL изображения
   */
  onLoad = () => {
    this.addImage(this.name, this.url)
  }

  /**
   * Добавляет изображение на страницу,
   * и сохраняет в массив this.images
   * @param {string} name имя изображения
   * @param {string} url адрес изображения
   */
  addImage(name, url) {
    const image = {
      id: nanoid(10),
      name,
      url,
    }

    this.images.push(image)

    this.content.append(this.ui.getGalleryItem(image))
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

  /**
   * Очистка полей ввода
   */
  clearFields() {
    this.fieldName.value = ''
    this.fieldUrl.value = ''
  }

  /**
   * Выводит на страницу изображения из this.images
   */
  renderImages() {
    this.content.append(...this.ui.getGalleryItems(this.images))
  }

  /**
   * Если клик по кнопке удалить,
   * то удаляет изображение
   * @param {Event} evt событие клик по секции content
   */
  onDeleteImage = (evt) => {
    const btnDel = evt.target.closest('[class*="btnDel"]')
    btnDel && btnDel.closest('[class*="item"]').remove()
  }
}
