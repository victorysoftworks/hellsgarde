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
    
    this.components.sort((a, b) => b.priority > a.priority)

    this.components.forEach(c => c.receive(event))
  }

  query(type, result = null, params = {}) {
    const query = { type, result, params }

    this.components.sort((a, b) => b.priority > a.priority)

    this.components.forEach(c => c.query(query))

    return query.result
  }

}