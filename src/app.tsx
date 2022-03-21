import * as React from "react"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ItemCheck, ItemExpand, TreeDataItem } from "./types"
import Tree from "./components/Tree/Tree"
import { ExpandState } from "./constants"
import { RootState } from "./redux/store"
import { setCheckedItems, setExpandedItems } from "./redux/tree/actions"
import "./app.scss"

const App = () => {
  const dispatch = useDispatch()
  const { treeData, checkedItems, expandedItems } = useSelector((state: RootState) => state.tree)
  const [filterText, setFilterText] = useState<string>("")
  const [filteredItems, setFilteredItems] = useState<TreeDataItem[]>([])
  const [expandedFilteredItems, setExpandedFilteredItems] = useState<ItemExpand[]>([])

  const handleCheckedItems = (checkedItems: ItemCheck[]) => {
    dispatch(setCheckedItems(checkedItems))
    //setCheckedItems(checkedItems)
  }

  const handleExpandedItems = (expandedItems: ItemExpand[]) => {
    setTimeout(() => {
      dispatch(setExpandedItems(expandedItems))
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
    // set default filtered item
    setFilteredItems(treeData)

    //set default expanded filtered item
    setExpandedFilteredItems(expandedItems)
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
