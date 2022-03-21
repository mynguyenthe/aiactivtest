import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import store, { persist } from "./redux/store"
import App from "./app"
import "./assets/scss/styles.scss"

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persist}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
)
