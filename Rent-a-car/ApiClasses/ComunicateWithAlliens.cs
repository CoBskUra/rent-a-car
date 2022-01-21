using IdentityModel.Client;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Rent_a_Car.ApiClasses
{
    public static class ComunicateWithAlliens
    {
        public static async Task<string> CallToAllien(string request)
        {
            // discover endpoints from metadata
            var client = new HttpClient();

            var disco = await client.GetDiscoveryDocumentAsync("https://indentitymanager.snet.com.pl");
            if (disco.IsError)
            {
                return (disco.Error);
                
            }

            // request token
            var tokenResponse = await client.RequestClientCredentialsTokenAsync(new ClientCredentialsTokenRequest
            {
                Address = disco.TokenEndpoint,
                ClientId = "team3c",
                ClientSecret = "c88b805d-1ee9-42a5-8594-33af4bfd33b4",

                Scope = "MiNI.RentApp.API"
            });

            if (tokenResponse.IsError)
            {
                return (tokenResponse.Error);
            }

            Console.WriteLine(tokenResponse.Json);
            Console.WriteLine("\n\n");

            // call api
            var apiClient = new HttpClient();
            apiClient.SetBearerToken(tokenResponse.AccessToken);

            var response = await apiClient.GetAsync(request);
            if (!response.IsSuccessStatusCode)
            {
                return (response.StatusCode).ToString();
            }
            else
            {
                var content = await response.Content.ReadAsStringAsync();
                return (content);
            }
        }
    }
}
