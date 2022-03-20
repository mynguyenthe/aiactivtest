const setCheckedTreeItems = checkedItems => {
  return {
    type: "SET_CHECKED_TREE_ITEM",
    payload: checkedItems
  }
}

export default {
  setCheckedTreeItems
}
