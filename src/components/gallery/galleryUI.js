import styles from './gallery.module.css'

/**
 * Создает разметку приложения
 * @class
 */
export default class GalleryUI {
  app = this.getElement(styles.gallery)
  content = this.getElement(styles.content)
  form = this.getForm()

  /**
   * Создает и возвращает элемент нужного типа и класса
   * @param {string|string[]} className имя || массив имен класса
   * @param {string} [type=div] тэг создаваемого элемента
   * @returns элемент
   */
  getElement(className, type = 'div') {
    const element = document.createElement(type)

    Array.isArray(className)
      ? element.classList.add(...className)
      : element.classList.add(className)

    return element
  }

  /**
   * Создает и возвращает форму
   * @returns форму
   */
  getForm() {
    const form = this.getElement(styles.form, 'form')
    const fields = this.getElement(styles.fields)
    const rowName = this.getRow('Name', 'Название')
    const rowUrl = this.getRow('Url', 'Ссылка на изображение')
    const rowMessage = this.getMessageInvalid()
    const buttonAdd = this.getButton('Add', 'Добавить')

    fields.append(rowName, rowUrl, rowMessage)
    form.append(fields, buttonAdd)

    return form
  }

  /**
   * Создает и возвращает строку формы
   * @param {string|string[]} className имя || массив имен класса
   * @param {string} title текст строки
   * @returns элемент
   */
  getRow(className, title) {
    const label = this.getElement(
      [styles.row, styles.label, `label${className}`],
      'label'
    )
    label.textContent = title

    const field = this.getElement([styles.field, `field${className}`], 'input')
    label.append(field)

    return label
  }

  /**
   * Создает и возвращает кнопку
   * @param {string|string[]} className имя || массив имен класса
   * @param {string} title текст кнопки
   * @returns элемент
   */
  getButton(className, title) {
    const button = this.getElement([styles.btn, styles[`btn${className}`]], 'button')
    button.textContent = title

    return button
  }

  /**
   * Создает и возвращает сообщение о некорректной ссылке
   * @returns элемент
   */
  getMessageInvalid() {
    const container = this.getElement([styles.row, styles.rowMessage])
    const message = this.getElement(styles.messageInvalid)
    message.textContent = 'Неверный URL изображения'
    message.hidden = true

    container.append(message)

    return container
  }

  /**
   * Собирает и возвращает разметку приложения
   * @returns элемент
   */
  getApp() {
    this.app.append(this.form, this.content)

    return this.app
  }

  /**
   * Устанавливает заголовок окна
   */
  showTitle() {
    document.querySelector('title').textContent = 'Gallery'
  }
}
