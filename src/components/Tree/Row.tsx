import classnames from "classnames"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Checkbox from "../Checkbox"
import { RowProps } from "../../types"
import { CheckboxState, ExpandState } from "../../constants"
import "./row.scss"

const DEFAULT_PADDING_LEFT_LEAF = 20

export default function Row({
  item,
  level,
  children,
  getCheckStateForId,
  onCheckBoxChanged = () => {},
  getExpandStateForId,
  onExpandChanged
}: RowProps) {
  const checkboxState = getCheckStateForId(item.id)
  const expandState = getExpandStateForId(item.id)

  const entityIcon = item.hasChildren ? (
    expandState === ExpandState.COLLAPSE ? (
      <FontAwesomeIcon icon="folder" className="folder" />
    ) : (
      <FontAwesomeIcon icon="folder-open" className="folderOpen" />
    )
  ) : (
    <FontAwesomeIcon icon="file" className="file" />
  )

  return (
    <div key={`section-${item.id}`}>
      <div style={{ paddingLeft: `${DEFAULT_PADDING_LEFT_LEAF * level}px` }} className="row">
        {!item.hasChildren ? null : (
          <FontAwesomeIcon
            key={item.id}
            onClick={() => onExpandChanged(item.id)}
            icon="caret-right"
            className={classnames("caret", {
              rotated: expandState === ExpandState.EXPAND
            })}
          />
        )}
        <span style={{ paddingLeft: "10px" }}>{entityIcon}</span>
        <span style={{ paddingLeft: "10px" }}>
          <Checkbox
            onClick={() => onCheckBoxChanged(item.id)}
            isChecked={checkboxState === CheckboxState.CHECKED}
            isIndeterminate={checkboxState === CheckboxState.INDETERMINATE}
          />
        </span>
        <span className={"label"}>{item.label}</span>
      </div>
      {expandState === ExpandState.EXPAND && <div>{children}</div>}
    </div>
  )
}
