using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using Microsoft.SharePoint.Client;

namespace ContentManagement
{
    public class CSOMService : ISPOService
    {
        private IAuthenticationService _authService = null;
        public CSOMService(IAuthenticationService authService)
        {
            _authService = authService;
        }
        public async Task GetWeb()
        {
            Uri site = new Uri("https://m365x725618.sharepoint.com/sites/FrankCommunication1");

            using (var context = _authService.GetContext(site))
            {
                // context.Load(context.Web, p => p.Title);
                // await context.ExecuteQueryAsync();
                // Console.WriteLine($"Title: {context.Web.Title}");
                var list = context.Web.Lists.GetByTitle("Documents");
                var result = list.RenderExtendedListFormData(1, "EditForm", 2, RenderListFormDataOptions.IncludeListViewData, 0);
                //context.Load(result);
                context.ExecuteQuery();
                // var listItems = context.Web.Lists.GetByTitle("Site Pages").GetItems(CamlQuery.CreateAllItemsQuery());
                // context.Load(listItems, i => i.Include(f => f.Id));

                // var files = context.Web.Lists.GetByTitle("Site Pages").RootFolder.Files;
                // context.Load(files, fs => fs.Include(f => f.ListItemAllFields));
                // context.ExecuteQuery();

                // Console.WriteLine(files);
            }
        }
        public async Task CreateModernPage()
        {
            Uri site = new Uri("https://m365x725618.sharepoint.com/sites/FrankCommunication1");
            string samplePage = "TestPage1.aspx";

            using (var context = _authService.GetContext(site))
            {
                List listSitePages = context.Web.Lists.GetByTitle("Site Pages");
                Folder rootFolder = listSitePages.RootFolder;
                context.Load(rootFolder, f => f.ServerRelativeUrl);
                await context.ExecuteQueryAsync();

                string pageRelativeUrl = $"{rootFolder.ServerRelativeUrl}/{samplePage}";
                Microsoft.SharePoint.Client.File newPage =
                    rootFolder.Files.AddTemplateFile(pageRelativeUrl, TemplateFileType.ClientSidePage);
                newPage.ListItemAllFields["Title"] = Path.GetFileNameWithoutExtension(samplePage);
                newPage.ListItemAllFields["ContentTypeId"] = "0x0101009D1CB255DA76424F860D91F20E6C4118";
                newPage.ListItemAllFields["ClientSideApplicationId"] = "b6917cb1-93a0-4b97-a84d-7cf49975d4ec";
                newPage.ListItemAllFields["PageLayoutType"] = "Article";
                newPage.ListItemAllFields["PromotedState"] = 0;
                newPage.ListItemAllFields.UpdateOverwriteVersion();

                context.ExecuteQuery();
                Console.WriteLine($"{pageRelativeUrl} was created. ");
            }

        }
        public async Task CreateModernPageFromClassicPage()
        {
            throw new NotImplementedException();
        }
    }
}
