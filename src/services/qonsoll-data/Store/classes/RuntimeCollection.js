import Model from './Model'
import RuntimeDocument from './RuntimeDocument'
import _ from 'lodash'
import { docArrayToObject } from '../helpers'

class RuntimeCollection {
  constructor(collectionName, models) {
    this.collectionName = collectionName
    this.models = new Model(models)
    this.model = this.models.getModel(collectionName)
    this.documents = []
    this.result = {}
  }

  findAll({ runtimeStorage }) {
    this.documents = []
    const documents = runtimeStorage.get(this.collectionName)
    console.log(
      '🚀 ~ file: Collection.js ~ line 18 ~ Collection ~ findAll ~ documents',
      documents
    )
    this.documents = documents.map((document) => new RuntimeDocument(document))
    console.log(
      '🚀 ~ file: Collection.js ~ line 25 ~ Collection ~ findAll ~ this.documents',
      this.documents
    )
    this.result = docArrayToObject(this.documents, {})
  }

  useField({ fieldPath, runtimeStorage }) {
    for (let i = 0; i < this.documents.length; i++) {
      const document = this.documents[i]
      const fieldValue = document.getField({
        fieldPath,
        runtimeStorage,
        collectionName: this.collectionName,
        models: this.models
      })
      _.set(this.result, `${document.data.id}.${fieldPath}`, fieldValue)
    }
  }

  async getResult() {
    return this.result
  }
}

export default RuntimeCollection
