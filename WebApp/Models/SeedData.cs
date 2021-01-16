using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WebApp.Data;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Hosting;

namespace WebApp.Models
{
    public class SeedData
    {
        private readonly IWebHostEnvironment _env;

        public SeedData(IWebHostEnvironment env)
        {
            _env = env;
        }

        public  void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new WebAppContext(
                        serviceProvider.GetRequiredService<DbContextOptions<WebAppContext>>()))
            {
                if (context.Photo.Any())
                {
                    //do nothing if database is already seeded
                    return;
                }

                context.Photo.AddRange(
                    new Photo
                    {
                        Id = 0,
                        Name = "photo1",
                        //ImageData = _env.WebRootFileProvider.GetFileInfo("images/0D962DFD-DD31-4F75-B62A-F4B5345156F2.jpg")
                    });

            }
        }

    }
}
