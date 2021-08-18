# https://docs.microsoft.com/en-us/sharepoint/dev/general-development/site-collection-app-catalog

Connect-PnPOnline https://adessoleandrobernsmueller.sharepoint.com/ -Credentials (Get-Credential)

Add-PnPSiteCollectionAppCatalog -site https://adessoleandrobernsmueller.sharepoint.com/sites/tasks-test
