import styles from './gallery-item.module.css'

export default class GalleryItem {
  constructor({ name, url }) {
    this.item = this.createItem(name, url)
  }

  /**
   * @returns элемент изображение с кнопкой удалить
   */
  getItem() {
    return this.item
  }

  /**
   * Создает и возвращает элемент,
   * изображение с кнопкой удалить
   * @param {string|string[]} className имя || массив имен класса
   * @param {url} url url изображения
   * @returns элемент
   */
  createItem(name, url) {
    const container = this.getElement(styles.item)
    const btnDel = this.getElement(styles.btnDel, 'button')
    btnDel.textContent = 'x'
    const image = this.getElement(styles.image, 'img')
    image.src = url
    image.alt = name

    container.append(image, btnDel)

    return container
  }

  /**
   * Создает и возвращает элемент нужного типа и класса
   * @param {string|string[]} className имя || массив имен класса
   * @param {string='div'} [type] тэг создаваемого элемента
   * @returns элемент
   */
  getElement(className, type = 'div') {
    const element = document.createElement(type)

    Array.isArray(className)
      ? element.classList.add(...className)
      : element.classList.add(className)

    return element
  }
}
