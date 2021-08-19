# apply the PnP site template to a site

Set-Location C:\Dev\GitHub\leberns\spfx-tasks\

$siteUrl = "https://adessoleandrobernsmueller.sharepoint.com/sites/tasks-test"

Connect-PnPOnline $siteUrl -Credentials (Get-Credential)

Invoke-PnPSiteTemplate -Path "./template/TasksPnPTemplate.xml"
