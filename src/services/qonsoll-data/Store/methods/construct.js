import { graphQlQueryToJson } from 'graphql-query-to-json'
import pluralize from 'pluralize'

// Temporary database mock
const tmpDB = JSON.parse(
  '{"users":{"7WB6kbZSPbrzuJJlmOwQ":{"firstName":"Yevhen","lastName":"Bogdanov1","id":"7WB6kbZSPbrzuJJlmOwQ","birthDate":null,"age":"30","public":true,"interests":["interest1","interest2","interest3"],"address":"address1"}},"addresses":{"address1":{"country":"country1","city":"city1","id":"address1"}},"cities":{"city1":{"id":"city1","name":"Khmelnitskiy"}},"countries":{"country1":{"id":"country1","name":"Ukraine"}},"interests":{"interest1":{"id":"interest1","name":"JS"},"interest2":{"id":"interest2","name":"MongoDB"},"interest3":{"name":"NodeJS","id":"interest3"}}}'
)

const construct = async (query, models, dataSource) => {
  // Making GraphQL query as JS object
  const queryJson = graphQlQueryToJson(query).query

  // Defining what fields to get from reference object:
  // if fieldType is Boolean then we get all fields of referenced object
  // otherwise fieldType is object and we get only those fields that are included in query object
  const defineFieldType = (field, model) =>
    typeof field === 'boolean'
      ? Object.keys(model).reduce((acc, inc) => ({ ...acc, [inc]: true }), {})
      : field

  // This function gets data from database including only those attributes
  // that are included in query
  // If attributes type defined in model is relationship(belongsTo or hasMany)
  // Then it will get data from db entries that has relation with db object that is being constructed from query
  const defineObjectAttributes = (fields, model, dbData) => {
    // Defining result object
    const resultObject = {}
    // Processing only those attributes of db document that are required by query
    Object.keys(fields).forEach((item) => {
      // If type of field in model is relationship - then we have reference to another db collection document/s
      if (model[item].type === 'relationship') {
        // If dataType is belongsTo then we have to extract fields of db document from collection
        // that has name similar to this field's name and has id that is equal to field's value
        // so we recursively call this function for document with
        // id that is value of current field in current dbData document that is processed
        if (model[item].dataType === 'belongsTo')
          resultObject[item] = defineObjectAttributes(
            defineFieldType(fields[item], models[item].fields),
            models[item].fields,
            dataSource.get(`${pluralize.plural(item)}.${dbData[item]}`) // TODO change database interaction to real one
          )
        // If dataType is hasMany then we have to extract fields of every db document from collection
        // that has name similar to this field's name and its' id is in array of current field value
        // so we call this function for every db entry with id of fields' value array
        if (model[item].dataType === 'hasMany')
          resultObject[item] = dbData[item].map((hasManyId) =>
            defineObjectAttributes(
              defineFieldType(
                fields[item],
                models[pluralize.singular(item)].fields
              ),
              models[pluralize.singular(item)].fields,
              dataSource.get(`${item}.${hasManyId}`) // TODO change database interaction to real one
            )
          )
      } else {
        // If type of model field isn't relationship - then we have simple field that will be inside of our object
        // so we just add it to our result object
        resultObject[item] = dbData[item]
      }
    })
    return resultObject
  }

  const queryResult = Object.entries(queryJson).reduce(
    (acc, [collectionName, fields]) => ({
      ...acc,
      [collectionName]: Object.values(
        dataSource.get(collectionName) // TODO change database interaction to real one
      ).map((item) =>
        defineObjectAttributes(
          fields,
          models[pluralize.singular(collectionName)].fields,
          item
        )
      )
    }),
    {}
  )

  return queryResult
}

export default construct
