import { Dispatch } from "redux"
import { ReduxAction } from "../type"
import { ItemCheck, ItemExpand, TreeDataItem } from "../../types"
import { LOAD_TREE_DATA, SET_CHECKED_ITEMS, SET_EXPANDED_ITEMS } from "../actionTypes"
import { getTreeData } from "../../components/Tree/utils"

const treeData = getTreeData()
export type TreePayLoad = { treeData: TreeDataItem[] }
export type CheckedItemsPayLoad = { checkedItems: ItemCheck[] }
export type ExpandedItemsPayLoad = { expandedItems: ItemExpand[] }

export const treeDataReceived = (treeData: TreeDataItem[]): ReduxAction<TreePayLoad> => {
  return {
    type: LOAD_TREE_DATA,
    payload: { treeData }
  }
}

export const loadTreeData = () => {
  return async (dispatch: Dispatch<ReduxAction<TreePayLoad>>) => {
    dispatch(treeDataReceived(treeData))
  }
}

export const setCheckedItems = (checkedItems: ItemCheck[]) => {
  return async (dispatch: Dispatch<ReduxAction<CheckedItemsPayLoad>>) => {
    dispatch({
      type: SET_CHECKED_ITEMS,
      payload: { checkedItems }
    })
  }
}

export const setExpandedItems = (expandedItems: ItemExpand[]) => {
  return async (dispatch: Dispatch<ReduxAction<ExpandedItemsPayLoad>>) => {
    dispatch({
      type: SET_EXPANDED_ITEMS,
      payload: { expandedItems }
    })
  }
}
