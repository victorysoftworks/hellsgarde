class Entity {

  constructor() {
    this.id = '_' + Math.random().toString(32)
    this.components = []
  }

  addComponent(component) {
    component.owner = this

    this.components.unshift(component)
  }

  removeComponent(component) {
    this.components = this.components.filter(c => ! Object.is(c, component))
  }

  receive(type, params = {}) {
    const event = { type, params }

    this.sortComponentsByPriority()

    this.components.forEach(c => c.receive(event))
  }

  query(type, result = null, params = {}) {
    const query = { type, result, params }

    this.sortComponentsByPriority()

    this.components.forEach(c => c.query(query))

    return query.result
  }

  sortComponentsByPriority() {
    this.components.sort((a, b) => {
      if (a.priority < b.priority) {
        return -1
      } else if (a.priority === b.priority) {
        return 0
      } else {
        return 1
      }
    })
  }

}