# enable the app catalog at site the collection

$siteUrl = "https://adessoleandrobernsmueller.sharepoint.com/sites/tasks-test"

Connect-PnPOnline $siteUrl -Credentials (Get-Credential)

Add-PnPSiteCollectionAppCatalog -site $siteUrl
