# Deploy the SPFx Tasks client solution and pnp template
# The PnP connection to the site is made through a certificate stored in the Azure key vault

Write-Host "Starting solution deployment"

Write-Host "AzureRM versions installed:"

Get-InstalledModule -Name AzureRM -AllVersions -ErrorAction Continue

Write-Host "Installing Az..."

Install-Module -Name Az -Force -AllowClobber

Write-Host "Az versions installed:"

Get-InstalledModule -Name Az -AllVersions -ErrorAction Continue

Write-Host "Installing PnP PowerShell..."

Install-Module -Name PnP.PowerShell -Force

$vaultName = "PnPAzureDevOpsVault"
$certName = "PnPAzureDevOpsPfx"
$deployment = "dev"                                   # $env:deployment
$tenant = "adessoleandrobernsmueller.onmicrosoft.com" # $env:tenant
$clientId = "8c8d1427-6b98-47c6-ab1c-b8812590654a"    # $env:clientId
$dropPath = "_leberns.spfx-tasks"                     # $env:dropPath
$spfxSolutionFileName = "tasks.sppkg"                 # $env:spfxSolutionFileName
$siteUrl = "https://adessoleandrobernsmueller.sharepoint.com/sites/tasks-$deployment"

$azClientId = $env:azAzureDevOpsClientId
$azSecret = $env:azAzureDevOpsSecret

Write-Host "Connecting to Az..."

$pscredential = New-Object -TypeName System.Management.Automation.PSCredential($azClientId, $azSecret)
Connect-AzAccount -ServicePrincipal -Credential $pscredential

Write-Host "Getting certificate..."

$base64Cert = Get-AzKeyVaultSecret -VaultName $vaultName -Name $certName -AsPlainText

Write-Host "Certificate lenght: $($base64Cert.Length)"

#$certificatePath = "./$dropPath/drop/$($env:certificateFilename)"
#Write-Host "Certificate path: $certificatePath"
#Connect-PnPOnline -url $siteUrl -clientId $clientId -Tenant $env:tenant -CertificatePath $certificatePath 

Write-Host "Connecting to the site..."
Write-Host "Site: $siteUrl"

Connect-PnPOnline -url $siteUrl -clientId $clientId -Tenant $tenant -CertificateBase64Encoded $base64Cert

Write-Host "Installing the SPFx solution..."

$solutionPath = "./$dropPath/drop/$($spfxSolutionFileName)"
Write-Host "SPFx solution path: $solutionPath"

Add-PnPApp $solutionPath -Overwrite -Publish

Write-Host "Applying the PnP template..."

$templatePath = "./$($env:dropPath)/drop/$($env:pnpTemplateFileName)"
Write-Host "Template path: $templatePath"

Invoke-PnPSiteTemplate -Path $templatePath

Write-Host "Done"
