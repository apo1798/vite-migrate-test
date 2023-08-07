import React, { PureComponent } from 'react'
import Reshow, { ReshowMessage } from 'reshow'
import { PageLoadProgressHandler } from 'organism-react-progress'
import { DndProvider } from 'react-dnd'
import { ConfigProvider } from 'antd'
import zhTW from 'antd/lib/locale/zh_TW'
import { ThemeProvider } from 'styled-components'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import '../App.less'

const theme = {
  colors: {
    primary: {
      main: '#223756',
      light: '#677994',
      text: '#000000',
    },
    secondary: {},
    white: '#fff',
    grey: '#d3d3d3c4',
  },
  background: {
    system: '#f5f8fc',
    official: '#fcfcfc',
  },
  button: {
    system: '#5ebbc9',
    official: '#223756',
  },
}

const routes = [
  {
    path: '/',
    exact: true,
    component: <div>Hello world!</div>,
  },
]

function MainRouter() {
  // TODO migrate all transition between pages with react router api
  return (
    <Switch>
      {routes.map(({ path, exact, component }) => (
        <Route key={path} path={path} exact={exact}>
          {component}
        </Route>
      ))}
    </Switch>
  )
}

// key of themes must fit themePath in omnianalytics/urls.py
const themes = {
  MainRouter: MainRouter,
}

class Index extends PureComponent {
  render() {
    const props = this.props

    return (
      <div>
        <ThemeProvider theme={theme}>
          <ConfigProvider locale={zhTW}>
            <>
              <DndProvider backend={HTML5Backend}>
                <Router>
                  <Reshow
                    immutable={true}
                    themes={themes}
                    // themePath="MainRouter" // current workaround
                    {...props}
                  />
                </Router>
                <PageLoadProgressHandler ajax zIndex={1000} />
                <ReshowMessage
                  defaultAlertProps={{ position: 'bottom', duration: 7000 }}
                />
              </DndProvider>
            </>
          </ConfigProvider>
        </ThemeProvider>
      </div>
    )
  }
}

export default Index
