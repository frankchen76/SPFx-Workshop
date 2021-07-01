# Overview
This project showcase how to programmatically manipulate SPO modern page. the code is built on .NET 5 and support cross-platform
* CSOMService: CSOM sample 
  * Access SPO using ACS App-only approach
  * Create modern page
* PnPService: Demonstrate PnP.Core and PnP.Core.Authentication to
  * Configure PnP.Core using appsettings.json
  * Configure PnP.Core using code
  * Access SPO resource using browser authentication
  * Access SPO resource using Azure App-only approach
  * Create Modern page
  * Create section
  * create text web part
  * create image web part and other web part

# Instruction
* If you want to use your own AAD Application, follow [Configuring authentication](https://pnp.github.io/pnpcore/using-the-sdk/configuring%20authentication.html) to create your AAD Application for authentication
* Update ClientId and TenantId 
```C#
new PnPCoreAuthenticationCredentialConfigurationOptions
{
    ClientId = "[ClientId]",
    TenantId = "[TenantId]",
    Interactive = new PnPCoreAuthenticationInteractiveOptions
    {
        RedirectUri = new Uri("http://localhost")
    }
});

```
* If you want to use PnP Multi-tenant enterprise application, you need to consent their application and use below code
```C#
serviceCollection.AddPnPCore(options =>
{
    options.PnPContext.GraphFirst = true;
    options.HttpRequests.UserAgent = "ISV|Contoso|ProductX";

    // // use below statement if you want to use mutlipel tenant enterprise application from PnP lib
    options.DefaultAuthenticationProvider = new PnP.Core.Auth.InteractiveAuthenticationProvider();
});
```

# Usage
* clone the code
* run ```dotnet restore``` to install all components
* hit "F5" key to start the debug


