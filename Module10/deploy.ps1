# $urlAppCatalog = "https://m365x725618.sharepoint.com/sites/appcatalog"
$urlAppCatalog = "https://m365x725618.sharepoint.com/sites/TestCommunication-AppCatalog"
$credStoreName = "SPO-M365x725618"

$scriptFullPath = $MyInvocation.MyCommand.Path
$scriptPath = Split-Path $scriptFullPath
$PackageName = "$scriptPath\sharepoint\solution\module-10-demo.sppkg"

write-host "Connecting to AppCatalog $urlAppCatalog"
Connect-PnPOnline -Url $urlAppCatalog -Credentials $credStoreName -WarningAction Ignore
write-host "Publishing $PackageName..."
$newApp = Add-PnPApp -Path $PackageName -Scope Site -Publish -Overwrite

#check if the app is installed
$installedApp = Get-PnPApp -Scope Site | Where-Object { $_.Title -eq "Module10Demo" -and $_.InstalledVersion -ne $null }
if ($null -eq $installedApp) {
  write-host "Installing SPFx solution $($newApp.Id)..."
  Install-PnPApp -Identity $newApp.Id -Scope Site
}
else {
  write-host "Updating SPFx solution $($newApp.Id)..."
  Update-PnPApp -Identity $newApp.Id -Scope Site
}

# Get-PnPApp -Scope Site Module10Demo
# $installedApp = Get-PnPApp -Scope Site | Where-Object {$_.Title -eq "Module10Demo" -and $_.InstalledVersion -ne $null}
# Remove-PnPApp -Scope Site -Identity 450a97e3-05a8-4773-bee3-b6297a8cbbdd
# # $PackageName = ".\sharepoint\solution\module-10-demo.sppkg"
# Install-PnPApp -Identity 450a97e3-05a8-4773-bee3-b6297a8cbbdd -Scope Site
# Update-PnPApp -Identity 450a97e3-05a8-4773-bee3-b6297a8cbbdd -Scope Site
# Uninstall-PnPApp -Identity 450a97e3-05a8-4773-bee3-b6297a8cbbdd -Scope Site
