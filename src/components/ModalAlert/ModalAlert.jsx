import React, { useEffect } from 'react'
import './ModalAlert.css'
import ReactDOM from 'react-dom'
export const ModalAlert = ({ text, children, open, close }) => {
  setTimeout(close, 3000)

  if (!open) return null
  return ReactDOM.createPortal(
    <div className='modal-dialog'>
      {text.team === 'both' ? (
        <p>Спасибо, ваша ставка на ничью, с коэффицентом {text.bet} принята"</p>
      ) : (
        <p>
          Спасибо, ваша ставка на команду {text.team}, с коэффицентом {text.bet} принята"
        </p>
      )}
    </div>,
    document.getElementById('portal'),
  )
}
