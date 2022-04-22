import React from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

const Modal = (props) => {
  const { trigger, children, position } = props

  return (
    <Popup trigger={trigger} position={position} modal>
      {children}
    </Popup>
  )
}

Modal.defaultProps = {
  position: 'right center',
}

export default Modal
