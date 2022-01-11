using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Rent_a_Car
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Execute().Wait(); // 
            CreateHostBuilder(args).Build().Run();
            

        }
        static async Task Execute()
        {
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("01151606@pw.edu.pl", "01151606@pw.edu.pl");
            var subject = "sendgrid2"; // sent according to sendgrid page, not delivered in mail
            var to = new EmailAddress("01151606@pw.edu.pl", "01151606@pw.edu.pl");
            var plainTextContent = "and easy to do anywhere, even with C#";
            var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }


        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
