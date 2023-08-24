import Swal from 'sweetalert2'

import 'animate.css'

const basicOptions = {
  allowOutsideClick: false,
  allowEscapeKey: false,
  showCancelButton: false,
  confirmButtonColor: '#3BB2B8',
  confirmButtonText: '確認',
  cancelButtonText: '取消',
}

export const close = () => {
  Swal.close()
}

export const basicSwal = async ({ title, text = '', icon, options = {} }) => {
  return await Swal.fire({
    ...basicOptions,
    ...options,
    allowOutsideClick: false,
    icon,
    text,
    title,
  })
}

export const noIconSwal = async ({ title, text = '', options = {} }) => {
  return await Swal.fire({
    ...basicOptions,
    ...options,
    allowOutsideClick: false,
    text,
    title,
  })
}

export const noIconFadeHtmlSwal = async ({ title, html = '', options = {} }) => {
  return await Swal.fire({
    ...basicOptions,
    ...options,
    allowOutsideClick: false,
    confirmButtonText: '確認',
    customClass: { htmlContainer: 'f2e-swal-html-container' },
    hideClass: { popup: 'animate__animated animate__fadeOut' },
    html,
    showClass: { popup: 'animate__animated animate__fadeIn' },
    showCloseButton: true,
    title,
  })
}

export const errorSwal = async (errMsg) => {
  await Swal.fire({
    ...basicOptions,
    allowOutsideClick: false,
    icon: 'error',
    text: errMsg,
    title: '發生錯誤',
  })
}

export const showLoading = (title, text) => {
  Swal.fire({
    title,
    text,
    allowOutsideClick: false,
    showConfirmButton: false,
    willOpen: () => { Swal.showLoading() },
  })
}

export const popup = {
  basicSwal,
  close,
  errorSwal,
  noIconFadeHtmlSwal,
  noIconSwal,
  showLoading,
}

export default popup
