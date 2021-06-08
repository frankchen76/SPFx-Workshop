using Microsoft.Extensions.Options;
using Microsoft.SharePoint.Client;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace ContentManagement
{
    public interface IAuthenticationService
    {
        //ClientContext GetContext(Uri web, string userPrincipalName, SecureString userPassword);
        ClientContext GetContext(Uri web);
    }
    public class AuthenticationService : IAuthenticationService
    {
        private SPOAppOptions _options = null;
        private static JwtSecurityToken _token = null;
        public AuthenticationService(IOptions<SPOAppOptions> options)
        {
            _options = options.Value;
        }

        public ClientContext GetContext(Uri web)
        {
            var context = new ClientContext(web);

            context.ExecutingWebRequest += (sender, e) =>
            {
                if (_token == null || _token.ValidTo > DateTime.UtcNow)
                {
                    this.GetAccessToken().GetAwaiter().GetResult();
                }
                e.WebRequestExecutor.RequestHeaders["Authorization"] = "Bearer " + _token.RawData;
            };

            return context;
        }

        private async Task GetAccessToken()
        {
            string url = $"https://accounts.accesscontrol.windows.net/{this._options.TenantId}/tokens/OAuth/2";
            using (var httpClient = new HttpClient())
            {
                using (var request = new HttpRequestMessage(new HttpMethod("POST"), url))
                {
                    var contentList = new List<string>();
                    contentList.Add($"grant_type=client_credentials");
                    contentList.Add($"client_id={_options.AppId}@{_options.TenantId}");
                    contentList.Add($"client_secret={_options.AppSecret}");
                    contentList.Add($"resource=00000003-0000-0ff1-ce00-000000000000/{_options.TenantName}@{_options.TenantId}");
                    request.Content = new StringContent(string.Join("&", contentList));
                    request.Content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/x-www-form-urlencoded");

                    var response = await httpClient.SendAsync(request);
                    var jsonBody = await response.Content.ReadAsStringAsync();
                    JObject jsonResult = JObject.Parse(jsonBody);
                    JwtSecurityTokenHandler jwt = new JwtSecurityTokenHandler();
                    _token = jwt.ReadJwtToken(jsonResult["access_token"].ToString());
                    Console.WriteLine(jsonResult["access_token"].ToString());
                }
            }
        }
    }
}
