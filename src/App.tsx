import React, { useState } from 'react';
import PresentationPage from './Components/Presentation';
import MainContent from './Components/Main';

const App = () => {
  const [showPresentationPage, setShowPresentationPage] = useState(true);

  const handlePresentationPageFinish = () => {
    setShowPresentationPage(false);
  };

  return (
      <>
        {showPresentationPage && <PresentationPage onFinish={handlePresentationPageFinish} />}
        {!showPresentationPage && <MainContent />}
      </>
  );
};

export default App;

