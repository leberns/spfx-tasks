
#Install-Module -Name Az -Force
#Install-Module -Name PnP.PowerShell -Force

$vaultName = "PnPAzureDevOpsVault"
$certName = "PnPAzureDevOpsPfx"

$base64Cert = Get-AzKeyVaultSecret -VaultName $vaultName -Name $certName -AsPlainText

$siteUrl = "https://adessoleandrobernsmueller.sharepoint.com/sites/tasks-dev"
$tenant = "adessoleandrobernsmueller.onmicrosoft.com"
$clientId = "8c8d1427-6b98-47c6-ab1c-b8812590654a"

Connect-PnPOnline -url $siteUrl -clientId $clientId -Tenant $tenant -CertificateBase64Encoded $base64Cert

Get-PnPWeb
