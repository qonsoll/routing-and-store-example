import pluralize from 'pluralize'

class Model {
  constructor(models) {
    this.models = models
  }

  getModel(name) {
    const singularModelName = pluralize.singular(name)
    return this.models[singularModelName]
  }

  getRelationshipType(parent, child) {
    const singularParentName = pluralize.singular(parent)
    return (
      parent &&
      child &&
      this.models[singularParentName]?.fields[child]?.dataType
    )
  }
}

export default Model
