# Module06-CouponAPI

This sample demonstrated the custom API built by .NET Core

## Instruction: 
* run below command to install dotnet core tools
  * dotnet-aspnet-codegenerator ASP.NET Code Generator Cli
  * dotnet-ef: Entity Framework Core Cli
```
dotnet tool install -g dotnet-aspnet-codegenerator
dotnet tool install -g dotnet-ef
```
* run below steps to install the dependencies
```
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
```
* create model and dbcontext
* run the following cmd to generate controller class
```
dotnet aspnet-codegenerator controller -name CouponController -async -api -m Coupon -dc CouponContext -outDir Controllers -f
```
* Run the following cmd to generate the table to Sql database
```
# create a inital migration
dotnet ef migrations add initial

# run the migration
dotnet ef database update

# check the migration status
dotnet ef migrations list
```

* Add the following package for authentication
```
dotnet add package Microsoft.Identity.Web
```
* Create appsettings.json
```JSON
{
    "Logging": {
        "LogLevel": {
            "Default": "Information",
            "Microsoft": "Warning",
            "Microsoft.Hosting.Lifetime": "Information"
        }
    },
    "ConnectionStrings": {
        "CouponDB": "[db-connectionstring]"
    },
    "AzureAd": {
        "Instance": "https://login.microsoftonline.com/",
        "Domain": "[tenantname]", //m365x000000.onmicrosoft.com
        "ClientId": "[aad-app-id]",
        "TenantId": "common" //use common for multi-tenant, or tenant id for single tenant
    },
    "AllowedHosts": "*"
}```