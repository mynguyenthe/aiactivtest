// @ts-ignore
import TreeData from "../../data/treedata.json"
import { ItemCheck, ItemExpand, TreeDataItem } from "../../types"
import { CheckboxState, ExpandState } from "../../constants"

export function getTreeData(): TreeDataItem[] {
  return TreeData.map(item => ({
    ...item,
    hasChildren: TreeData.filter(i => i.parentId === item.id).length > 0
  }))
}

export const setItemsChecked = (oldState: ItemCheck[], items: TreeDataItem[], selectedItem: number) => {
  const newState = [...oldState]

  const getItemState = (id: number) => {
    return newState.find(i => i.id === id).state
  }

  const updateParent = (id: number) => {
    const item = items.find(i => i.id === id)
    const parent = items.find(i => i.id === item.parentId)
    if (!parent) return
    const childIds = items.filter(i => i.parentId === parent.id).map(i => i.id)
    const childStates = childIds.map(childId => getItemState(childId))
    if (childStates.length === childStates.filter(s => s === CheckboxState.CHECKED).length) {
      newState.find(i => i.id === parent.id).state = CheckboxState.CHECKED
    } else if (childStates.length === childStates.filter(s => s === CheckboxState.UNCHECKED).length) {
      newState.find(i => i.id === parent.id).state = CheckboxState.UNCHECKED
    } else {
      newState.find(i => i.id === parent.id).state = CheckboxState.INDETERMINATE
    }
    updateParent(parent.id)
  }

  const setUnchecked = (id: number) => {
    newState.find(i => i.id === id).state = CheckboxState.UNCHECKED
    items
      .filter(i => i.parentId === id)
      .map(i => i.id)
      .forEach(childId => setUnchecked(childId))
    updateParent(id)
  }
  const setChecked = (id: number) => {
    newState.find(i => i.id === id).state = CheckboxState.CHECKED
    items
      .filter(i => i.parentId === id)
      .map(i => i.id)
      .forEach(childId => setChecked(childId))
    updateParent(id)
  }

  const itemState = getItemState(selectedItem)
  if (itemState === CheckboxState.CHECKED) {
    setUnchecked(selectedItem)
  } else {
    setChecked(selectedItem)
  }
  return newState
}

export const setItemsExpand = (oldState: ItemExpand[], items: TreeDataItem[], selectedItem: number) => {
  const newState = [...oldState]
  const getItemState = (id: number) => {
    return newState.find(i => i.id === id).state
  }

  const itemState = getItemState(selectedItem)
  if (itemState === ExpandState.EXPAND) {
    newState.find(i => i.id === selectedItem).state = ExpandState.COLLAPSE
  } else {
    newState.find(i => i.id === selectedItem).state = ExpandState.EXPAND
  }
  return newState
}
