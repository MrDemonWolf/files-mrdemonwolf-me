import sha512 from 'js-sha512'

export default (context, inject) => {
  inject('sha512', sha512)
  context.$sha512 = sha512
}
