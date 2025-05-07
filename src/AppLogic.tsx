import React, { ReactElement, ReactNode } from 'react';

interface IAppLogic {
  children: ReactNode | ReactElement
}

const AppLogic = (props: IAppLogic) => {

  return <>{props.children}</>;
}

export default AppLogic;
