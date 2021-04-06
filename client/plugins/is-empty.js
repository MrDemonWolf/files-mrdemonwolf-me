export default (context, inject) => {
  const isEmpty = (value) =>
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)

  inject('isEmpty', isEmpty)
  context.$isEmpty = isEmpty
}
