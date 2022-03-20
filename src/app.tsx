import * as React from "react"
import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { ItemCheck, ItemExpand, TreeDataItem } from "./types"
import Tree from "./components/Tree/Tree"
import { CheckboxState, ExpandState } from "./constants"
import { getTreeData } from "./components/Tree/utils"
import "./app.scss"
import allActions from "./redux/actions"

const App = () => {
  const [filterText, setFilterText] = useState<string>("")
  const [treeData, setTreeData] = useState<TreeDataItem[]>([])
  const [filteredItems, setFilteredItems] = useState<TreeDataItem[]>([])
  const [checkedItems, setCheckedItems] = useState<ItemCheck[]>([])
  const [expandedItems, setExpandedItems] = useState<ItemExpand[]>([])
  const [expandedFilteredItems, setExpandedFilteredItems] = useState<ItemExpand[]>([])

  const dispatch = useDispatch()
  const handleCheckedItems = (checkedItems: ItemCheck[]) => {
    dispatch(allActions.treeDataActions.setCheckedTreeItems(checkedItems))
    setCheckedItems(checkedItems)
  }

  const handleExpandedItems = (expandedItems: ItemExpand[]) => {
    setTimeout(() => {
      setExpandedItems(expandedItems)
    }, 100)
  }

  const handleFilterTextChange = useCallback(
    (value: string) => {
      setFilterText(value)
      return filterTree(value)
    },
    [filterText]
  )

  const filterNodes = (filtered = [], item) => {
    const children = treeData.filter(i => i.parentId === item.id).reduce(filterNodes, [])

    if (
      // Node's label matches the search string or a children has a matching node
      item.label.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1 ||
      children.length
    ) {
      filtered.push({ ...item })
    }

    setExpandedFilteredItems(
      filtered.map(i => ({
        id: i.id,
        state: ExpandState.EXPAND
      }))
    )
    return filtered
  }

  const filterTree = filterText => {
    if (!filterText) {
      setFilteredItems(treeData)
      setExpandedFilteredItems(expandedItems)
      return
    }

    setFilteredItems(treeData.reduce(filterNodes, []))
  }

  useEffect(() => {
    const treeData = getTreeData()

    setTreeData(treeData)
    setFilteredItems(treeData)
    //set default unselected item
    const uncheckItems = treeData.map(i => ({
      id: i.id,
      state: CheckboxState.UNCHECKED
    }))

    setCheckedItems(uncheckItems)

    //set default expanded item
    const collapseItems = treeData.map(i => ({
      id: i.id,
      state: ExpandState.COLLAPSE
    }))
    setExpandedItems(collapseItems)

    //set default expanded filtered item
    setExpandedFilteredItems(collapseItems)
  }, [])

  return (
    <div className="container">
      <div className="title">TREE COMPONENT - AI ACTIV</div>
      <input
        className="filter-text"
        placeholder="Search by name..."
        type="text"
        value={filterText}
        onChange={e => handleFilterTextChange(e.target.value)}
      />
      <Tree
        treeData={filteredItems}
        expandedItems={expandedFilteredItems}
        onExpandedItems={handleExpandedItems}
        checkedItems={checkedItems}
        onCheckedItems={handleCheckedItems}
      />
    </div>
  )
}
export default App
