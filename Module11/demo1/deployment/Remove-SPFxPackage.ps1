[CmdletBinding()]
param (
  [string] $TenantName = "M365x725618",
  [string] $appTitle = "module-11-demo-1-client-side-solution",
  [string] $targetSiteUrl = "https://m365x725618.sharepoint.com/sites/SPFxWorkshop-Demo",
  [string] $CredStoreName = "SPO-M365x725618"
)

# uninstall app from site collection
Connect-PnPOnline -Url $targetSiteUrl -Credentials $CredStoreName
$delApp = Get-PnPApp | where-object { $_.Title -eq $appTitle }
if ($null -ne $delApp) {
  Uninstall-PnPApp -Identity $delApp.Id
  Write-Host "Waiting the SPFx package was removed..."
  $deleted = $false
  while ($deleted -eq $false) {
    $deletedApp = Get-PnPApp | Where-Object { $_.Title -eq $appTitle -and $null -eq $_.InstalledVersion }
    $deleted = $null -ne $deletedApp
    if ($deletedApp -eq $false) {
      [System.Threading.Thread]::Sleep(1000);
      Write-Host "Waiting..."
    }
  }
  Write-Host ([System.String]::Format("SPFx package '{0}' was uninstall on Site '{1}'.", $delApp.Title, $targetSiteUrl))
}
else {
  Write-Host ([System.String]::Format("SPFx package '{0}' was not found on Site '{1}'.", $appTitle, $targetSiteUrl))
}

#remove from App Catalog
$appCatalogUrl = Get-PnPTenantAppCatalogUrl
Connect-PnPOnline -Url $appCatalogUrl -Credentials $CredStoreName
$delApp = $null
$delApp = Get-PnPApp | where-object { $_.Title -eq $appTitle }

if ($null -ne $delApp) {
  Remove-PnPApp -Identity $delApp.Id
  Write-Host ([System.String]::Format("SPFx package '{0}' was removed from App Catalog Site: '{1}'.", $delApp.Title, $appCatalogUrl))
}
else {
  Write-Host ([System.String]::Format("SPFx package '{0}' was not found from App Catalog Site: '{1}'.", $appTitle, $appCatalogUrl))
}


# $allSites = Get-PnPTenantSite

# Write-Host "looking up app from tenant..."
# $progress = 0
# # remove the App from each site collection if installed
# foreach ($site in $allSites) {
#     Write-Host $("looking up app from '{0}'..." -f $site.Url)
#     Connect-PnPOnline -Url $site.Url -Credentials $CredStoreName
#     $allApps = Get-PnPApp
#     foreach ($app in $allApps) {
#         if ($app.Title -eq $appTitle -and $null -ne $app.InstalledVersion) {
#             Remove-PnPApp -Identity $app.Id
#             Write-Host $("Removed '{0}' on '{1}'" -f $appTitle, $site.Url)
#         }
#     }
#     $progress++
#     Write-Progress -Activity "Analyze site collections..." -Status "$($progress * 100 / $allSites.count)% complete:" -PercentComplete $($progress * 100 / $allSites.count)
# }

