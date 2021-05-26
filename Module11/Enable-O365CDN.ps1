$credStoreName = "SPO-M365x725618"
$spoAdminUrl = "https://M365x725618-admin.sharepoint.com"

$psCred = Get-PnPStoredCredential -Name $credStoreName -Type PSCredential
#connect to SPO
Connect-SPOService -Url $spoAdminUrl -Credential $psCred

#Get O365 CDN status
Get-SPOTenantCdnEnabled -CdnType Public
Get-SPOTenantCdnOrigins -CdnType Public
Get-SPOTenantCdnOrigins -CdnType Private
Get-SPOTenantCdnPolicies -CdnType Public

#enable public CDN
Set-SPOTenantCdnEnabled -CdnType Public
