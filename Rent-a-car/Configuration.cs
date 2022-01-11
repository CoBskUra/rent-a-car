using IdentityModel;
using IdentityServer4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rent_a_Car
{
    public static class Config
    {
        // add email here
        public static IEnumerable<IdentityResource> GetIdentityResources() =>
            new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile()
            };

        public static IEnumerable<ApiResource> GetApis() =>
            new List<ApiResource> { new ApiResource("ApiOne") , new ApiResource("ApiTwo")}; // our apis

        public static IEnumerable<Client> GetClients() =>
            new List<Client> { 
                new Client { 
                ClientId= "client_id",
                ClientSecrets = {new Secret("clien_secret".ToSha256())},
                AllowedGrantTypes = GrantTypes.ClientCredentials,
                AllowedScopes = {"ApiOne"} // this Client can access that api
            }, 
                new Client {
                ClientId= "client_id_mvc",
                ClientSecrets = {new Secret("clien_secret_mvc".ToSha256())},
                AllowedGrantTypes = GrantTypes.Code,
                RedirectUris = {"https://localhost:44306/signin-oidc"},
                AllowedScopes = {"ApiOne", "ApiTwo", 
                    IdentityServer4.IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServer4.IdentityServerConstants.StandardScopes.Profile},
                RequireConsent = false
            } };

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
                {
                    new ApiResource("api1", "My API")
                };
        }
    }
}
