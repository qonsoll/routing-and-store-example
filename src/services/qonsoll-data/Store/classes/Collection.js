import Model from './Model'
import Document from './Document'
import _ from 'lodash'
import { docArrayToObject } from '../helpers'

class Collection {
  constructor(collectionName, models) {
    this.collectionName = collectionName
    this.models = new Model(models)
    this.model = this.models.getModel(collectionName)
    this.documents = []
    this.result = {}
  }

  async findAll({ adapter }) {
    this.documents = []
    const documents = await adapter.findAll(this.collectionName)
    console.log(
      '🚀 ~ file: Collection.js ~ line 18 ~ Collection ~ findAll ~ documents',
      documents
    )
    this.documents = documents.map((document) => new Document(document))
    console.log(
      '🚀 ~ file: Collection.js ~ line 25 ~ Collection ~ findAll ~ this.documents',
      this.documents
    )
    this.result = docArrayToObject(this.documents, {})
  }

  async useField({ fieldPath, adapter }) {
    for (let i = 0; i < this.documents.length; i++) {
      const document = this.documents[i]
      const fieldValue = await document.getField({
        fieldPath,
        adapter,
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

export default Collection
