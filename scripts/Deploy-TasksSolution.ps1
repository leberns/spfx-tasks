# deploy the SPFx Tasks solution and pnp template

Install-Module -Name "PnP.PowerShell" -Force

if ($env:environment -eq "development") {
  $siteUrl = $env:devSiteUrl
}
else {
  $siteUrl = $env:testSiteUrl
}

Write-Host "Site: $siteUrl"

$certificatePath = "./$($env:dropPath)/drop/$($env:certificateFilename)"
Write-Host "Certificate path: $certificatePath"

Connect-PnPOnline -url $siteUrl -clientId $env:clientId -Tenant $env:tenant -CertificatePath $certificatePath 

$packagePath = "./$($env:dropPath)/drop/$($env:packageName)"
Write-Host "Package path: $packagePath"

Add-PnPApp $packagePath -Overwrite -Publish

$templatePath = "./$($env:dropPath)/drop/$($env:pnpTemplateName)"
Write-Host "Template path: $templatePath"

Invoke-PnPSiteTemplate -Path $templatePath
