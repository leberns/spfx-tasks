# perform the PnP app registration on Azure

# update according to the local folder where your sources are located
Set-Location C:\Dev\GitHub\leberns\spfx-tasks\scripts

# consent to the required permissions for PnP PowerShell
Register-PnPManagementShellAccess

# register PnPAzureDevOps app in Azure, allow administrator to give consent and generate certificates for connection
$app = Register-PnPAzureADApp -ApplicationName PnPAzureDevOps -Tenant adessoleandrobernsmueller.onmicrosoft.com -OutPath ..\certificates -DeviceLogin
$app
$app.'AzureAppId/ClientId'
$app.Base64Encoded > ..\certificates\PnPAzureDevOps-Base64Encoded.txt
