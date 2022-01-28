import React, {useEffect} from 'react';

import InAppUpdate from './InAppUpdate';
import Providers from './app/navigation';

const App = () => {
useEffect(() => {
    InAppUpdate.checkUpdate();
  }, []);
  return <Providers />;
};

export default App;
