import React from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

const Modal = (props) => {
  const { contentStyle, trigger, children, position } = props

  return (
    <Popup
      contentStyle={contentStyle}
      trigger={trigger}
      position={position}
      modal>
      {children}
    </Popup>
  )
}

Modal.defaultProps = {
  position: 'right center',
}

export default Modal
