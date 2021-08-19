# save the PnP site template locally

Set-Location C:\Dev\GitHub\leberns\spfx-tasks\

Connect-PnPOnline https://adessoleandrobernsmueller.sharepoint.com/sites/tasks-dev -Credentials (Get-Credential)

Get-PnPSiteTemplate -Out ".\template\TasksPnPTemplate.xml" -Configuration ".\scripts\Config-TasksPnPTemplate.json"
