import React, { useCallback, useState } from "react"
import { getTreeData, setItemsChecked, setItemsExpand } from "./utils"
import { TreeProps } from "../../types"
import Row from "./Row"

export default function Tree({ treeData, parentId = 0, level = 0, expandedItems, onExpandedItems, checkedItems, onCheckedItems }: TreeProps) {
  const getExpandStateForId = useCallback(
    (id: number) => {
      return expandedItems.find(i => i.id === id).state
    },
    [expandedItems]
  )

  const handleExpandChanged = useCallback((id: number) => onExpandedItems(setItemsExpand(expandedItems, getTreeData(), id)), [expandedItems])

  const getCheckStateForId = useCallback(
    (id: number) => {
      return checkedItems.find(i => i.id === id).state
    },
    [checkedItems]
  )

  const handleCheckBoxChanged = useCallback((id: number) => onCheckedItems(setItemsChecked(checkedItems, getTreeData(), id)), [checkedItems])

  const items = treeData.filter(item => item.parentId === parentId).sort((a, b) => (a.label > b.label ? 1 : -1))
  if (!items.length) return null
  return (
    <>
      {items.map((item, index) => (
        <Row
          key={item.id}
          item={item}
          level={level}
          getExpandStateForId={getExpandStateForId}
          onExpandChanged={handleExpandChanged}
          getCheckStateForId={getCheckStateForId}
          onCheckBoxChanged={handleCheckBoxChanged}
        >
          <Tree
            treeData={treeData}
            parentId={item.id}
            level={level + 1}
            expandedItems={expandedItems}
            onExpandedItems={onExpandedItems}
            checkedItems={checkedItems}
            onCheckedItems={onCheckedItems}
          />
        </Row>
      ))}
    </>
  )
}
