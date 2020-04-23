$urlAppCatalog = "https://m365x725618.sharepoint.com/sites/appcatalog"
$credStoreName = "SPO-M365x725618"

$scriptFullPath = $MyInvocation.MyCommand.Path
$scriptPath = Split-Path $scriptFullPath
$PackageName = "$scriptPath\sharepoint\solution\module-10-demo.sppkg"

write-host "Connecting to AppCatalog $urlAppCatalog"
Connect-PnPOnline -Url $urlAppCatalog -Credentials $credStoreName
write-host "Publishing $PackageName..."
Add-PnPApp -Path $PackageName -Scope 1 -Publish -Overwrite
