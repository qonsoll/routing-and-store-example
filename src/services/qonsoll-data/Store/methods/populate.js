import pluralize from 'pluralize'
import _ from 'lodash'
import traverse from 'traverse'

/**
 * This method populates data for the existing doc using query params
 * @param {object} queryJSON converted graphql like query into json object
 * @param {object} adapter object that contains methods for making requests to the DB
 * @param {object} models describes data structure
 * @param {object} doc current doc that should be populated
 * @returns {object}
 */

const populate = (queryJSON, adapter, models, doc) => {
  // const result = {}
  // traverse(queryJSON.query).forEach(async function (key) {
  //   if (this.path.length > 1) {
  //     /*
  //       Converting field name to the singular form to be able to search
  //       in a models map
  //     */
  //     const fieldNameSingular = pluralize.singular(this.key)
  //     // Check if field is model (entry or relationship)
  //     const isModel = Boolean(models?.[fieldNameSingular])
  //     if (isModel) {
  //       // Get parent field name
  //       const parent = this.path[this.path.length - 2]
  //       const parentFieldNameSingular = pluralize.singular(parent)
  //       /*
  //          Get model data by parent name to know the type of the relationship
  //          to the current field
  //       */
  //       const parentModelData = models[parentFieldNameSingular]
  //       const relationshipType = parentModelData.fields[this.key].dataType
  //       // Handling different types of the relationships
  //       if (relationshipType === 'belongsTo') {
  //         _.set(
  //           result,
  //           this.path.join('.'),
  //           await adapter.findRecord(pluralize(this.key), doc[this.key])
  //         )
  //       } else if (relationshipType === 'hasMany') {
  //         doc[this.key].forEach((id) => {
  //           _.set(
  //             result,
  //             this.path.join('.'),
  //             await adapter.findRecord(pluralize(this.key), doc[this.key])
  //           )
  //         })
  //       }
  //     }
  //   }
  // })
  // console.log('---->', result)
  // return result
}

export default populate
