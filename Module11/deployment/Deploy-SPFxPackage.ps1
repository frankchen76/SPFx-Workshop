[CmdletBinding()]
param (
  [string] $TenantName = "M365x725618",
  [string] $appFile = "module-11-demo-1.sppkg",
  [string] $targetSiteUrl = "https://m365x725618.sharepoint.com/sites/SPFxWorkshop-Demo",
  [string] $CredStoreName = "SPO-M365x725618"
)

$scriptFullPath = $MyInvocation.MyCommand.Path
$scriptPath = Split-Path $scriptFullPath

$appPath = "{0}\..\sharepoint\solution\{1}" -f $scriptPath, $appFile

$adminUrl = [System.String]::Format("https://{0}-admin.sharepoint.com", $TenantName)

Connect-PnPOnline -Url $adminUrl -Credentials $CredStoreName

$appCatalogUrl = Get-PnPTenantAppCatalogUrl

Connect-PnPOnline -Url $appCatalogUrl -Credentials $CredStoreName

# Upload App
$newApp = Add-PnPApp -Path $appPath -Scope Tenant
Write-Host $("SPFx package was uploaded to App Catalog Site '{0}'." -f $appCatalogUrl)

Publish-PnPApp -Identity $newApp.Id -Scope Tenant
Write-Host ([System.String]::Format("SPFx package was published, App Title: {0}; App Id: {1}.", $newApp.Title, $newApp.Id))

Connect-PnPOnline -Url $targetSiteUrl -Credentials $CredStoreName

Install-PnPApp -Identity $newApp.Id
Write-Host ([System.String]::Format("SPFx package was install on Site '{0}, App Title: {1}; App Id: {2}'.", $targetSiteUrl, $newApp.Title, $newApp.Id))

