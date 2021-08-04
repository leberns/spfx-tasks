# Deploy the SPFx Tasks client solution and pnp template
# The PnP connection to the site is made through a certificate stored in the Azure key vault

Write-Host "Starting solution deployment"

$deployment = $env:deployment
$siteUrl = "$env:baseSiteUrl-$deployment"
$tenant = $env:tenant
$dropPath = $env:dropPath
$spfxSolutionFileName = $env:spfxSolutionFileName
$pnpTemplateFileName = $env:pnpTemplateFileName
$clientId = $env:clientId
$certificateBase64 = $env:certificateBase64

Write-Host "Deployment:                 $deployment"
Write-Host "Site URL:                   $siteUrl"
Write-Host "SPFx solution file name:    $spfxSolutionFileName"
Write-Host "Template file name:         $pnpTemplateFileName"
Write-Host "Base 64 certificate lenght: $($certificateBase64.Length)"

Write-Host "Installing PnP PowerShell..."

Install-Module -Name PnP.PowerShell -Force

#$certificatePath = "./$dropPath/drop/$($env:certificateFilename)"
#Write-Host "Certificate path: $certificatePath"
#Connect-PnPOnline -url $siteUrl -clientId $clientId -Tenant $env:tenant -CertificatePath $certificatePath 

Write-Host "Connecting to the site..."
Write-Host "Site: $siteUrl"

Connect-PnPOnline -url $siteUrl -clientId $clientId -Tenant $tenant -CertificateBase64Encoded $certificateBase64

Write-Host "Installing the SPFx solution..."

$solutionPath = "./$dropPath/drop/$($spfxSolutionFileName)"
Write-Host "SPFx solution path: $solutionPath"

Add-PnPApp $solutionPath -Overwrite -Publish

Write-Host "Applying the PnP template..."

$templatePath = "./$($dropPath)/drop/$($pnpTemplateFileName)"
Write-Host "Template path: $templatePath"

Invoke-PnPSiteTemplate -Path $templatePath

Write-Host "Done"
