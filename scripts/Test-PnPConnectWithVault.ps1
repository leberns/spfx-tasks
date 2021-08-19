
param($clientId) # the PnPAzureDevOps application Id under Enterprise applications in Azure portal

#Install-Module -Name Az -Force
#Install-Module -Name PnP.PowerShell -Force

$vaultName = "PnPAzureDevOpsVault"
$certName = "PnPAzureDevOpsPfx" # the .pfx certificate file was imported into the vault

$base64Cert = Get-AzKeyVaultSecret -VaultName $vaultName -Name $certName -AsPlainText

$siteUrl = "https://adessoleandrobernsmueller.sharepoint.com/sites/tasks-dev"
$tenant = "adessoleandrobernsmueller.onmicrosoft.com"

Connect-PnPOnline -url $siteUrl -clientId $clientId -Tenant $tenant -CertificateBase64Encoded $base64Cert

Get-PnPWeb
