import * as React from "react"
import * as ReactDOM from "react-dom"
import App from "./app"
import { Provider } from "react-redux"
import { createStore } from "redux"
import rootReducer from "./redux/reducers"
import "./assets/scss/styles.scss"

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
