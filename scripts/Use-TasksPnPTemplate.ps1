# apply the PnP site template

Set-Location C:\Dev\GitHub\leberns\spfx-tasks\

Connect-PnPOnline https://adessoleandrobernsmueller.sharepoint.com/sites/tasks-test -Credentials (Get-Credential)

Invoke-PnPSiteTemplate -Path "./template/TasksPnPTemplate.xml"
