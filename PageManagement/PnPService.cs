using System;
using System.Linq;
using System.Threading.Tasks;
using PnP.Core.Model.SharePoint;
using PnP.Core.QueryModel;
using PnP.Core.Services;

namespace ContentManagement
{
    public class PnPService : ISPOService
    {
        private IPnPContextFactory _pnpContextFactory = null;
        public PnPService(IPnPContextFactory pnpContextFactory)
        {
            _pnpContextFactory = pnpContextFactory;
        }
        // Create a modern page. 
        // string pageName = "PnPTestPage.aspx";
        // var newPage = await context.Web.NewPageAsync(PageLayoutType.Article);
        // await newPage.SaveAsync(pageName);
        // Console.WriteLine($"{pageName} was created");

        // Create a modern page. 
        // string pageName = "PnPSectionPage.aspx";
        // var newPage = await context.Web.NewPageAsync(PageLayoutType.Article);
        // // adding sections to the page
        // newPage.AddSection(CanvasSectionTemplate.OneColumnFullWidth, 1);
        // newPage.AddSection(CanvasSectionTemplate.OneColumn, 2);
        // newPage.AddSection(CanvasSectionTemplate.TwoColumn, 3);
        // newPage.AddSection(CanvasSectionTemplate.TwoColumnLeft, 4);
        // newPage.AddSection(CanvasSectionTemplate.TwoColumnRight, 5);
        // newPage.AddSection(CanvasSectionTemplate.ThreeColumn, 6);
        // await newPage.SaveAsync(pageName);
        // Console.WriteLine($"{pageName} was created");

        // Add Text web part
        // string pageName = "PnPTextPage.aspx";
        // var newPage = await context.Web.NewPageAsync();
        // // adding sections to the page
        // newPage.AddSection(CanvasSectionTemplate.OneColumn, 1);
        // // Adding text control to the first section, first column
        // newPage.AddControl(newPage.NewTextPart("welcome to programmatic page"), newPage.Sections[0].Columns[0]);
        // // Save the page
        // await newPage.SaveAsync(pageName);
        // Console.WriteLine($"{pageName} was created");

        // Add Image web part
        // string pageName = "PnPImagePage.aspx";
        // var newPage = await context.Web.NewPageAsync();
        // // adding sections to the page
        // newPage.AddSection(CanvasSectionTemplate.OneColumn, 1);
        // // get the web part 'blueprint'
        // var imageWebPartToAdd = await newPage.InstantiateDefaultWebPartAsync(DefaultWebPart.Image);
        // imageWebPartToAdd.PropertiesJson = "{\"position\":{\"zoneIndex\":1,\"sectionIndex\":1,\"controlIndex\":1,\"layoutIndex\":1},\"webPartData\":{\"id\":\"d1d91016-032f-456d-98a4-721247c305e8\",\"instanceId\":\"f348a061-7740-4233-ae01-dd91e5e14c39\",\"title\":\"Image\",\"description\":\"Add&nbsp;an&nbsp;image,&nbsp;picture&nbsp;or&nbsp;photo&nbsp;to&nbsp;your&nbsp;page&nbsp;including&nbsp;text&nbsp;overlays&nbsp;and&nbsp;ability&nbsp;to&nbsp;crop&nbsp;and&nbsp;resize&nbsp;images.\",\"audiences\":[],\"serverProcessedContent\":{\"htmlStrings\":{},\"searchablePlainTexts\":{},\"imageSources\":{\"imageSource\":\"https://m365x725618.sharepoint.com/sites/ContosoAssets/OrgAssets/boat-500x300.jpg\"},\"links\":{},\"customMetadata\":{\"imageSource\":{\"siteId\":\"7b403ade-bf19-4e43-8cc4-e35708af56ec\",\"webId\":\"4befe663-3d09-4374-b5a6-e8b4556e9f27\",\"listId\":\"{7D75CC74-6E70-4F10-9697-61C70C92A311}\",\"uniqueId\":\"{f7e27b70-ce04-474c-b118-00521d4aa63f}\",\"width\":500,\"height\":300}}},\"dataVersion\":\"1.9\",\"properties\":{\"imageSourceType\":2,\"captionText\":\"\",\"altText\":\"\",\"linkUrl\":\"\",\"overlayText\":\"\",\"fileName\":\"\",\"siteId\":\"7b403ade-bf19-4e43-8cc4-e35708af56ec\",\"webId\":\"4befe663-3d09-4374-b5a6-e8b4556e9f27\",\"listId\":\"{7D75CC74-6E70-4F10-9697-61C70C92A311}\",\"uniqueId\":\"{f7e27b70-ce04-474c-b118-00521d4aa63f}\",\"imgWidth\":500,\"imgHeight\":300,\"alignment\":\"Center\",\"fixAspectRatio\":false}},\"controlType\":3,\"id\":\"f348a061-7740-4233-ae01-dd91e5e14c39\",\"webPartId\":\"d1d91016-032f-456d-98a4-721247c305e8\",\"emphasis\":{},\"reservedHeight\":26,\"reservedWidth\":744,\"addedFromPersistedData\":true}";
        // // add the web part to the first column of the first section
        // newPage.AddControl(imageWebPartToAdd, newPage.Sections[0].Columns[0]);
        // // Save the page
        // await newPage.SaveAsync(pageName);
        // Console.WriteLine($"{pageName} was created");
        public async Task CreateModernPage()
        {
            using (var context = await _pnpContextFactory.CreateAsync("FrankCommunication1"))
            {
                // Add Text web part
                string pageName = "PnPTextPage.aspx";
                var newPage = await context.Web.NewPageAsync();
                // adding sections to the page
                newPage.AddSection(CanvasSectionTemplate.OneColumn, 1);
                // Adding text control to the first section, first column
                newPage.AddControl(newPage.NewTextPart("<div><h1>welcome</h1> to programmatic page</div>"), newPage.Sections[0].Columns[0]);
                // Save the page
                await newPage.SaveAsync(pageName);
                Console.WriteLine($"{pageName} was created");

                // // Add Image web part
                // string pageName = "PnPImagePage.aspx";
                // var newPage = await context.Web.NewPageAsync();
                // // adding sections to the page
                // newPage.AddSection(CanvasSectionTemplate.OneColumn, 1);
                // // get the web part 'blueprint'
                // var imageWebPartToAdd = await newPage.InstantiateDefaultWebPartAsync(DefaultWebPart.Image);
                // imageWebPartToAdd.PropertiesJson = "{\"position\":{\"zoneIndex\":1,\"sectionIndex\":1,\"controlIndex\":1,\"layoutIndex\":1},\"webPartData\":{\"id\":\"d1d91016-032f-456d-98a4-721247c305e8\",\"instanceId\":\"f348a061-7740-4233-ae01-dd91e5e14c39\",\"title\":\"Image\",\"description\":\"Add&nbsp;an&nbsp;image,&nbsp;picture&nbsp;or&nbsp;photo&nbsp;to&nbsp;your&nbsp;page&nbsp;including&nbsp;text&nbsp;overlays&nbsp;and&nbsp;ability&nbsp;to&nbsp;crop&nbsp;and&nbsp;resize&nbsp;images.\",\"audiences\":[],\"serverProcessedContent\":{\"htmlStrings\":{},\"searchablePlainTexts\":{},\"imageSources\":{\"imageSource\":\"https://m365x725618.sharepoint.com/sites/ContosoAssets/OrgAssets/boat-500x300.jpg\"},\"links\":{},\"customMetadata\":{\"imageSource\":{\"siteId\":\"7b403ade-bf19-4e43-8cc4-e35708af56ec\",\"webId\":\"4befe663-3d09-4374-b5a6-e8b4556e9f27\",\"listId\":\"{7D75CC74-6E70-4F10-9697-61C70C92A311}\",\"uniqueId\":\"{f7e27b70-ce04-474c-b118-00521d4aa63f}\",\"width\":500,\"height\":300}}},\"dataVersion\":\"1.9\",\"properties\":{\"imageSourceType\":2,\"captionText\":\"\",\"altText\":\"\",\"linkUrl\":\"\",\"overlayText\":\"\",\"fileName\":\"\",\"siteId\":\"7b403ade-bf19-4e43-8cc4-e35708af56ec\",\"webId\":\"4befe663-3d09-4374-b5a6-e8b4556e9f27\",\"listId\":\"{7D75CC74-6E70-4F10-9697-61C70C92A311}\",\"uniqueId\":\"{f7e27b70-ce04-474c-b118-00521d4aa63f}\",\"imgWidth\":500,\"imgHeight\":300,\"alignment\":\"Center\",\"fixAspectRatio\":false}},\"controlType\":3,\"id\":\"f348a061-7740-4233-ae01-dd91e5e14c39\",\"webPartId\":\"d1d91016-032f-456d-98a4-721247c305e8\",\"emphasis\":{},\"reservedHeight\":26,\"reservedWidth\":744,\"addedFromPersistedData\":true}";
                // // add the web part to the first column of the first section
                // newPage.AddControl(imageWebPartToAdd, newPage.Sections[0].Columns[0]);
                // // Save the page
                // await newPage.SaveAsync(pageName);
                // Console.WriteLine($"{pageName} was created");
            }
        }
        public async Task CreateModernPageFromClassicPage()
        {
            string url = "https://m365x725618.sharepoint.com/sites/ClassicPublishing01";
            // Change RowLimit to a reasonable size. the pagination process will retrieve all pages. 
            using (var context = await _pnpContextFactory.CreateAsync(new Uri(url)))
            {
                var myList = context.Web.Lists.GetByTitle("Pages");
                string viewXml = @"<View>
                    <ViewFields>
                      <FieldRef Name='Title' />
                      <FieldRef Name='FileLeafRef' />
                      <FieldRef Name='PageLayoutType' />
                      <FieldRef Name='PublishingPageLayout' />
                      <FieldRef Name='PublishingPageContent' />
                    </ViewFields>
                    <Query>
                    </Query>
                    <RowLimit Paged='TRUE'>10</RowLimit>
                   </View>";

                bool paging = true;
                string nextPage = null;
                while (paging)
                {
                    var output = await myList.LoadListDataAsStreamAsync(new RenderListDataOptions()
                    {
                        ViewXml = viewXml,
                        RenderOptions = RenderListDataOptionsFlags.ListData,
                        Paging = nextPage ?? null,
                    });
                    if (output.ContainsKey("NextHref"))
                    {
                        nextPage = output["NextHref"].ToString().Substring(1);
                    }
                    else
                    {
                        paging = false;
                    }
                }
                //Iterate over the retrieved list items
                foreach (var listItem in myList.Items.AsRequested())
                {
                    // just migrate TestClassic.aspx (ID=8) page
                    if (listItem.Id == 8)
                    {
                        string fileLeafRef = listItem.Values.ContainsKey("FileLeafRef") && listItem.Values["FileLeafRef"] != null ? listItem.Values["FileLeafRef"].ToString() : "NoKey";
                        string pageLayoutContent = listItem.Values.ContainsKey("PublishingPageContent") && listItem.Values["PublishingPageContent"] != null ? listItem.Values["PublishingPageContent"].ToString() : String.Empty;

                        Console.WriteLine($"Retrieved content from {fileLeafRef} was completed.");
                        if (pageLayoutContent != null && pageLayoutContent != String.Empty)
                        {
                            // await CreateModernPage1(fileLeafRef, pageLayoutContent);
                        }
                        else
                        {
                            Console.WriteLine($"No content was found from {fileLeafRef}.");
                        }
                    }
                }
                Console.WriteLine("Done");
            }
        }

        private async Task CreateModernPage1(string pageName, string pageContent)
        {
            using (var context = await _pnpContextFactory.CreateAsync("FrankCommunication1"))
            {
                // Add Text web part
                var newPage = await context.Web.NewPageAsync();
                // adding sections to the page
                newPage.AddSection(CanvasSectionTemplate.OneColumn, 1);
                // Adding text control to the first section, first column
                newPage.AddControl(newPage.NewTextPart(pageContent), newPage.Sections[0].Columns[0]);
                // Save the page
                await newPage.SaveAsync(pageName);
                Console.WriteLine($"{pageName} was created");
            }
        }

        public async Task GetWeb()
        {
            // using (var context = await _pnpContextFactory.CreateAsync("FrankCommunication1"))
            // string url="https://m365x725618.sharepoint.com/sites/FrankCommunication1";
            string url = "https://m365x725618.sharepoint.com/sites/ClassicPublishing01";
            using (var context = await _pnpContextFactory.CreateAsync(new Uri(url)))
            {
                // await context.Web.LoadAsync(p => p.Title);
                // Console.WriteLine($"Title: {context.Web.Title}");
                //var items = context.Web.Lists.GetByTitle("Site Pages").Items

                var myList = context.Web.Lists.GetByTitle("Pages", p => p.Title, p => p.Items,
                                                     p => p.Fields.QueryProperties(p => p.InternalName,
                                                                                   p => p.FieldTypeKind,
                                                                                   p => p.TypeAsString,
                                                                                   p => p.Title));
                string viewXml = @"<View>
                    <ViewFields>
                      <FieldRef Name='Title' />
                      <FieldRef Name='FileLeafRef' />
                      <FieldRef Name='PageLayoutType' />
                      <FieldRef Name='PublishingPageLayout' />
                      <FieldRef Name='PublishingPageContent' />
                    </ViewFields>
                    <Query>
                    </Query>
                   </View>";

                // foreach (var field in myList.Fields)
                // {
                //     Console.WriteLine($"{field.Title}: {field.InternalName}");
                // }

                // Get the item with title "Item1"
                var output = await myList.LoadListDataAsStreamAsync(new RenderListDataOptions()
                {
                    ViewXml = viewXml,
                    RenderOptions = RenderListDataOptionsFlags.ListData
                });
                //Iterate over the retrieved list items
                foreach (var listItem in myList.Items.AsRequested())
                {
                    string fileLeafRef = listItem.Values.ContainsKey("FileLeafRef") && listItem.Values["FileLeafRef"] != null ? listItem.Values["FileLeafRef"].ToString() : "NoKey";
                    string pageLayoutType = listItem.Values.ContainsKey("PageLayoutType") && listItem.Values["PageLayoutType"] != null ? listItem.Values["PageLayoutType"].ToString() : "NoKey";
                    string publishingPageLayout = listItem.Values.ContainsKey("PublishingPageLayout") &&
                        listItem.Values["PublishingPageLayout"] != null
                        ? ((PnP.Core.Model.SharePoint.IFieldUrlValue)listItem.Values["PublishingPageLayout"]).Description : "NoValue";
                    Console.WriteLine($"Title: {listItem.Title}: FileLeafRef: {fileLeafRef}, PageLayoutType: {pageLayoutType}, PublishingPageLayout: {publishingPageLayout}");
                }
                Console.WriteLine("Done");
            }
        }
    }
}