import React from "react"
import classnames from "classnames"
import "./index.scss"

type checkboxProps = {
  isChecked?: boolean
  isIndeterminate?: boolean
  onClick?: () => void
}

const Checkbox: React.FC<checkboxProps> = ({
  isChecked = false,
  isIndeterminate = false,
  onClick
}) => {
  return (
    <span
      className={classnames("checkbox", {
        isIndeterminate: isIndeterminate,
        isChecked: isChecked
      })}
      onClick={onClick}
    />
  )
}

export default Checkbox
