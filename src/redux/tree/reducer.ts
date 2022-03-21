import { CheckedItemsPayLoad, ExpandedItemsPayLoad, TreePayLoad } from "./actions"
import { ReduxAction } from "../type"
import { ItemCheck, ItemExpand, TreeDataItem } from "../../types"
import { LOAD_TREE_DATA, SET_CHECKED_ITEMS, SET_EXPANDED_ITEMS } from "../actionTypes"
import { getTreeData } from "../../components/Tree/utils"
import { CheckboxState, ExpandState } from "../../constants"

const treeData = getTreeData()
const uncheckedItems = treeData.map(i => ({
  id: i.id,
  state: CheckboxState.UNCHECKED
}))

const collapseItems = treeData.map(i => ({
  id: i.id,
  state: ExpandState.COLLAPSE
}))

export type TreeState = {
  treeData: TreeDataItem[]
  checkedItems: ItemCheck[]
  expandedItems: ItemExpand[]
}

export const defaultState: TreeState = {
  treeData: treeData,
  checkedItems: uncheckedItems,
  expandedItems: collapseItems
}

const treeReducer = (state: TreeState = defaultState, action: ReduxAction<any>): TreeState => {
  const { type: actionType } = action

  switch (actionType) {
    case LOAD_TREE_DATA: {
      const actionPayload = (action as ReduxAction<TreePayLoad>).payload
      const { treeData } = actionPayload

      return {
        ...state,
        treeData
      }
    }

    case SET_CHECKED_ITEMS: {
      const actionPayload = (action as ReduxAction<CheckedItemsPayLoad>).payload
      const { checkedItems } = actionPayload

      return {
        ...state,
        checkedItems
      }
    }

    case SET_EXPANDED_ITEMS: {
      const actionPayload = (action as ReduxAction<ExpandedItemsPayLoad>).payload
      const { expandedItems } = actionPayload

      return {
        ...state,
        expandedItems
      }
    }

    default: {
      return state
    }
  }
}

export default treeReducer
