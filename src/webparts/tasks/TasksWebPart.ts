import { sp } from '@pnp/sp';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'TasksWebPartStrings';
import Tasks from './components/Tasks';
import { ITasksProps } from './components/ITasksProps';
import { IAppContext } from '../../appContext/IAppContext';

export interface ITasksWebPartProps {
  listTitle: string;
}

export default class TasksWebPart extends BaseClientSideWebPart<ITasksWebPartProps> {

  public async onInit(): Promise<void> {
    await super.onInit();
    sp.setup({
      spfxContext: this.context
    });
  }

  public render(): void {

    const appContext: IAppContext = {
      context: this.context,
      listTitle: this.properties.listTitle
    };

    const element: React.ReactElement<ITasksProps> = React.createElement(
      Tasks,
      {
        appContext
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('Tasks List', {
                  label: strings.ListTitleFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
