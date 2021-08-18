## Introduction

It is demonstrated CI / CD with Azure DevOps for a SharePoint client project.

## Features

* gulp tasks are used in the build pipeline to prepare a SPFx solution
* release pipeline to execute PnP PowerShell and deploy to a SharePoint Online site
* Azure Key Vault stores the certificates used by the PnP PowerShell to connect to the SharePoint Online tenant during release (no username and password are needed and no secrets are stored in the solution)

The solution to be released is composed by:

* the SharePoint Framework (SPFx) solution [SPFx Tasks](https://github.com/leberns/spfx-tasks)
* the PnP provisioning site template [TasksPnPTemplate.xml](https://github.com/leberns/spfx-tasks/blob/main/template/TasksPnPTemplate.xml)
* the PowerShell script to execute the deployment [Deploy-TasksSolution.ps1](https://github.com/leberns/spfx-tasks/blob/main/scripts/Deploy-TasksSolution.ps1) - this means, to install the SPFx solution and execute the PnP provisioning engine

## Prerequisites

* SharePoint Online tenant with a modern team site where to project is released (ex.: https://[YOUR-TENANT].sharepoint.com/sites/tasks-test)
* GitHub repository with sources (https://github.com/)
* Azure tenant (login to https://portal.azure.com/)
* Azure DevOps organization 
* Azure DevOps project (Version control Git, Work item process basic)

## Continuos integration

The build pipeline is created from the "Starter pipeline".

Trigger: the build pipeline is triggered when a pull request is merged to the main branch.

The build pipeline uses YAML tasks to do the following:

1. prepare the SPFx solution for deployment
  1. install NodeJs
  2. install the package dependencies of the SPFx solution
  3. execute `gulp clean`
  4. execute `gulp build`
  5. execute `gulp bundle --ship`
  6. execute `gulp package-solution --ship`
2. copy the SPFx solution package, site template and deployment script
3. publish the files to the `drop` location

The following files are published to `drop`:
* [Deploy-TasksSolution.ps1](https://github.com/leberns/spfx-tasks/blob/main/scripts/Deploy-TasksSolution.ps1)
* [TasksPnPTemplate.xml](https://github.com/leberns/spfx-tasks/blob/main/template/TasksPnPTemplate.xml)
* `tasks.sppkg`

For details refer to the YAML file [azure-pipelines.yml](https://github.com/leberns/spfx-tasks/blob/main/azure-pipelines.yml)

## Continuos delivery

The PowerShell script `Deploy-TasksSolution.ps1` performs the deployment using PnP PowerShell. 

### Installing PowerShell 7 (or later)

PnP PowerShell is multiplatform and therefore requires PowerShell 7, by the time of this writting.

Make sure you have PowerShell 7 (or a later version) on your system: [Installing various versions of PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell)

### PnP PowerShell preparation

The PowerShell script [Register-PnPApp.ps1](https://github.com/leberns/spfx-tasks/blob/main/scripts/Register-PnPApp.ps1) performs the initial registration of PnP PowerShell on a tenant. The tenant name has to be updated according to your tenant.

The steps below have to be done for the first time PnP PowerShell is used on a tenant.

1. execute `Register-PnPManagementShellAccess` to register the Azure AD Application `PnP Management Shell`

After consent is given the Azure AD Application will be avaiable unter `Enterprise applications` of your [Azure tenant](https://portal.azure.com/)

2. register a new Azure AD Application for PnP PowerShell, see the cmdlet `Register-PnPAzureADApp` in `Register-PnPApp.ps1` for this.

A new Azure AD Application is created, the administrator has to give consent and the certificates to access the application are generated (so that username and password are not needed for PnP to connect to SharePoint).

The `$app` variable of the script `Register-PnPApp.ps1` has information about the application registration.

Make note of the client Id as available from `$app.'AzureAppId/ClientId'`

The private key of the certificate encoded as base 64 is stored in a local file: `certificates\PnPAzureDevOps-Base64Encoded.txt`.

Because of the `.gitignore` none of the certificate files are saved into the Git repository. The deployment script has to receive this information from the Azure Key Vault.

Further details about how to register PnP PowerShell under [Authentication](https://pnp.github.io/powershell/articles/authentication.html)

### Enanling site collection app catalog

Enable app calatog at the team site where the project is released.

This is optional, for this demonstration the SPFx solution was added to the app catalog of the site collection and not tenant.

Update the PowerShell script with your details for that [Enable-AppCatalogSiteCollection.ps1](https://github.com/leberns/spfx-tasks/blob/main/scripts/Enable-AppCatalogSiteCollection.ps1)

### Azure Key Vault preparation

The certificate and client Id have to be stored in the Azure Key Vault.

Under `https://portal.azure.com/` - `Key vaults`, create a key vault named `PnPAzureDevOpsVault`.

#### Store the private key as base 64

Under `Secrets` click on `Generate/Import` and name the secret `PnPAzureBase64Certificate`. Copy the content of the file (`certificates\PnPAzureDevOps-Base64Encoded.txt`) into the `Value` field and hit `Create`.

#### Store the client Id

Under `Secrets` click on `Generate/Import` and name the secret `PnPAzureClientId`. Copy the client Id into the `Value` field and hit `Create`.

#### Grant permissions to the key vault

The pipeline has to have access to the key vault, otherwise the tasks fail to get the secrets.

A security principal is created automatically during the pipeline configuration, for details refer to "Task 1: Creating a service principal" under [Authentication](https://pnp.github.io/powershell/articles/authentication.html).

Grant access to this security principal under `Access policies` > `Add Access Policy`:

* Check under `Secret permissions`: `Get`, `List`.
* Under `Select principal`, select the principal. The principal name follows the pattern [Your organization name]-[Azure DevOps project name]-[GUID], ex.: `LebernsAg-SPFxTasks-b57e1ec0-f360-4302-820d-5cf245939b5b`

#### Troubleshooting permissions

If in doubt about the security principal name, continue the configuration and while running the release pipeline an error displaying the `oid` of the security principal is displayed. You can search for the `oid` under `Select principal`.

Error example:

```
2021-08-10T19:38:40.3598787Z Downloading secret value for: PnPAzureBase64Certificate.

2021-08-10T19:38:41.5453179Z ##[error]
PnPAzureBase64Certificate: "The user, group or application 'appid=***;oid=d14cd98d-c2f1-4b71-83f1-05984314d135;iss=https://sts.windows.net/***/' does not have secrets get permission on key vault 'PnPAzureDevOpsVault;location=switzerlandnorth'. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125287. The specified Azure service connection needs to have Get, List secret management permissions on the selected key vault. To set these permissions, download the ProvisionKeyVaultPermissions.ps1 script from build/release logs and execute it, or set them from the Azure portal."

2021-08-10T19:38:41.5457474Z Uploading D:\a\r1\a\ProvisionKeyVaultPermissions.ps1 as attachment
```

### Project variables configuration

In your Azure DevOps project, `Pipelines` > `Library`, create a `Variable group` named `Release Variables`.

Create the variables:

* `baseSiteUrl = https://YOUR-TENANT.sharepoint.com/sites/tasks-`
* `dropPath =` _ + organization + project name, all in lower case, ex.: `_leberns.spfx-tasks`
* `pnpTemplateFileName = TasksPnPTemplate.xml`
* `spfxSolutionFileName = tasks.sppkg`
* `tenant = YOUR-TENANT.onmicrosoft.com`

After completing further configurations these variables are available during release to the [Deploy-TasksSolution.ps1](https://github.com/leberns/spfx-tasks/blob/main/scripts/Deploy-TasksSolution.ps1) script as environment variables.

### Release pipeline configuration

In your Azure DevOps project, `Pipelines` > `Releases`, click on `+ New` and select `New release pipeline`, choose `Empty job` to start.

#### Define the artifacts

For the `Artifacts` use your build pipeline.

The source alias is like `_leberns.spfx-tasks` (as per the `dropPath` variable above).

#### Rename the stage

Rename the stage to `Deploy to Test`.

#### Make the Release Variables available

Under `Variables` tab, `Variable groups` > click on `Link to variable group`.

After linking the variables are visible there and available to the release pipeline.

#### Release Tasks

Under `Tasks` tab, `Deploy to Test` stage > add the Agent jobs:

* Azure Key Vault - this task makes key vault secrets available for the pipeline
* PowerShell - to execute the deployment script

#### Azure Key Vault task configuration

* `Display name: Read Key Vault PnPAzureDevOpsVault`
* `Azure subscription`: (select your subscription)
* `Key vault: PnPAzureDevOpsVault`
* `Secrets filter: PnPAzureBase64Certificate,PnPAzureClientId`

#### PowerShell task configuration

* `Display name: Deployment PowerShell Script`
* select `File Path`
* `Script path: $(System.DefaultWorkingDirectory)/_leberns.spfx-tasks/drop/Deploy-TasksSolution.ps1` - update according to your dropPath
* `Arguments: -pnpAzureClientId $(PnPAzureClientId)`
* `ErrorActionPreference: Stop`
* `Environment Variables:`
  * `deployment = test`
  * `pnpBase64CertificateSecret = $(PnpBase64CertificateSecret)`

The client Id is passed as parameter (`pnpAzureClientId`).

The certificate as base 64 is passed as environment variable (`pnpBase64CertificateSecret`).

The variable `deployment` is used by the script to define the URL of the site collection where to release. 

## Executing the pipelines

* create a new branch in Git, do a change in the sources and do a pull request to main
* approve and merge the pull request
* the build pipeline should start
* wait until completed - check under your build pipeline > `Related` > `1 published` - should display the 3 files published to drop.
* go to `Releases` and click on `Create release`

## References

* [Authentication](https://pnp.github.io/powershell/articles/authentication.html)
* [Using secrets from Azure Key Vault in a pipeline](https://azuredevopslabs.com/labs/vstsextend/azurekeyvault/)
* [How to: Use PnP.PowerShell to deploy SharePoint apps with Azure DevOps](https://coreyroth.com/2021/01/20/how-to-use-pnp-powershell-to-deploy-sharepoint-apps-with-azure-devops/)
* [How to: Setup CI / CD in Azure DevOps with the help of SPFx Generator](https://coreyroth.com/2019/05/06/how-to-setup-ci-cd-in-azure-devops-with-the-help-of-spfx-generator/)
* [CI/CD with SharePoint Framework (SPFx)](https://devblogs.microsoft.com/premier-developer/ci-cd-with-sharepoint-framework-spfx/)
* [Installing various versions of PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell)