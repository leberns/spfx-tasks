# https://coreyroth.com/2021/01/20/how-to-use-pnp-powershell-to-deploy-sharepoint-apps-with-azure-devops/

# consent to the required permissions for PnP PowerShell
Register-PnPManagementShellAccess

# register PnPAzureDevOps app in Azure, allow developer user to give consent and generate certificates
Register-PnPAzureADApp -ApplicationName PnPAzureDevOps -Tenant adessoleandrobernsmueller.onmicrosoft.com -OutPath .\certificates -DeviceLogin
