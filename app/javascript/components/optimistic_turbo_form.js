class OptimisticForm {
  static start() {
    document.addEventListener("turbo:submit-start", (event) => this.#startSubmit(event))
    document.addEventListener("turbo:submit-end", (event) => this.#endSubmit(event))
  }

  // private

  static #startSubmit(event) {
    const form = event.target

    if (!this.#isOptimistic(form)) return
    if (!form.checkValidity()) return

    const formData = new FormData(form)
    const element = this.#build({ form, with: formData })

    this.#insert({ element, into: form })
  }

  static #endSubmit(event) {
    const form = event.target

    if (!this.#isOptimistic(form)) return

    form.reset()
  }

  static #isOptimistic(form) {
    return form.dataset.optimistic === "true"
  }

  static #build({ form, with: formData }) {
    const template = this.#findTemplate(form)
    const element = template.content.cloneNode(true).firstElementChild

    this.#populate({ element, with: formData })

    return element
  }

  static #findTemplate(form) {
    const selector = form.dataset.optimisticTemplate

    return document.getElementById(selector)
  }

  static #populate({ element, with: formData }) {
    for (const [name, value] of formData.entries()) {
      const field = element.querySelector(`[data-field="${name}"]`)

      if (field) field.textContent = value
    }
  }

  static #insert({ element, into: form }) {
    const target = this.#findTarget(form)
    const position = form.dataset.optimisticPosition || "append"

    if (position === "prepend") {
      target.prepend(element)
    } else {
      target.append(element)
    }
  }

  static #findTarget(form) {
    const selector = form.dataset.optimisticTarget

    return document.getElementById(selector)
  }
}

OptimisticForm.start()

export default OptimisticForm
