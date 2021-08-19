# save the PnP site template locally

Set-Location C:\Dev\GitHub\leberns\spfx-tasks\

$siteUrl = "https://adessoleandrobernsmueller.sharepoint.com/sites/tasks-dev"

Connect-PnPOnline $siteUrl -Credentials (Get-Credential)

Get-PnPSiteTemplate -Out ".\template\TasksPnPTemplate.xml" -Configuration ".\scripts\Config-TasksPnPTemplate.json"
