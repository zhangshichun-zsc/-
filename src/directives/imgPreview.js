import Vue from 'vue'
import { Modal } from 'iview'

const HANDLER = '_img_preview_handler'

function previewHandler (el, targetSrc) {
  const imageSrc = targetSrc || el.getAttribute('src')
  if (imageSrc) {
    Modal.info({
      title: '预览',
      width: 800,
      scrollable: false,
      closable: true,
      render(h) {
        return h('div', {
          staticClass: 'flex-center-center'
        }, [
          h('img', {
            attrs: {
              src: imageSrc
            },
            style: {
              maxWidth: '100%'
            }
          })
        ])
      }
    })
  }
}

function unbind (el) {
  if (el[HANDLER]) {
    el.removeEventListener('click', previewHandler)
  }
  delete el[HANDLER]
}

function bind (el, binding) {
  unbind(el)
  el.style.cursor = 'pointer'
  el[HANDLER] = () => previewHandler(el, binding.value)
  el.addEventListener('click', el[HANDLER], true)
}

Vue.directive('preview', {
  bind,
  unbind
})
