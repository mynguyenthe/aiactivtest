import { CheckboxState, ExpandState } from "../constants"
import { Dispatch, SetStateAction } from "react"

export type ItemCheck = {
  id: number
  state: CheckboxState
}

export type ItemExpand = {
  id: number
  state: ExpandState
}

export type TreeDataItem = {
  id: number
  label: string
  parentId: number
  hasChildren: boolean
}

export type TreeProps = {
  treeData: TreeDataItem[]
  parentId?: number
  level?: number
  expandedItems?: ItemExpand[]
  onExpandedItems?: Dispatch<SetStateAction<ItemExpand[]>>
  checkedItems?: ItemCheck[]
  onCheckedItems?: Dispatch<SetStateAction<ItemCheck[]>>
}

export type RowProps = {
  item: TreeDataItem
  level: number
  children: React.ReactNode
  getCheckStateForId: (id: number) => CheckboxState
  onCheckBoxChanged?: (id: number) => void
  getExpandStateForId: (id: number) => ExpandState
  onExpandChanged?: (id: number) => void
}
