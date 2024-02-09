import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './Store';
import PeopleList from './PeopleList';

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <div className="App">
          <PeopleList />
        </div>
      </Provider>
    </div>
  );
};

export default App;
