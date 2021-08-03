# Deploy the SPFx Tasks client solution and pnp template
# The PnP connection to the site is made through a certificate

Write-Host "Starting SPFx solution deployment"

Install-Module -Name PnP.PowerShell -Force

$vaultName = "PnPAzureDevOpsVault"
$certName = "PnPAzureDevOpsPfx"
$tenant = "adessoleandrobernsmueller.onmicrosoft.com" # $env:tenant
$clientId = "8c8d1427-6b98-47c6-ab1c-b8812590654a"    # $env:clientId
$dropPath = "_leberns.spfx-tasks"                     # $env:dropPath
$spfxSolutionFileName = "tasks.sppkg"                 # $env:spfxSolutionFileName
$siteUrl = "https://adessoleandrobernsmueller.sharepoint.com/sites/tasks-dev"

$base64Cert = Get-AzKeyVaultSecret -VaultName $vaultName -Name $certName -AsPlainText

Write-Host "Certificate retrieved, lenght: $($base64Cert.Length)"

#if ($env:environment -eq "development") {
#  $siteUrl = $env:devSiteUrl
#}
#else {
#  $siteUrl = $env:testSiteUrl
#}

Write-Host "Site: $siteUrl"

#$certificatePath = "./$($env:dropPath)/drop/$($env:certificateFilename)"
#Write-Host "Certificate path: $certificatePath"
#Connect-PnPOnline -url $siteUrl -clientId $clientId -Tenant $env:tenant -CertificatePath $certificatePath 

Connect-PnPOnline -url $siteUrl -clientId $clientId -Tenant $tenant -CertificateBase64Encoded $base64Cert

$solutionPath = "./$dropPath/drop/$($spfxSolutionFileName)"
Write-Host "SPFx solution path: $solutionPath"

Add-PnPApp $solutionPath -Overwrite -Publish

$templatePath = "./$($env:dropPath)/drop/$($env:pnpTemplateFileName)"
Write-Host "Template path: $templatePath"

Invoke-PnPSiteTemplate -Path $templatePath

Write-Host "Done"
