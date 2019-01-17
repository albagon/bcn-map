import React from 'react';
import './App.css';

const ErrorMsg = ({ error, children }) => {
  const showHideClassName = error ? "error-container display-block" : "error-container display-none";

  return <div className={showHideClassName}>
           <section className="error-main">
             {children}
           </section>
         </div>
}

export default ErrorMsg
