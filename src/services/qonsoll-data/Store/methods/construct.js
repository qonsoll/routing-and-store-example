import { graphQlQueryToJson } from 'graphql-query-to-json'
import pluralize from 'pluralize'

const construct = (data, query, models) => {
  const queryJSON = query && graphQlQueryToJson(query)?.query
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
    fields &&
      Object.keys(fields).forEach((item) => {
        // If type of field in model is relationship - then we have reference to another db collection document/s
        if (model?.[item]?.type === 'relationship') {
          // If dataType is belongsTo then we have to extract fields of db document from collection
          // that has name similar to this field's name and has id that is equal to field's value
          // so we recursively call this function for document with
          // id that is value of current field in current dbData document that is processed
          if (model?.[item]?.dataType === 'belongsTo')
            resultObject[item] = defineObjectAttributes(
              defineFieldType(fields?.[item], models?.[item]?.fields),
              models?.[item]?.fields,
              data?.[pluralize.plural(item)]?.[dbData[item]] // TODO change database interaction to real one
            )
          // If dataType is hasMany then we have to extract fields of every db document from collection
          // that has name similar to this field's name and its' id is in array of current field value
          // so we call this function for every db entry with id of fields' value array
          if (model?.[item]?.dataType === 'hasMany')
            resultObject[item] = dbData?.[item].map((hasManyId) =>
              defineObjectAttributes(
                defineFieldType(
                  fields?.[item],
                  models?.[pluralize.singular(item)]?.fields
                ),
                models?.[pluralize.singular(item)]?.fields,
                data?.[item]?.[hasManyId] // TODO change database interaction to real one
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

  const queryResult =
    queryJSON &&
    Object.entries(queryJSON).reduce(
      (acc, [collectionName, fields]) => ({
        ...acc,
        [collectionName]: Object.values(
          data[collectionName] // TODO change database interaction to real one
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
