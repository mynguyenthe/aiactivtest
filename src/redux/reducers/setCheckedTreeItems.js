const checkedTreeItems = (state = {}, action) => {
  switch (action.type) {
    case "SET_CHECKED_TREE_ITEM":
      return {
        ...state,
        checkedTreeItems: action.payload
      }
    default:
      return state
  }
}

export default checkedTreeItems
