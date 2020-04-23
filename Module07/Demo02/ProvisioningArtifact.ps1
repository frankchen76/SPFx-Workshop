#export a list to pnp template without content. for content, you need to use full provisioning engine
$urlSource = "https://m365x725618.sharepoint.com/sites/FrankTeam1"
Connect-PnPOnline -Url $urlSource -Credentials $psCred
Get-PnPProvisioningTemplate -Out "OrderList.xml"
#export lists to a template
Export-PnPListToProvisioningTemplate -List "OrderList" -Out "d:\temp\OrderList1.xml"

#apply template to the target site
Apply-PnPProvisioningTemplate -Path $templatePath
