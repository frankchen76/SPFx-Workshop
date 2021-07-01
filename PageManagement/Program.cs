using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PnP.Core.Auth.Services.Builder.Configuration;
using PnP.Core.Services.Builder.Configuration;

namespace ContentManagement
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var services = ConfigServices(args);
            var spoService = services.GetService<ISPOService>();
            // await spoService.GetWeb();
            await spoService.CreateModernPage();
        }
        private static ServiceProvider ConfigServices(string[] args)
        {
            IConfiguration configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables()
                .AddCommandLine(args)
                //.AddUserSecrets<Program>()
                .Build();
            var serviceCollection = new ServiceCollection();

            serviceCollection.Configure<SPOAppOptions>(configuration.GetSection(key: nameof(SPOAppOptions)));
            serviceCollection.AddTransient<IAuthenticationService, AuthenticationService>();
            // serviceCollection.AddTransient<ISPOService, CSOMService>();
            serviceCollection.AddTransient<ISPOService, PnPService>();

            // // Configure PnP.Core with appsettings.json
            // serviceCollection.AddPnPCore();
            // // Add the PnP Core SDK library services configuration from the appsettings.json file
            // serviceCollection.Configure<PnPCoreOptions>(configuration.GetSection("PnPCore"));
            // // Add the PnP Core SDK Authentication Providers
            // serviceCollection.AddPnPCoreAuthentication();
            // // Add the PnP Core SDK Authentication Providers configuration from the appsettings.json file
            // serviceCollection.Configure<PnPCoreAuthenticationOptions>(configuration.GetSection("PnPCore"));

            // Configure PnP.Core with code
            serviceCollection.AddPnPCore(options =>
            {
                options.PnPContext.GraphFirst = true;
                options.HttpRequests.UserAgent = "ISV|Contoso|ProductX";

                options.Sites.Add("FrankCommunication1", new PnPCoreSiteOptions
                {
                    SiteUrl = "https://m365x725618.sharepoint.com/sites/FrankCommunication1"
                });

                // // use below statement if you want to use mutlipel tenant enterprise application from PnP lib
                options.DefaultAuthenticationProvider = new PnP.Core.Auth.InteractiveAuthenticationProvider();
            });
            // Add the PnP Core SDK Authentication Providers with AAD App
            // serviceCollection.AddPnPCoreAuthentication(options =>
            // {
            //     // Configure an Authentication Provider to use Interactive authentication
            //     options.Credentials.Configurations.Add("interactive",
            //         new PnPCoreAuthenticationCredentialConfigurationOptions
            //         {
            //             ClientId = "6b5d6f69-8d3e-4d40-a40b-7530bd176c9a",
            //             TenantId = "8a5ee357-7de0-4836-ab20-9173b12cdce9",
            //             Interactive = new PnPCoreAuthenticationInteractiveOptions
            //             {
            //                 RedirectUri = new Uri("http://localhost")
            //             }
            //         });

            //     // Configure the default authentication provider
            //     options.Credentials.DefaultConfiguration = "interactive";

            //     // Map the site defined in AddPnPCore with the 
            //     // Authentication Provider configured in this action
            //     options.Sites.Add("FrankCommunication1",
            //         new PnPCoreAuthenticationSiteOptions
            //         {
            //             AuthenticationProviderName = "interactive"
            //         });

            //     // // use App-only approach
            //     // options.Credentials.Configurations.Add("x509Cert",
            //     // new PnPCoreAuthenticationCredentialConfigurationOptions
            //     // {
            //     //     ClientId = "7fab5118-0b7d-4706-9236-448743f335be", //m365x725618.PnP.PowerShell
            //     //     TenantId = "8a5ee357-7de0-4836-ab20-9173b12cdce9",
            //     //     X509Certificate = new PnPCoreAuthenticationX509CertificateOptions
            //     //     {
            //     //         Certificate = new System.Security.Cryptography.X509Certificates.X509Certificate2("C:\\AzureDevOps\\PFEProjects-Private\\PS-Samples\\PnP.PowerShell-PS7\\Cert\\m365x725618.PnP.PowerShell.pfx", "password", System.Security.Cryptography.X509Certificates.X509KeyStorageFlags.DefaultKeySet)
            //     //     }
            //     // });
            //     // options.Credentials.DefaultConfiguration = "x509Cert";
            //     // options.Sites.Add("FrankCommunication1",
            //     // new PnPCoreAuthenticationSiteOptions
            //     // {
            //     //     AuthenticationProviderName = "x509Cert"
            //     // });
            // });

            return serviceCollection.BuildServiceProvider();
        }
    }
}
