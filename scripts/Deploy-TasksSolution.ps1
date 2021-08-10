# Deploy the SPFx Tasks client solution and apply the PnP template
# The PnP connection to the site is made through a certificate

param($pnpAzureBase64Certificate)

Write-Host "Starting solution deployment"

$deployment = $env:deployment
$siteUrl = $env:baseSiteUrl + $deployment
$tenant = $env:tenant
$dropPath = $env:dropPath
$spfxSolutionFileName = $env:spfxSolutionFileName
$pnpTemplateFileName = $env:pnpTemplateFileName
$clientId = $env:clientId
$certificateBase64 = $env:certificateBase64
$pnpBase64CertificateSecret = $env:pnpBase64CertificateSecret 

Write-Host "Deployment:                 $deployment"
Write-Host "Site URL:                   $siteUrl"
Write-Host "SPFx solution file name:    $spfxSolutionFileName"
Write-Host "Template file name:         $pnpTemplateFileName"
Write-Host "PnP app base 64 certificate lenght: $($certificateBase64.Length)"
Write-Host "PnP app base 64 certificate lenght (param): $($pnpAzureBase64Certificate.Length)"
Write-Host "PnP app base 64 certificate lenght (Key Vault): $($pnpBase64CertificateSecret.Length)"

Write-Host "Installing PnP PowerShell..."

Install-Module -Name PnP.PowerShell -Force

Write-Host "Connecting to the site..."
Write-Host "Site: $siteUrl"

Connect-PnPOnline -url $siteUrl -clientId $clientId -Tenant $tenant -CertificateBase64Encoded $certificateBase64

Write-Host "Installing the SPFx solution..."

$solutionPath = "./$dropPath/drop/$($spfxSolutionFileName)"
Write-Host "SPFx solution path: $solutionPath"

Add-PnPApp $solutionPath -Overwrite -Scope Site -Publish

Write-Host "Applying the PnP template..."

$templatePath = "./$($dropPath)/drop/$($pnpTemplateFileName)"
Write-Host "Template path: $templatePath"

Invoke-PnPSiteTemplate -Path $templatePath

Write-Host "Done"
