import * as React from 'react';
import { FunctionComponent, Fragment, useState, useEffect } from "react";

import { MessageBar, MessageBarType } from 'office-ui-fabric-react';
import { HttpRequestError } from "@pnp/odata";

import { IErrorViewerProps } from "./IErrorViewerProps";
import { IODataError } from '../interfaces/IODataError';

const ErrorViewer: FunctionComponent<IErrorViewerProps> = (props) => {
  const error = props.error === undefined ? null : props.error;

  const [errorElement, setErrorElement] = useState(null as JSX.Element);

  useEffect(() => {
    let unmounted = false;

    (async () => {
      const el = await createErrorElement(error);
      if (unmounted) {
        return;
      }
      setErrorElement(el);
    })();

    return () => unmounted = true;
  }, [error]);

  if (error === null) {
    return <Fragment>{props.children}</Fragment>;
  }

  return (
    <MessageBar messageBarType={MessageBarType.error}>
      {errorElement}
    </MessageBar>
  );
};

async function createErrorElement(error: any): Promise<JSX.Element> {
  if (error === null) {
    return null;
  }

  if (error?.isHttpRequestError) {
    const el = await getHttpRequestError(error);
    return el;
  }

  if (error instanceof Error) {
    const el = await getError(error);
    return el;
  }

  const simpleEl = await getErrorDirect(error);
  return simpleEl;
}

async function getHttpRequestError(error: HttpRequestError): Promise<JSX.Element> {
  const statusInfo = (error.status || error.statusText) ? ` HTTP Error ${error.status} ${error.statusText}` : '';

  const responseJson = (await error.response.clone().json()) as IODataError;
  const messageLine = responseJson['odata.error'] ? responseJson['odata.error']?.message?.value : null;
  const messageElement = messageLine ? <div>{messageLine}</div> : null;

  const element = (
    <div>
      <div>The request failed.{statusInfo}</div>
      {messageElement}
    </div>
  );

  return element;
}

async function getError(error: Error): Promise<JSX.Element> {
  const content = error.message;
  return <div>{content}</div>;
}

async function getErrorDirect(error: any): Promise<JSX.Element> {
  return <div>{error}</div>;
}

export default ErrorViewer;