import StackGridComponent from './src/main'

const StackGrid = function () {}

StackGrid.install = function (Vue, options) {
  if (StackGrid.installed) {
    return
  }
  Vue.component((options && options.name) || 'stack-grid', StackGridComponent)
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(StackGrid)
}

export default StackGrid
