# enable the app catalog at site the collection

Connect-PnPOnline https://adessoleandrobernsmueller.sharepoint.com/ -Credentials (Get-Credential)

Add-PnPSiteCollectionAppCatalog -site https://adessoleandrobernsmueller.sharepoint.com/sites/tasks-test
