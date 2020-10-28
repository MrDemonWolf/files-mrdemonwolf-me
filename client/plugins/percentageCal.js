export default (context, inject) => {
  const percentageCal = (partialValue, totalValue) => {
    return Math.round((100 * partialValue) / totalValue, 2)
  }

  inject('percentageCal', percentageCal)
  context.$percentageCal = percentageCal
}
