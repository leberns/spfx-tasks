
# consent to the required permissions for PnP PowerShell
Register-PnPManagementShellAccess

# register SPFxAzureDevOps app in Azure, allow to give consent and generate certificates
Register-PnPAzureADApp -ApplicationName SPFxAzureDevOps -Tenant adessoleandrobernsmueller.onmicrosoft.com -OutPath . -DeviceLogin
